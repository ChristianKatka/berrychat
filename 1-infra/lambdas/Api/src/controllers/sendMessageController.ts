import { Request, Response } from "express";
import { claudeRes } from "../mock/claude-response";
import { anthropic } from "../instances/anthropic";
import { randomUUID } from "node:crypto";

export const sendMessageController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { text, selectedThreadId } = req.body;
  let threadId = selectedThreadId;
  if (!selectedThreadId) {
    threadId = randomUUID();
  }

  // const response = await anthropic.messages.create({
  //   model: "claude-3-5-haiku-latest",
  //   max_tokens: 1024,
  //   system:
  //     "You are a helpful assistant that summarizes user-uploaded documents and answers questions about them in plain language. Always be concise and user-friendly.",
  //   messages: [
  //     {
  //       role: "user",
  //       content: text,
  //     },
  //   ],
  //   tools: [
  //     {
  //       type: "web_search_20250305",
  //       name: "web_search",
  //       max_uses: 5,
  //     },
  //   ],
  // });

  res.json({ claudeResponse: claudeRes, threadId });
};
