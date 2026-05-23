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
  system?: string;
  messages: UIMessage[];
}

export default defineHandler<{ body: ChatRequest }>(async (event) => {
  const body = await event.req.json();

  const result = streamText({
    model: deepseek(body.model || "deepseek-v4-flash"),
    system: body.system,
    messages: await convertToModelMessages(body.messages),
  });

  return result.toUIMessageStreamResponse();
});
