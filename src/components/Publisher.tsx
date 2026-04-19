import { useEffect } from "react";
import useWebSocket from "../hooks/useWebSocket";
import useNavigator from "../hooks/useNavigator";
import { WS_BASE } from "../config";

export default function Publisher() {
  const wsUrl = `${WS_BASE}/publish`;

  const { sendMessage, isOpen } = useWebSocket(wsUrl);
  const { lastMessage: lastImage } = useNavigator();

  useEffect(() => {
    if (!lastImage || !isOpen) return;

    try {
      sendMessage(lastImage);
    } catch (err) {
      console.error("Error sending frame:", err);
    }
  }, [lastImage, isOpen, sendMessage]);

  return (
    <section className="page-card">
      <h2>Publishing stream</h2>
      {!isOpen ? (
        <p className="status-line">Connecting publisher…</p>
      ) : (
        <p className="status-line">Sending JPEG frames.</p>
      )}
    </section>
  );
}
