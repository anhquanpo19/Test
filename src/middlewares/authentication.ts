import responseObject from "@root/kernel/response-object";
import { NextFunction, Request, Response } from "express";
import ErrorCode from "@root/kernel/error-code";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_TOKEN = process.env.JWT_SECRET!;

const includeWhiteList = ["/sign-in", "/sign-out", "/login"];

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
    
    jwt.verify(actualToken, SECRET_TOKEN, (err, user) => {
      if (err) {
        return res.json(responseObject.init(ErrorCode.INVALID_ACCESS_TOKEN));
      }

      req.user = user;
      next();
    });
  }
}
