"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useChat } from "@ai-sdk/react";
import { ArrowUp, Loader2, Plus, Square } from "lucide-react";
import { MessageWall } from "@/components/messages/message-wall";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UIMessage } from "ai";
import { useEffect, useState, useRef } from "react";
import { AI_NAME, CLEAR_CHAT_TEXT, OWNER_NAME, WELCOME_MESSAGE } from "@/config";
import Header from "@/components/ui/Header";

// Schema
const formSchema = z.object({
  message: z
    .string()
    .min(1, "Message cannot be empty.")
    .max(2000, "Message must be at most 2000 characters."),
});

// Welcome message builder
const makeWelcomeMessage = (): UIMessage => ({
  id: `welcome-${Date.now()}`,
  role: "assistant",
  parts: [{ type: "text", text: WELCOME_MESSAGE }],
});

export default function Chat() {
  const [isClient, setIsClient] = useState(false);
  const [durations, setDurations] = useState<Record<string, number>>({});
  const [showTerms, setShowTerms] = useState(false);
  const welcomeMessageShownRef = useRef<boolean>(false);

  // useChat from @ai-sdk/react – no `input` / `handleInputChange` used
  const { messages, sendMessage, status, stop, setMessages } = useChat({
    api: "/api/chat",
  });

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (isClient && !welcomeMessageShownRef.current) {
      setMessages([makeWelcomeMessage()]);
      welcomeMessageShownRef.current = true;
    }
  }, [isClient, setMessages]);

  const handleDurationChange = (key: string, duration: number) => {
    setDurations((prev) => ({ ...prev, [key]: duration }));
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    sendMessage({ text: data.message });
    form.reset();
  }

  function clearChat() {
    setMessages([makeWelcomeMessage()]);
    setDurations({});
    toast.success("Chat cleared");
  }

  const isStreaming = status === "streaming";
  const isSubmitted = status === "submitted";

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-50">
      <Header />

      <main className="flex-1 w-full flex justify-center px-4 pb-8">
        <div className="w-full max-w-6xl mt-4 flex flex-col gap-4">
          {/* Identity / value prop panel */}
          <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800">
                <span className="text-lg font-semibold tracking-tight">SS</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
                  SellerSight
                </h1>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-300">
                  Amazon Review Intelligence for Sellers
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm text-slate-100">
              <p>
                SellerSight turns raw Amazon reviews into{" "}
                <span className="font-semibold text-amber-300">
                  actionable product decisions
                </span>
                . Ask about any ASIN and get insights on sentiment, feature
                gaps, pricing perception, and more.
              </p>
              <ul className="list-disc space-y-1 pl-5 text-xs md:text-sm text-slate-200">
                <li>Spot hidden customer pain points before competitors.</li>
                <li>Benchmark your product vs. top-selling alternatives.</li>
                <li>
                  Get launch-ready recommendations on features, positioning, and
                  messaging.
                </li>
              </ul>
              <div className="mt-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-100">
                <p className="font-semibold text-amber-200">
                  Best results tip:
                </p>
                <p>
                  Start with your product&apos;s ASIN + marketplace (e.g.{" "}
                  <span className="font-mono">B09XYZ1234, Amazon US</span>) and
                  your goal (launch, optimisation, or competitor analysis).
                </p>
              </div>
            </div>
          </section>

          {/* Chat card */}
          <section className="flex flex-col bg-white text-[#0F1111] shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
            {/* Chat header */}
            <div className="flex items-center justify-between border-b px-6 py-4 bg-white shadow-sm">
              <div className="flex items-center gap-2">
                <Avatar className="size-8">
                  <AvatarImage src="/sellersight-logo.png" />
                  <AvatarFallback>SS</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-semibold tracking-tight">
                    Chat with {AI_NAME}
                  </p>
                  <p className="text-xs text-gray-500">
                    Ask about your ASIN&apos;s reviews, competitors, or feature
                    gaps.
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={clearChat}
                className="flex items-center gap-1"
              >
                <Plus className="size-4" />
                {CLEAR_CHAT_TEXT}
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6 bg-[#FAFAFA]">
              <MessageWall
                messages={messages}
                status={status}
                durations={durations}
                onDurationChange={handleDurationChange}
              />
              {isSubmitted && (
                <div className="flex justify-start max-w-3xl w-full mt-2">
                  <Loader2 className="size-4 animate-spin text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 bg-white p-4">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Controller
                    name="message"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="sr-only">Message</FieldLabel>

                        <div className="relative">
                          <Input
                            {...field}
                            placeholder="Ask SellerSight about your ASIN's reviews…"
                            className="rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-[#FF9900] focus:outline-none"
                            disabled={isStreaming}
                            autoComplete="off"
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                form.handleSubmit(onSubmit)();
                              }
                            }}
                          />

                          {(status === "ready" || status === "error") && (
                            <Button
                              type="submit"
                              disabled={!field.value.trim()}
                              size="icon"
                              className="absolute right-2 top-2 bg-[#FF9900] hover:bg-[#e68a00] text-black rounded-full"
                            >
                              <ArrowUp className="size-4" />
                            </Button>
                          )}

                          {(isStreaming || isSubmitted) && (
                            <Button
                              type="button"
                              size="icon"
                              onClick={() => stop()}
                              className="absolute right-2 top-2 bg-gray-200 text-black rounded-full"
                            >
                              <Square className="size-4" />
                            </Button>
                          )}
                        </div>
                      </Field>
                    )}
                  />
                </FieldGroup>
              </form>
            </div>
          </section>

          {/* Terms & Conditions */}
          <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4 text-xs text-slate-300">
            <p>
              By using SellerSight, you agree to the{" "}
              <button
                type="button"
                onClick={() => setShowTerms((v) => !v)}
                className="font-semibold text-amber-300 underline underline-offset-2"
              >
                Terms &amp; Conditions
              </button>
              .
            </p>

            {showTerms && (
              <div className="mt-3 space-y-2 text-[11px] leading-relaxed">
                <p className="font-semibold text-slate-100">
                  Terms &amp; Conditions
                </p>
                <ul className="list-disc space-y-1 pl-4">
                  <li>
                    SellerSight is a student project built for educational
                    purposes as part of the BITSoM AI capstone. It is{" "}
                    <span className="font-semibold">
                      not affiliated with or endorsed by Amazon
                    </span>
                    .
                  </li>
                  <li>
                    Insights are generated by AI from publicly available review
                    data and may contain errors or omissions. Do not rely on
                    these outputs as the sole basis for critical business
                    decisions.
                  </li>
                  <li>
                    Please do not paste confidential, sensitive, or personally
                    identifiable information (PII) into the chat. Any such data
                    you choose to share is at your own risk.
                  </li>
                  <li>
                    No guarantees are made about uptime, model performance, or
                    completeness of the underlying review dataset.
                  </li>
                  <li>
                    By continuing to use this assistant, you consent to your
                    queries being logged for debugging and academic evaluation.
                  </li>
                </ul>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="text-center py-2 text-sm text-gray-400">
        © {new Date().getFullYear()} {OWNER_NAME} — Built with SellerSight
      </footer>
    </div>
  );
}



/**"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useChat } from "@ai-sdk/react";
import { ArrowUp, Loader2, Plus, Square } from "lucide-react";
import { MessageWall } from "@/components/messages/message-wall";
import { ChatHeader, ChatHeaderBlock } from "@/app/parts/chat-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UIMessage } from "ai";
import { useEffect, useState, useRef } from "react";
import { AI_NAME, CLEAR_CHAT_TEXT, OWNER_NAME, WELCOME_MESSAGE } from "@/config";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/ui/Header";   // 👈 NEW HEADER IMPORT


// Schema
const formSchema = z.object({
  message: z
    .string()
    .min(1, "Message cannot be empty.")
    .max(2000, "Message must be at most 2000 characters."),
});

// Welcome message builder
const makeWelcomeMessage = (): UIMessage => ({
  id: `welcome-${Date.now()}`,
  role: "assistant",
  parts: [{ type: "text", text: WELCOME_MESSAGE }],
});

export default function Chat() {
  const [isClient, setIsClient] = useState(false);
  const [durations, setDurations] = useState<Record<string, number>>({});
  const welcomeMessageShownRef = useRef<boolean>(false);

  const { messages, sendMessage, status, stop, setMessages } = useChat();

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (isClient && !welcomeMessageShownRef.current) {
      setMessages([makeWelcomeMessage()]);
      welcomeMessageShownRef.current = true;
    }
  }, [isClient, setMessages]);

  const handleDurationChange = (key: string, duration: number) => {
    setDurations((prev) => ({ ...prev, [key]: duration }));
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    sendMessage({ text: data.message });
    form.reset();
  }

  function clearChat() {
    setMessages([makeWelcomeMessage()]);
    setDurations({});
    toast.success("Chat cleared");
  }

  return (
    <div className="flex h-screen flex-col bg-[#F7F7F7] text-[#0F1111] font-sans">
      <Header />

      <main className="flex-1 overflow-auto w-full flex justify-center">
        <div className="flex flex-col w-full max-w-5xl bg-white shadow-sm border border-gray-200 rounded-2xl mt-4 mb-32 mx-4 overflow-hidden">
          <div className="flex items-center justify-between border-b px-6 py-4 bg-white shadow-sm">
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarImage src="/sellersight-logo.png" />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
              <p className="font-semibold tracking-tight">Chat with {AI_NAME}</p>
            </div>
            <Button variant="outline" size="sm" onClick={clearChat} className="flex items-center gap-1">
              <Plus className="size-4" />
              {CLEAR_CHAT_TEXT}
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <MessageWall
              messages={messages}
              status={status}
              durations={durations}
              onDurationChange={handleDurationChange}
            />
            {status === "submitted" && (
              <div className="flex justify-start max-w-3xl w-full">
                <Loader2 className="size-4 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 bg-white p-4">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="message"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="sr-only">Message</FieldLabel>

                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Ask SellerSight about your ASIN's reviews…"
                          className="rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-[#FF9900] focus:outline-none"
                          disabled={status === "streaming"}
                          autoComplete="off"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              form.handleSubmit(onSubmit)();
                            }
                          }}
                        />

                        {(status === "ready" || status === "error") && (
                          <Button
                            type="submit"
                            disabled={!field.value.trim()}
                            size="icon"
                            className="absolute right-2 top-2 bg-[#FF9900] hover:bg-[#e68a00] text-black rounded-full"
                          >
                            <ArrowUp className="size-4" />
                          </Button>
                        )}

                        {(status === "streaming" || status === "submitted") && (
                          <Button size="icon" onClick={() => stop()}
                            className="absolute right-2 top-2 bg-gray-200 text-black rounded-full">
                            <Square className="size-4" />
                          </Button>
                        )}
                      </div>
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </div>
        </div>
      </main>

      <footer className="text-center py-2 text-sm text-gray-600">
        © {new Date().getFullYear()} {OWNER_NAME} — Built with SellerSight
      </footer>
    </div>
  );
}
*/
