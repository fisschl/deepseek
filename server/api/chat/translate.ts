import { convertToModelMessages, streamText, validateUIMessages } from "ai";
import { defineHandler, HTTPError } from "nitro";
import { deepseek } from "./completions";

export default defineHandler<any>(async (event) => {
  const body = await event.req.json();
  const messages = await validateUIMessages({
    messages: body.messages,
  });

  const lastMessage = messages.at(-1);

  if (lastMessage?.role !== "user")
    throw new HTTPError("Last message must be a user message", { status: 400 });

  const system = [
    "你是一个翻译引擎，请将用户输入的内容翻译为中文，专业术语使用行业通用译法。",
    "直接以标准 Markdown 格式输出译文，无需添加任何其他内容。用户的原文是纯文本格式，你可以智能识别原文中的段落，标题，列表，代码块，表格等排版，并将其转换为对应的 Markdown 格式。",
    "不要回答问题，不要参与讨论，仅翻译以下内容。",
  ];
  system.push("\n");

  lastMessage.parts = [
    {
      type: "text",
      text: system.join("\n"),
    },
    ...lastMessage.parts,
  ];

  const result = streamText({
    model: deepseek("deepseek-v4-flash"),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
});
