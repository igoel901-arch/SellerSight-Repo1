import {
  streamText,
  UIMessage,
  convertToModelMessages,
  createUIMessageStreamResponse,
} from "ai";
import { MODEL } from "@/config";
import { SYSTEM_PROMPT } from "@/prompts";
import { isContentFlagged } from "@/lib/moderation";
import { vectorDatabaseSearch } from "./tools/search-vector-database";
import { webSearch } from "./tools/web-search";

export const maxDuration = 60;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const latestUserMessage = messages.filter(m => m.role === "user").pop();

  if (latestUserMessage) {
    const content = latestUserMessage.parts
      .filter(p => p.type === "text")
      .map(p => ("text" in p ? p.text : ""))
      .join("");

    const mod = await isContentFlagged(content);
    if (mod.flagged) {
      return createUIMessageStreamResponse({
        stream: {
          async *[Symbol.asyncIterator]() {
            yield { type: "start" };
            yield {
              type: "text-delta",
              id: "moderation",
              delta: mod.denialMessage,
            };
            yield { type: "finish" };
          },
        },
      });
    }
  }

  // PRIMARY change: RAG is forced FIRST before web search
  const preferredTools = {
    vectorDatabaseSearch, // Force usage if possible
    webSearch,            // Only fallback when dataset missing
  };

  const result = streamText({
    model: MODEL,
    system: SYSTEM_PROMPT,
    messages: convertToModelMessages(messages),
    tools: preferredTools,
    maxSteps: 20,
    providerOptions: {
      openai: {
        apiKey: OPENAI_API_KEY,
        parallelToolCalls: false,
      },
    },
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
  });
}
