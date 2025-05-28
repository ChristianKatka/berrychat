import { Request, Response } from "express";
import { anthropic } from "../instances/anthropic"; // assumes you already set up the SDK with your API key

export const sendMessageController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { text } = req.body; // or req.body if you change to POST

  if (typeof text !== "string") {
    res.status(400).json({ error: "Missing 'text' parameter" });
    return;
  }

  // Set SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.flushHeaders(); // flush immediately

  try {
    const stream = anthropic.messages.stream({
      model: "claude-3-haiku-20240307", // or opus if you want
      max_tokens: 100,
      temperature: 1,
      system: "Respond only with short poems.",
      messages: [{ role: "user", content: text }],
    });

    stream.on("text", (chunk) => {
      res.write(`data: ${chunk}\n\n`);
    });

    stream.on("end", () => {
      res.write(`event: done\ndata: [DONE]\n\n`);
      res.end();
    });

    stream.on("error", (err) => {
      console.error("Anthropic stream error:", err);
      res.write(`event: error\ndata: ${err.message}\n\n`);
      res.end();
    });
  } catch (err: any) {
    console.error("Anthropic stream failed:", err);
    res.status(500).json({ error: err.message });
  }
};
