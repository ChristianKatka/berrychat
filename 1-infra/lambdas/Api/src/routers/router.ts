import { Router } from "express";
import { sendMessageController } from "../controllers/sendMessageController";
import { sendMockMessageController } from "../controllers/sendMockMessageController";

export const router = Router();

router.post("/message", sendMessageController);
router.post("/mock-message", sendMockMessageController);
