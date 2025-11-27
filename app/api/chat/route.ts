// app/api/chat/route.ts
import { NextRequest } from "next/server";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const runtime = "edge";

// ✅ Read and validate the API key once, and keep it as a plain string
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  throw new Error("Missing env var OPENAI_API_KEY");
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const result = await streamText({
    // ✅ Pass apiKey directly into the model factory (no providerOptions)
    model: openai("gpt-4.1-mini", {
      apiKey: OPENAI_API_KEY,
    }),

    messages,

    // ⬇️ Put back your own config here if you had it before
    // system: "You are SellerSight, an AI that analyzes Amazon reviews for sellers...",
    // maxTokens: 1024,
    // tools: { ... },
    // experimental: { parallelToolCalls: false }, // if you need this behaviour
  });

  return result.toDataStreamResponse();
}
/**
// app/api/chat/route.ts  (or frontend/app/api/chat/route.ts)

import {
  streamText,
  UIMessage,
  convertToModelMessages,
  stepCountIs,
  createUIMessageStream,
  createUIMessageStreamResponse,
} from "ai";

import { MODEL } from "@/config";
import { SYSTEM_PROMPT } from "@/prompts";
import { isContentFlagged } from "@/lib/moderation";

// 🔧 tools – RAG first, web search as backup
import { vectorDatabaseSearch } from "./tools/search-vector-database";
import { webSearch } from "./tools/web-search";

export const maxDuration = 60;

// make TS happy and also fail fast if the key is missing
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set in environment variables");
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  // ---- 1) Run safety / moderation on the latest user text ----
  const latestUserMessage = messages.filter((m) => m.role === "user").pop();

  if (latestUserMessage) {
    const content = latestUserMessage.parts
      .filter((p) => p.type === "text")
      .map((p) => ("text" in p ? p.text : ""))
      .join("");

    if (content) {
      const mod = await isContentFlagged(content);

      if (mod.flagged) {
        // Use the helper from the ai SDK so types stay happy
        const stream = createUIMessageStream({
          execute({ writer }) {
            const id = "moderation-denial";

            writer.write({ type: "start" });
            writer.write({ type: "text-start", id });
            writer.write({
              type: "text-delta",
              id,
              delta:
                mod.denialMessage ??
                "Your message violates our guidelines. I can't answer that.",
            });
            writer.write({ type: "text-end", id });
            writer.write({ type: "finish" });
          },
        });

        return createUIMessageStreamResponse({ stream });
      }
    }
  }

  // ---- 2) Main model call – TOOLS: RAG FIRST, web search SECOND ----
  const result = streamText({
    model: MODEL,
    system: SYSTEM_PROMPT,
    messages: convertToModelMessages(messages),

    // Tools available to the model
    tools: {
      vectorDatabaseSearch, // 🔴 Your Pinecone / RAG tool – should be used first
      webSearch,            // 🔵 Fallback only when RAG has no data / ASIN missing
    },

    // stop tool-calling loops from going crazy
    stopWhen: stepCountIs(20),

    providerOptions: {
      openai: {
        parallelToolCalls: false,
      },
    },
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
  });
}
*/
