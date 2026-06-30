'use client';

import { useState, useEffect, useRef } from 'react';

export interface ChatMessage {
  id?: string;
  senderId: string;
  senderRole: string;
  content: string;
}

interface Options {
  roomId: string | null | undefined;
  initialMessages: ChatMessage[];
  senderId: string;
  senderRole: string;
}

export function useChatSocket({ roomId, initialMessages, senderId, senderRole }: Options) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!roomId) return;

    setMessages(initialMessages);
    ws.current = new WebSocket(`ws://localhost:3000/ws?roomId=${roomId}`);
    ws.current.onmessage = (event) => {
      const message: ChatMessage = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    return () => ws.current?.close();
  // initialMessages는 roomId 변경 시점의 값만 사용하므로 deps에서 의도적으로 제외
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const send = () => {
    if (!input.trim() || !roomId) return;
    ws.current?.send(JSON.stringify({ senderId, senderRole, content: input }));
    setInput('');
  };

  return { messages, input, setInput, send };
}
