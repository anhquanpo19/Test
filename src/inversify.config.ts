import { Container } from "inversify";
import "reflect-metadata";
import { globSync } from "glob";

const container = new Container();

async function initApi() {
  const apiFiles = globSync(`${__dirname}/app/**/*.js`);

  for (const file of apiFiles) {
    const importedApi = await import(file);

    const api = importedApi.default;

    container.bind<typeof api>(api).to(api);
  }

  return container;
}

export default initApi;

export { container };
