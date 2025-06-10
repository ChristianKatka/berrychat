import { Request, Response } from "express";

/**
 * Async generator that yields simulated events over time.
 * Mimics a Claude-like response stream with fixed intervals.
 */
async function* generateEvents(text: string): AsyncGenerator<{
  event: string;
  data: any;
}> {
  yield { event: "start", data: `Received: ${text}` };

  for (let i = 1; i <= 3; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    yield { event: "text", data: `chunk ${i}` };
  }

  yield { event: "end", data: "done" };
}

/**
 * Handles writing Server-Sent Events (SSE) to the response stream.
 * Sends each yielded event in proper SSE format.
 */
async function streamSSE(
  res: Response,
  generator: AsyncGenerator<{ event: string; data: any }>
) {
  // Set critical SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); // Prevents buffering in proxies like Nginx
  res.flushHeaders?.();

  // Send initial ping to establish stream
  res.write(":\n\n");

  try {
    for await (const { event, data } of generator) {
      const payload = JSON.stringify({ event, data });
      res.write(`event: message\n`);
      res.write(`data: ${payload}\n\n`);
    }

    res.end(); // Close the stream once all events are sent
  } catch (err) {
    console.error("SSE stream error:", err);
    res.end();
  }
}

/**
 * Main controller to handle POST requests to /mock-message.
 * Accepts JSON with a "text" field, then streams a mock SSE response.
 */
export const sendMockMessageController = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("Client connected via POST");

  const { text } = req.body;

  if (typeof text !== "string") {
    res.status(400).json({ error: "Missing 'text' parameter" });
    return;
  }

  req.on("close", () => {
    console.log("Client disconnected");
  });

  // Start streaming
  await streamSSE(res, generateEvents(text));
};
