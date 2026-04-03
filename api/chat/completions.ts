import { defineHandler } from "nitro";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { convertToModelMessages, streamText } from "ai";
import { env } from "node:process";
import { any, array, object, parse } from "valibot";

const { DEEPSEEK_API_KEY } = env;

export const deepseek = createDeepSeek({
  apiKey: DEEPSEEK_API_KEY,
});

const RequestSch = object({
  messages: array(any()),
});

export default defineHandler(async (event) => {
  const body = await event.req.json();
  const { messages } = parse(RequestSch, body);
  const result = streamText({
    model: deepseek("deepseek-reasoner"),
    messages: await convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
});
