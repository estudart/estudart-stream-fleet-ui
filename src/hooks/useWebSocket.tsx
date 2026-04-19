import { useCallback, useEffect, useRef, useState } from "react";

type SendPayload = Parameters<WebSocket["send"]>[0];

type Options = {
  onMessage?: (data: string) => void;
};

export default function useWebSocket(url: string, opts?: Options) {
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const optsRef = useRef(opts);
  optsRef.current = opts;

  useEffect(() => {
    if (!url) {
      wsRef.current = null;
      setIsOpen(false);
      return;
    }

    let cancelled = false;
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onmessage = (event: MessageEvent<string>) => {
      const handler = optsRef.current?.onMessage;
      if (handler) {
        handler(event.data);
      } else {
        setLastMessage(event.data);
      }
    };

    ws.onopen = () => {
      if (!cancelled) setIsOpen(true);
      console.log("WS connected");
    };

    ws.onclose = () => {
      if (!cancelled) setIsOpen(false);
      console.log("WS disconnected");
    };

    ws.onerror = (err) => {
      console.error("WS error:", err);
    };

    return () => {
      cancelled = true;
      setIsOpen(false);
      ws.close();
    };
  }, [url]);

  const sendMessage = useCallback((msg: SendPayload) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(msg);
    }
  }, []);

  return {
    lastMessage,
    isOpen,
    sendMessage,
  };
}
