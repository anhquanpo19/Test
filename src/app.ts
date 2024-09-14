import cors from "cors";
import express, { Response } from "express";
import { register } from "@root/services/common/prom-client-utils";
import cookieParser from "cookie-parser";

class App {
  public app: any;
  public port: number;

  constructor(appInit: any) {
    this.port = appInit.port;

    this.app = express();
    this.app.set("trust proxy", true);

    this.cors();
    this.cookieParser();
    
    this.middleware(appInit.middleWares);
    this.routes(appInit.routers);
  }

  private cors() {
    const corsOption = {
      origin: ["http://localhost:8080"],
      methods: "OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      credentials: true,
    };

    this.app.use(cors(corsOption));
  }
  
  private cookieParser() {
    this.app.use(cookieParser());
  }

  private middleware(middleWares: any) {
    middleWares.forEach((middleWare: any) => {
      this.app.use(middleWare);
    });
  }

  private routes(routers: any) {
    routers.forEach((router: any) => {
      this.app.use("/", router.router);
    });

    this.app.get("/metrics", async (req: Request, res: Response) => {
      res.setHeader("Content-Type", register.contentType);
      res.send(await register.metrics());
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(
        "Express server listening on port " +
          this.port +
          " env=" +
          process.env.PORT
      );
    });
  }
}

export default App;
