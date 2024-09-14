import crypto from "crypto";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import ErrorCode from "@root/kernel/error-code";
import { Request, Response } from "express";
import CustomError from "@root/kernel/custom-error";
import dotenv from "dotenv";
dotenv.config();

const SECRET_TOKEN = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;
const refreshTokens: string[] = [];

export default class Utils {
  static randomString(numberChar: number) {
    return crypto
      .randomBytes(numberChar / 2 + 1)
      .toString("hex")
      .substring(0, numberChar);
  }

  static handleValidation(req: Request, res: Response, next: any) {
    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    const extractedErrors: any = [];
    errors
      .array()
      .map((err: any) => extractedErrors.push({ [err.param]: err.msg }));

    const response = ErrorCode.INVALID_PARAMS;
    response.message = extractedErrors as any;

    return res.json(response);
  }

  static async handle(req: Request, res: Response, next: any) {
    try {
      const data = await next(req, res);

      if (data?.redirectUrl) return res.redirect(data.redirectUrl);

      return res.json(new CustomError(ErrorCode.SUCCESS, "", data));
    } catch (error) {
      console.log(error);

      return res.json(error);
    }
  }

  static generateAccessToken(payload: any) {
    return jwt.sign(payload, SECRET_TOKEN, { expiresIn: '15m' });
  }

  static generateRefreshToken(payload: any) {
    const refreshToken = jwt.sign(payload, REFRESH_SECRET);
    refreshTokens.push(refreshToken);
    return refreshToken;
  }

  static deleteRefreshToken(refreshToken: string) {
    const index = refreshTokens.indexOf(refreshToken);
    if (index !== -1) {
      refreshTokens.splice(index, 1);
    }

    return refreshToken;
  }
}
