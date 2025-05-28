// import Router from "koa-router";
// import { getThreadsController } from "../controllers/getThreadsController";
// import { sendMessageController } from "../controllers/sendMessageController";

// export const router = new Router();

// router.get("/threads", getThreadsController);
// router.post("/message", sendMessageController);

import { Router } from "express";
import { sendMessageController } from "../controllers/sendMessageController";

export const router = Router();

// Define routes
// router.get("/threads", getThreadsController);
router.post("/message", sendMessageController);
