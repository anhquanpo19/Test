import { body, validationResult } from "express-validator";
import responseObject from "@root/kernel/response-object";
import { NextFunction, Request, Response } from "express";
import ErrorCode from "@root/kernel/error-code";
import Status from "@root/enums/status";

export default class UserCmd {
  static checkExist(value: any, isUpdate = false) {
    return !isUpdate || value != undefined;
  }
  public static customErrorMessage(fields: Array<string>): string {
    const message: any = {
      name: "Tên",
      fullname: "Họ tên",
      email: "Email",
      users: "Người dùng",
      user: "Người dùng",
      phone: "Số điện thoại",
      status: "Trạng thái",

      list: "Danh sách",

      invalid: "không hợp lệ",
      missing: "không được để trống",
    };

    let result = "";

    for (const field of fields) result += `${message[field]} `;

    return result;
  }

  static validateStatus(value: any): boolean {
    if (value !== undefined && !(value in Status)) {
      throw new Error("status invalid");
    }
    return true;
  }

  static validateAuthen() {
    return [body("email").notEmpty(), body("password").notEmpty()];
  }

  public static validateBodyEmail() {
    return [body("email").isEmail()];
  }

  public static validateSetupPassword() {
    return [
      body("email").isEmail(),
      body("password").notEmpty(),
      body("verifyToken").notEmpty(),
    ];
  }

  public static validateSignIn() {
    return [
      body("email").isEmail(),
      body("password").notEmpty(),
    ];
  }

  static handleValidation(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    const extractedErrors: any = [];
    errors
      .array()
      .map((err: any) => extractedErrors.push({ [err.param]: err.msg }));

    const response = responseObject.init(ErrorCode.INVALID_PARAMS);

    response.message = extractedErrors[0][Object.keys(extractedErrors[0])[0]];

    return res.json(response);
  }
}
