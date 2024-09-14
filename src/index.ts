import "./database";
import "module-alias/register";
import "dotenv/config";

import initApi from "@root/inversify.config";
import initRouter from "@root/router";
import App from "@root/app";
import bodyParser from "body-parser";

import authentication from "@root/middlewares/authentication";

const initServer = async (): Promise<void> => {
  await initApi();
  const importedRouter = await initRouter();

  const app = new App({
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3080,
    routers: importedRouter,

    middleWares: [
      bodyParser.json({
        limit: "50MB",
      }),
      bodyParser.urlencoded({
        extended: true,
        limit: "50MB",
      }),
      authentication,
    ],
  });

  app.listen();
};

initServer();
