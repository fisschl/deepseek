import { convertToModelMessages, streamText } from "ai";
import { defineHandler } from "nitro";
import { deepseek } from "./completions";

export default defineHandler(async (event) => {
  const body: Record<string, any> = await event.req.json();

  const system = [
    "将用户输入的内容翻译为中文，专业术语使用行业通用译法。",
    "直接以标准 Markdown 格式输出译文，无需添加任何其他内容。",
  ];

  const result = streamText({
    model: deepseek("deepseek-v4-flash"),
    system: system.join("\n"),
    messages: await convertToModelMessages(body.messages),
  });

  return result.toUIMessageStreamResponse();
});
