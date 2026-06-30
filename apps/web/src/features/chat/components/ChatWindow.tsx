"use client";

import { useChatSocket, type ChatMessage } from "@/hooks/useChatSocket";

interface Props {
  roomId: string;
  initialMessages: ChatMessage[];
  userId: string;
}

export default function ChatWindow({ roomId, initialMessages, userId }: Props) {
  const { messages, input, setInput, send } = useChatSocket({
    roomId,
    initialMessages,
    senderId: userId,
    senderRole: "user",
  });

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-xl font-bold text-foreground mb-4">상담 채팅</h1>
      <div className="h-96 overflow-y-auto border border-border rounded-[var(--radius)] p-4 space-y-2 bg-card mb-4">
        {messages.map((msg, i) => (
          <div
            key={msg.id ?? i}
            className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
          >
            <span
              className={`px-3 py-2 rounded-[calc(var(--radius)-2px)] text-sm ${
                msg.senderId === userId
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="메시지를 입력하세요"
          className="flex-1 border border-input rounded-[calc(var(--radius)-2px)] px-3 py-2 text-sm bg-background"
        />
        <button
          onClick={send}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-[calc(var(--radius)-2px)] text-sm font-medium hover:opacity-90 transition-opacity"
        >
          전송
        </button>
      </div>
    </div>
  );
}
