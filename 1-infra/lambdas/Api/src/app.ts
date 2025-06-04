import cors from "cors";
import express, { json, urlencoded } from "express";
import morgan from "morgan"; // Express logger
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
