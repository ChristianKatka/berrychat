import { Request, Response } from "express";
import { claudeRes } from "../mock/claude-response";

export const sendMessageController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { text } = req.body;

  // const response = await anthropic.messages.create({
  //   model: "claude-3-5-haiku-latest",
  //   max_tokens: 1024,
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

  res.json(claudeRes);
};
