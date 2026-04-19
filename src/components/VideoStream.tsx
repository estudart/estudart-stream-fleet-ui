import { useCallback, useEffect, useRef, useState } from "react";
import useWebSocket from "../hooks/useWebSocket";
import { WS_BASE } from "../config";

type VideoStreamProps = {
  channelId: string;
};

export default function VideoStream({ channelId }: VideoStreamProps) {
  const wsUrl = `${WS_BASE}/consume?channel=${encodeURIComponent(channelId)}`;
  const imgRef = useRef<HTMLImageElement>(null);
  const [hasFrame, setHasFrame] = useState(false);

  useEffect(() => {
    setHasFrame(false);
    if (imgRef.current) imgRef.current.removeAttribute("src");
  }, [channelId]);

  // Write directly to the DOM — no React re-render per frame
  const onMessage = useCallback((data: string) => {
    if (imgRef.current) {
      imgRef.current.src = `data:image/jpeg;base64,${data}`;
    }
    setHasFrame((prev) => (prev ? prev : true));
  }, []);

  useWebSocket(wsUrl, { onMessage });

  return (
    <div className="video-stage">
      {!hasFrame ? (
        <p className="video-placeholder">Waiting for stream...</p>
      ) : null}
      <img ref={imgRef} className="stream-video" alt="stream" />
    </div>
  );
}
