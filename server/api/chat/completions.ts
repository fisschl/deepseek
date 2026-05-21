import { env } from "node:process";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { defineHandler } from "nitro";

const { DEEPSEEK_API_KEY } = env;

export const deepseek = createDeepSeek({
  apiKey: DEEPSEEK_API_KEY,
});

interface ChatRequest {
  model?: string;
  messages: UIMessage[];
}

export default defineHandler<{ body: ChatRequest }>(async (event) => {
  const { model, messages } = await event.req.json();

  const result = streamText({
    model: deepseek(model || "deepseek-v4-flash"),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
});
