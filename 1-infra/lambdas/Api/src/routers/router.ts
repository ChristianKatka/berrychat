import { Router } from "express";
import { getThreadsController } from "../controllers/threads/getThreadsController";
import { sendMessageController } from "../controllers/messages/sendMessageController";
import { sendMockMessageController } from "../controllers/messages/sendMockMessageController";

export const router = Router();

router.get("/threads", getThreadsController);
router.post("/message", sendMessageController);
router.post("/mock-message", sendMockMessageController);
