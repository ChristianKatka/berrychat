// import Koa from "koa";
// import cors from "@koa/cors";
// import bodyParser from "koa-bodyparser";
// import json from "koa-json";
// import logger from "koa-logger";
// import { router } from "./routers/router";

// const app = new Koa();
// app.use(cors());
// app.use(logger());
// app.use(json());
// app.use(bodyParser());
// app.use(router.routes()).use(router.allowedMethods());

// export { app };

import express from "express";
import cors from "cors";
import morgan from "morgan"; // Express logger
import { json, urlencoded } from "express";
import { router } from "./routers/router"; // We'll modify this below too

const app = express();

// Middleware setup
app.use(cors());
app.use(morgan("dev")); // Equivalent to koa-logger
app.use(json()); // Equivalent to koa-json + koa-bodyparser
app.use(urlencoded({ extended: true })); // Handle form data

// Mount routes
app.use(router);

export { app };
