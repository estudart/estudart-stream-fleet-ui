import { useEffect, useRef, useState } from "react";

type SendPayload = Parameters<WebSocket["send"]>[0];

export default function useWebSocket(url: string) {
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onmessage = (event: MessageEvent<string>) => {
      setLastMessage(event.data);
    };

    ws.onopen = () => {
      console.log("WS connected");
    };

    ws.onclose = () => {
      console.log("WS disconnected");
    };

    ws.onerror = (err) => {
      console.error("WS error:", err);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return {
    lastMessage,
    sendMessage: (msg: SendPayload) => {
      wsRef.current?.send(msg);
    },
  };
}