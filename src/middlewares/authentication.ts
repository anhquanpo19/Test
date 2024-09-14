import responseObject from "@root/kernel/response-object";
import { NextFunction, Request, Response } from "express";
import ErrorCode from "@root/kernel/error-code";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserService from "@root/services/user";
import UserModel from "@root/models/user";
dotenv.config();

const SECRET_TOKEN = process.env.JWT_SECRET!;

const includeWhiteList = ["/sign-in", "/login"];

const whiteListPath = (req: Request) => {
  if (includeWhiteList.find((path) => req.path.includes(path))) return true;
  return false;
};

export default async function authentication(
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) {
  if (whiteListPath(req)) {
    return next();
  }

  const token = req.headers["authorization"];
  if (token) {
    const actualToken = token.split(" ")[1];

    jwt.verify(actualToken, SECRET_TOKEN, async (err, user: any) => {
      if (err) {
        return res.json(responseObject.init(ErrorCode.INVALID_ACCESS_TOKEN));
      }

      const userAuth = await UserService.getOne({ _id: user?._id }, UserModel);

      if (userAuth.token !== actualToken) {
        return res.json(responseObject.init(ErrorCode.SESSION_EXPIRED));
      }

      req.user = { ...user, password: undefined };
      next();
    });
  }
}
