const CODE_SUCCESS = {
  SUCCESS: {
    code: 1,
    status: 200,
    sys_message: "SUCCESS",
    message: "Thành công",
  },
};

const CODE_INPUT_INVALID = {
  INVALID_PARAMS: {
    code: -1000,
    status: 400,
    sys_message: "INVALID_PARAMS",
    message: "Dữ liệu không hợp lệ",
  },
  DATA_EXIST: {
    code: -1023,
    status: 400,
    sys_message: "DATA_EXIST",
    message: "Dữ liệu đã tồn tại",
  },
  INACTIVE_USER: {
    code: -1026,
    status: 400,
    sys_message: "INACTIVE_USER",
    message: "Tài khoản không khả dụng",
  },
  USER_EXISTED: {
    code: -1027,
    status: 400,
    sys_message: "USER_EXISTED",
    message: "Người dùng đã tồn tại",
  },
  EMAIL_ALREADY_EXIST: {
    code: -1028,
    status: 400,
    sys_message: "EMAIL_ALREADY_EXIST",
    message: "Email đã tồn tại",
  },
  EMAIL_ALREADY_SIGNUP: {
    code: -1029,
    status: 400,
    sys_message: "EMAIL_ALREADY_SIGNUP",
    message: "Email đã đăng ký",
  },
  USER_IS_LOCKED: {
    code: -4530,
    status: 405,
    sys_message: "USER_IS_LOCKED",
    message: "Tài khoản đang bị khóa. ",
  },
  INVALID_PASSWORD: {
    code: -1006,
    status: 400,
    sys_message: "INVALID_PASSWORD",
    message: "Mật khẩu không hợp lệ",
  },
};

const CODE_NOT_FOUND = {
  NOT_FOUND: {
    code: -1400,
    status: 404,
    sys_message: "NOT_FOUND",
    message: "Không tìm thấy dữ liệu",
  },
  USER_NOT_FOUND: {
    code: -1401,
    status: 404,
    sys_message: "USER_NOT_FOUND",
    message: "Không tìm thấy tài khoản",
  },
  EMAIL_NOT_FOUND: {
    code: -1402,
    status: 404,
    sys_message: "EMAIL_NOT_FOUND",
    message: "Không tìm thấy email",
  },
};

const CODE_PERMISSION = {
  SESSION_EXPIRED: {
    code: -4300,
    status: 403,
    sys_message: "SESSION_EXPIRED",
    message: "Hết thời gian truy cập",
  },
  PERMISSION_DENY: {
    code: -4301,
    status: 403,
    sys_message: "PERMISSION_DENY",
    message: "Từ chối truy cập",
  },
  INVALID_ACCESS_TOKEN: {
    code: -1002,
    status: 400,
    sys_message: "INVALID_ACCESS_TOKEN",
    message: "Dữ liệu xác thực không hợp lệ",
  },
  MISSING_ACCESS_TOKEN: {
    code: -1003,
    status: 404,
    sys_message: "MISSING_ACCESS_TOKEN",
    message: "Dữ liệu xác thực bị thiếu",
  },
  INVALID_REFRESH_TOKEN: {
    code: -1002,
    status: 400,
    sys_message: "INVALID_REFRESH_TOKEN",
    message: "Refresh token không hợp lệ",
  },
  MISSING_REFRESH_TOKEN: {
    code: -1009,
    status: 404,
    sys_message: "MISSING_REFRESH_TOKEN",
    message: "Refresh token bị thiếu",
  },
};

const CODE_NOT_ALLOW = {
  USER_INACTIVE: {
    code: -4500,
    status: 404,
    sys_message: "USER_INACTIVE",
    message: "Người dùng không hoạt động",
  },
  INVALID_SIGNIN: {
    code: -4502,
    status: 406,
    sys_message: "INVALID_SIGNIN",
    message: "Thông tin đăng nhập không hợp lệ.",
  },
};

const CODE_SYSTEM_ERROR = {
  SYSTEM_ERROR: {
    code: -900,
    status: 500,
    sys_message: "system error",
    message: "Hệ thống có lỗi, vui lòng thử lại sau!",
  },
  TRY_LOCK_FAIL: {
    code: -901,
    status: 500,
    sys_message: "try lock fail",
    message: "Hệ thống có lỗi, vui lòng thử lại sau!",
  },
};

const CODES = {
  ...CODE_SUCCESS,
  ...CODE_INPUT_INVALID,
  ...CODE_NOT_FOUND,
  ...CODE_PERMISSION,
  ...CODE_NOT_ALLOW,
  ...CODE_SYSTEM_ERROR,
};

export default CODES;

export interface IErrorCode {
  code: number;
  status: number;
  message: string;
  sys_message: string;
  data?: object;
}
