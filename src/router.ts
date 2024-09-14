import { globSync } from "glob";

const RouterImport: any = [];

async function initRouter() {
  const files = globSync(`${__dirname}/routes/*.js`);

  for (const file of files) {
    const importedRouter = await import(file);
    console.log(file);
    const router = importedRouter.default;

    RouterImport.push(new router());
  }

  return RouterImport;
}

export default initRouter;
