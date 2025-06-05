import cors from "cors";
import express, { json, urlencoded } from "express";
import morgan from "morgan"; // logger
import { router } from "./routers/router";

const app = express();

app.use(cors());
app.use(morgan());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(router);

export { app };
