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
import {
  AI_NAME,
  CLEAR_CHAT_TEXT,
  OWNER_NAME,
  WELCOME_MESSAGE,
} from "@/config";
import Link from "next/link";

// ===== Schema =====
const formSchema = z.object({
  message: z
    .string()
    .min(1, "Message cannot be empty.")
    .max(2000, "Message must be at most 2000 characters."),
});

// 🔹 Helper to build the welcome message
const makeWelcomeMessage = (): UIMessage => ({
  id: `welcome-${Date.now()}`,
  role: "assistant",
  parts: [
    {
      type: "text",
      text: WELCOME_MESSAGE,
    },
  ],
});

export default function Chat() {
  const [isClient, setIsClient] = useState(false);
  const [durations, setDurations] = useState<Record<string, number>>({});
  const welcomeMessageShownRef = useRef<boolean>(false);

  const { messages, sendMessage, status, stop, setMessages } = useChat();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show welcome message once per load
  useEffect(() => {
    if (isClient && !welcomeMessageShownRef.current) {
      setMessages([makeWelcomeMessage()]);
      welcomeMessageShownRef.current = true;
    }
  }, [isClient, setMessages]);

  const handleDurationChange = (key: string, duration: number) => {
    setDurations((prev) => ({
      ...prev,
      [key]: duration,
    }));
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
    toast.success("New analysis started");
  }

  return (
    <div className="flex h-screen flex-col bg-[#FAF7F2] text-[#0F1111] font-sans">
      {/* Top gradient header */}
      <header className="flex-none bg-gradient-to-r from-[#4C6FFF] to-[#8A2EFF] px-6 py-4 text-white shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border border-white/40 bg-white/10">
              <AvatarImage src="/sellersight-logo.png" />
              <AvatarFallback>SS</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Ask SellerSight</span>
              <span className="text-[11px] opacity-90">
                Get data-backed insights from Amazon reviews.
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={clearChat}
            className="h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-xs text-white flex items-center gap-1"
          >
            <Plus className="h-3 w-3" />
            {CLEAR_CHAT_TEXT}
          </Button>
        </div>
      </header>

      {/* Middle: quick-start + messages */}
      <main className="flex-1 overflow-y-auto px-6 pt-3 pb-4">
        {/* Quick-start buttons */}
        <section className="mb-4 space-y-2 text-xs text-[#374151]">
          <p className="font-medium text-[11px] uppercase tracking-wide text-[#6B7280]">
            Want help getting started?
          </p>
          <div className="flex flex-wrap gap-2">
            <QuickStartButton
              label="Analyze my product's reviews"
              prompt="Help me analyze reviews for my Amazon product and show top complaints and strengths."
              onClick={(text) => form.setValue("message", text)}
            />
            <QuickStartButton
              label="Compare with competitor ASINs"
              prompt="Compare my ASIN to 1–3 close competitors based on Amazon reviews and highlight gaps."
              onClick={(text) => form.setValue("message", text)}
            />
            <QuickStartButton
              label="Find issues hurting my rating"
              prompt="From recent reviews, identify the key issues dragging down my star rating and suggest fixes."
              onClick={(text) => form.setValue("message", text)}
            />
          </div>
        </section>

        {/* Messages wall */}
        <section className="flex flex-col items-center">
          <div className="w-full max-w-3xl">
            {isClient ? (
              <>
                <MessageWall
                  messages={messages}
                  status={status}
                  durations={durations}
                  onDurationChange={handleDurationChange}
                />
                {status === "submitted" && (
                  <div className="flex justify-start max-w-3xl w-full mt-2">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  </div>
                )}
              </>
            ) : (
              <div className="flex justify-center max-w-2xl w-full py-6">
                <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Bottom input bar */}
      <footer className="flex-none border-t border-gray-200 bg-white/95 backdrop-blur px-6 pt-3 pb-2">
        <div className="mx-auto w-full max-w-3xl">
          <form id="chat-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="message"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="chat-form-message" className="sr-only">
                      Message
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="chat-form-message"
                        className="h-12 pr-14 pl-4 rounded-full border border-gray-300 bg-white text-sm shadow-sm focus:ring-2 focus:ring-[#FF9900] focus:outline-none"
                        placeholder="Ask SellerSight about your ASIN, category, or competitor…"
                        disabled={status === "streaming"}
                        aria-invalid={fieldState.invalid}
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
                          className="absolute right-1.5 top-1.5 h-9 w-9 rounded-full bg-[#232F3E] hover:bg-[#111827]"
                          type="submit"
                          disabled={!field.value.trim()}
                          size="icon"
                        >
                          <ArrowUp className="h-4 w-4 text-white" />
                        </Button>
                      )}
                      {(status === "streaming" || status === "submitted") && (
                        <Button
                          className="absolute right-1.5 top-1.5 h-9 w-9 rounded-full bg-gray-200 text-[#111827]"
                          size="icon"
                          type="button"
                          onClick={() => {
                            stop();
                          }}
                        >
                          <Square className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </div>

        <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
          <span>
            © {new Date().getFullYear()} {OWNER_NAME}
          </span>
          <span className="space-x-1">
            <Link href="/terms" className="underline">
              Terms
            </Link>
            <span>·</span>
            <Link href="https://ringel.ai/" className="underline">
              Powered by Ringel.AI
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
}

// Small helper for quick-start buttons
function QuickStartButton({
  label,
  prompt,
  onClick,
}: {
  label: string;
  prompt: string;
  onClick: (prompt: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(prompt)}
      className="rounded-xl border border-[#D1D5DB] bg-gradient-to-r from-[#E5F0FF] to-[#F5E8FF] px-3 py-2 text-left text-[11px] font-medium text-[#111827] hover:border-[#A5B4FC] hover:shadow-sm transition"
    >
      {label}
    </button>
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
