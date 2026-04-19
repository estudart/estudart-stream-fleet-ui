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
    <section className="page-card">
      <h2>Publishing</h2>
      {!isOpen ? (
        <p className="status-line">Connecting publisher…</p>
      ) : (
        <p className="status-line">Sending JPEG frames.</p>
      )}
    </section>
  );
}
