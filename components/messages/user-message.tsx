import { UIMessage } from "ai";
import { Response } from "@/components/ai-elements/response";

export function UserMessage({ message }: { message: UIMessage }) {
  return (
    <div className="w-full flex justify-end items-start gap-3 whitespace-pre-wrap">
      {/* User bubble */}
      <div className="ml-auto max-w-lg w-fit px-4 py-3 rounded-[20px] bg-[#146EB4] shadow text-sm text-white leading-relaxed">
        {message.parts.map((part, i) => {
          switch (part.type) {
            case "text":
              return (
                <Response key={`${message.id}-${i}`}>{part.text}</Response>
              );
            default:
              return null;
          }
        })}
      </div>

      {/* User avatar */}
      <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#E3E6E6] text-xs font-semibold text-[#0F1111]">
        U
      </div>
    </div>
  );
}
