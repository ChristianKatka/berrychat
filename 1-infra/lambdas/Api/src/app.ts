import cors from "cors";
import express, { json, urlencoded } from "express";
import morgan from "morgan"; // logger
import { router } from "./routers/router";
import { decodeCognitoToken } from "./middlewares/cognito-token.middleware";

const app = express();

app.use(cors());
app.use(morgan());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(decodeCognitoToken);
app.use(router);

export { app };
