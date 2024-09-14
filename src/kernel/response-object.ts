import { IErrorCode } from "./error-code";

export default class ResponseObject {
  public static init(errorCode: IErrorCode | any, data = {}) {
    if (!errorCode)
      return {
        code: 0,
        status: 200,
        message: "OK",
        sys_message: "",
        data: {},
      };

    return {
      code: errorCode.code,
      status: errorCode.status,
      message: errorCode.message,
      sys_message: errorCode.sys_message,
      data: errorCode.data || data,
    };
  }
}
