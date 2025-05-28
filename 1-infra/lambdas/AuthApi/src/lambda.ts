import serverlessExpress from "@codegenie/serverless-express";
import { app } from "./app";

const options = {
  app: app.callback(),
};

const handler = serverlessExpress(options);

export { handler };
