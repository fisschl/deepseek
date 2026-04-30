import { convertToModelMessages, streamText } from "ai";
import { defineHandler } from "nitro";
import { deepseek } from "./completions";

export default defineHandler(async (event) => {
  const body: Record<string, any> = await event.req.json();

  const result = streamText({
    model: deepseek("deepseek-v4-flash"),
    system:
      "你是一个专业翻译引擎。自动检测源语言并翻译为中文，专业术语使用行业通用译法，仅输出翻译结果。",
    messages: await convertToModelMessages(body.messages),
  });

  return result.toUIMessageStreamResponse();
});
