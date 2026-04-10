import { createDeepSeek } from "@ai-sdk/deepseek";
import { convertToModelMessages, streamText } from "ai";
import { defineHandler } from "nitro";
import { env } from "node:process";

const { DEEPSEEK_API_KEY } = env;

const deepseek = createDeepSeek({
  apiKey: DEEPSEEK_API_KEY,
});

export default defineHandler(async (event) => {
  const body: Record<string, any> = await event.req.json();

  const result = streamText({
    model: deepseek("deepseek-reasoner"),
    messages: await convertToModelMessages(body.messages),
  });

  return result.toUIMessageStreamResponse();
});
