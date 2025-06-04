import { Request, Response } from "express";
import Anthropic from "@anthropic-ai/sdk";
import { v4 as uuidv4 } from "uuid";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // Make sure your key is set
});

/**
 * Helper to format and send SSE messages in consistent format.
 */
function sendSSE(res: Response, event: string, data: any) {
  const payload = JSON.stringify({ event, data });
  res.write(`event: message\n`);
  res.write(`data: ${payload}\n\n`);
}

export const sendMessageController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { text } = req.body;

  if (typeof text !== "string") {
    res.status(400).json({ error: "Missing 'text' parameter" });
    return;
  }

  // Set SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders?.();
  res.write(":\n\n"); // Keep-alive ping

  // Simulated metadata
  const threadId = uuidv4();
  const runId = uuidv4();

  // Send initial start and metadata events
  sendSSE(res, "start", "Claude stream started");
  sendSSE(res, "metadata", {
    thread: {
      id: threadId,
      metadata: {},
      user_id: "demo-user-id",
      status: "streaming",
      created_at: new Date().toISOString(),
    },
    run_id: runId,
  });

  try {
    const stream = await client.messages.stream({
      model: "claude-3-haiku-20240307", // ✅ Cheaper model
      max_tokens: 1024,
      temperature: 1,
      messages: [{ role: "user", content: text }],
      system: "Respond only with short poems.",
    });

    let fullText = "";

    stream.on("text", (chunk) => {
      fullText += chunk;
      sendSSE(res, "text", { assistantResponse: fullText });
    });

    stream.on("end", () => {
      sendSSE(res, "end", "Claude stream ended");
      res.end();
      console.log("Stream complete.");
    });

    stream.on("error", (err) => {
      console.error("Claude SSE stream error:", err);
      sendSSE(res, "error", err.message);
      res.end();
    });

    // Cancel the stream on client disconnect
    req.on("close", () => {
      console.log("Client disconnected during Claude stream");
      stream.controller?.abort();
    });
  } catch (err: any) {
    console.error("Claude stream failed:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    } else {
      sendSSE(res, "error", err.message);
      res.end();
    }
  }
};
