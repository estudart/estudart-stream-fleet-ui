import { useEffect, useRef, useState } from "react";

const JPEG_QUALITY = 0.6;
const CAPTURE_MS = 100;
const MAX_WIDTH = 960;

export default function useNavigator() {
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const mediaRecorderRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let isMounted = true;

    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    async function init() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        await video.play();

        mediaRecorderRef.current = setInterval(() => {
          if (!isMounted || !ctx) return;
          const w = video.videoWidth;
          const h = video.videoHeight;
          if (w === 0 || h === 0) return;

          const tw = w > MAX_WIDTH ? MAX_WIDTH : w;
          const th = Math.round((h * tw) / w);
          canvas.width = tw;
          canvas.height = th;
          ctx.drawImage(video, 0, 0, w, h, 0, 0, tw, th);

          const base64 = canvas
            .toDataURL("image/jpeg", JPEG_QUALITY)
            .replace(/^data:image\/jpeg;base64,/, "");
          setLastMessage(base64);
        }, CAPTURE_MS);
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }

    init();

    return () => {
      isMounted = false;
      if (mediaRecorderRef.current !== null) clearInterval(mediaRecorderRef.current);
      video.pause();
      video.srcObject = null;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return { lastMessage };
}
