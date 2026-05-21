import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { defineHandler } from "nitro";
import { deepseek } from "./completions";

export default defineHandler<{ body: { messages: UIMessage[] } }>(async (event) => {
  const body = await event.req.json();

  body.messages
    .filter((item) => item.role === "user")
    .forEach((message) => {
      const part = message.parts.find((part) => part.type === "text");
      if (!part) return;
      part.text = `翻译以下内容：\n\n${part.text}`;
    });

  const system = [
    "你是一个翻译引擎，你的任务是将用户提供的内容翻译为中文，专业术语使用行业通用译法。",
    "直接以标准 Markdown 格式输出译文，无需添加任何其他内容。你可以智能识别原文中的段落，标题，列表，代码块，表格等排版，并将其转换为对应的 Markdown 格式。",
  ].join("\n");

  const result = streamText({
    model: deepseek("deepseek-v4-flash"),
    system,
    messages: await convertToModelMessages(body.messages),
  });

  return result.toUIMessageStreamResponse();
});
