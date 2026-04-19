import { useEffect, useRef } from "react";
import useWebSocket from "../hooks/useWebSocket";
import useNavigator from "../hooks/useNavigator";
import { WS_BASE } from "../config";

const PUBLISH_URL = `${WS_BASE}/publish`;

export default function Publisher() {
  const { sendMessage, isOpen } = useWebSocket(PUBLISH_URL);
  const { lastImage } = useNavigator();
  const lastSentRef = useRef<string | null>(null);

  useEffect(() => {
    if (!lastImage || !isOpen) return;
    if (lastImage === lastSentRef.current) return;
    lastSentRef.current = lastImage;
    sendMessage(lastImage);
  }, [lastImage, isOpen, sendMessage]);

  return (
    <div>
      <h2>Publishing</h2>
      {!isOpen ? (
        <p>Connecting publisher…</p>
      ) : (
        <p>Sending JPEG frames.</p>
      )}
    </div>
  );
}
