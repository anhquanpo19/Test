import { Router } from "express";
import UserApi from "@root/app/user-api";
import { container } from "@root/inversify.config";
import RouterPath from "@root/enums/path-enum";
import UserCmd from "@root/app/cmd/user-cmd";
import Utils from "@root/services/common/utils";
import { Request, Response } from "express";

export default class UserRoute {
  public router = Router();
  public UserApi: UserApi;

  constructor() {
    this.UserApi = container.get<UserApi>(UserApi);
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post(
      RouterPath.USER_SIGN_IN_PATH,
      UserCmd.validateAuthen(),
      UserCmd.handleValidation,
      (req: Request, res: Response) =>
        Utils.handle(req, res, this.UserApi.signIn)
    );

    this.router.post(
      RouterPath.USER_LOGIN_PATH,
      UserCmd.validateAuthen(),
      UserCmd.handleValidation,
      (req: Request, res: Response) =>
        Utils.handle(req, res, this.UserApi.logIn)
    );

    this.router.put(
      RouterPath.USER_REFRESH_TOKEN_PATH,
      (req: Request, res: Response) =>
        Utils.handle(req, res, this.UserApi.refreshToken)
    );

    this.router.put(
      RouterPath.USER_SIGN_OUT_PATH,
      (req: Request, res: Response) =>
        Utils.handle(req, res, this.UserApi.signOut)
    );
    
    this.router.get(
      RouterPath.USER_PROFILE_PATH,
      (req: Request, res: Response) =>
        Utils.handle(req, res, this.UserApi.getProfile)
    );
  }
}
