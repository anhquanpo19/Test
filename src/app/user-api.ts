import { Request, Response } from "express";
import UserService from "@root/services/user";
import { injectable } from "inversify";
import CustomError from "@root/kernel/custom-error";
import UserModel from "@root/models/user";
import ErrorCode from "@root/kernel/error-code";
import HashUtils from "@root/services/common/hash-utils";
import jwt from "jsonwebtoken";
import Status from "@root/enums/status";
import Utils from "@root/services/common/utils";
import dotenv from "dotenv";
dotenv.config();

const SECRET_TOKEN = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

@injectable()
export default class UserApi {
  signIn = async (req: Request) => {
    const { body } = req;
    const { email, password } = body;

    await UserService.checkDuplicate({ email }, UserModel);

    body.password = HashUtils.hashPassword(password);
    body.status = Status.ACTIVE;
    const user = await UserModel.create(body);

    return {
      user: {
        email: user.email,
        password: undefined,
      },
    };
  };

  logIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await UserService.getOne(
      { email, deleted_at: null },
      UserModel
    );

    if (!user) throw new CustomError(ErrorCode.INVALID_SIGNIN);

    if (user.status != Status.ACTIVE)
      throw new CustomError(ErrorCode.USER_IS_LOCKED);

    if (HashUtils.hashPassword(password) !== user.password)
      throw new CustomError(ErrorCode.INVALID_PASSWORD);

    const accessToken = Utils.generateAccessToken(user.toJSON());
    const refreshToken = Utils.generateRefreshToken(user.toJSON());
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/refresh-token",
      sameSite: "strict",
    });

    return {
      token: accessToken,
      user: {
        ...user.toJSON(),
        password: undefined,
      },
    };
  };

  refreshToken = async (req: Request) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new CustomError(ErrorCode.MISSING_REFRESH_TOKEN);
    }

    jwt.verify(refreshToken, REFRESH_SECRET, (err: any, user: any) => {
      if (err) {
        throw new CustomError(ErrorCode.MISSING_REFRESH_TOKEN);
      }

      const newAccessToken = Utils.generateAccessToken(user);

      return {
        token: newAccessToken,
      };
    });
  };

  signOut = async (req: any, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    Utils.deleteRefreshToken(refreshToken);
    res.clearCookie("refreshToken");
    Utils.generateAccessToken({ email: req.user.email });

    return {};
  };

  getProfile = async (req: any) => {
    return { ...req.user, password: undefined };
  };
}
