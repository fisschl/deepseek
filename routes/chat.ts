import { createDeepSeek } from "@ai-sdk/deepseek";
import { convertToModelMessages, streamText } from "ai";
import { Hono } from "hono";

const { DEEPSEEK_API_KEY } = Bun.env;

export const deepseek = createDeepSeek({
  apiKey: DEEPSEEK_API_KEY,
});

export const chat = new Hono().post("/completions", async (ctx) => {
  const { messages } = await ctx.req.json();
  const result = streamText({
    model: deepseek("deepseek-reasoner"),
    messages: await convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
});
