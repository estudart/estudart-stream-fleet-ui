import useWebSocket from "../hooks/useWebSocket";
import { WS_BASE } from "../config";

type VideoStreamProps = {
    channelId: string
}

export default function VideoStream ( { channelId }: VideoStreamProps) {
    const wsUrl = `${WS_BASE}/consume?channel=${encodeURIComponent(channelId)}`;
    const { lastMessage } = useWebSocket(wsUrl);
    return (
        <div className="video-stage">
            {lastMessage ? (
                <img
                    className="stream-video"
                    src={`data:image/jpeg;base64,${lastMessage}`}
                    alt="stream"
                />
            ) : (
                <p className="video-placeholder">Waiting for stream...</p>
            )}
        </div>
    )
}