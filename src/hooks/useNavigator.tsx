import { useEffect, useState } from "react";

/** Smaller files = less time on the wire vs Python clients sending compact frames. */
const JPEG_QUALITY = 0.65;
/** How often we sample the camera (was 1000ms → felt like a slideshow). */
const CAPTURE_MS = 100;
/** Max width before encode; height scales. Cuts encode + base64 size on HD webcams. */
const MAX_CAPTURE_WIDTH = 1280;

/** JPEG base64 payload only (no `data:image/...` prefix), for WS + `<img src="data:image/jpeg;base64,...">`. */
export default function useNavigator() {
  const [lastImage, setLastImage] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | undefined;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    async function init() {
      if (!ctx) return;

      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      video.srcObject = stream;
      await video.play();

      intervalId = setInterval(() => {
        const w = video.videoWidth;
        const h = video.videoHeight;
        if (w === 0 || h === 0) return;

        let tw = w;
        let th = h;
        if (tw > MAX_CAPTURE_WIDTH) {
          th = Math.round((h * MAX_CAPTURE_WIDTH) / w);
          tw = MAX_CAPTURE_WIDTH;
        }

        canvas.width = tw;
        canvas.height = th;
        ctx.drawImage(video, 0, 0, w, h, 0, 0, tw, th);
        const dataUrl = canvas.toDataURL("image/jpeg", JPEG_QUALITY);
        const base64 = dataUrl.replace(/^data:image\/jpeg;base64,/, "");
        setLastImage(base64);
      }, CAPTURE_MS);
    }

    void init().catch((err) => {
      console.error("Camera / capture failed:", err);
    });

    return () => {
      if (intervalId !== undefined) clearInterval(intervalId);
      video.pause();
      video.srcObject = null;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return { lastImage };
}
