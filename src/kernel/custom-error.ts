import ErrorCode from "@root/kernel/error-code";

export default class CustomError extends Error {
  code: number;
  status: number;
  message: string;
  sys_message: string;
  data: any;

  constructor(errorCode = ErrorCode.SYSTEM_ERROR, message = "", data = {}) {
    super();
    this.data = data;
    this.code = errorCode.code;
    this.status = errorCode.status;
    this.sys_message = errorCode.sys_message;
    this.message = message || errorCode.message;
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  setData(data: any) {
    this.data = data;
  }

  setMessage(message: string) {
    this.message = message;
  }
}
