import useWebSocket from "../hooks/useWebSocket";
import { WS_BASE } from "../config";

type StreamProps = {
  channelId: string;
};

export default function Stream({ channelId }: StreamProps) {
  const wsUrl = `${WS_BASE}?channel=${encodeURIComponent(channelId)}`;
  const { lastMessage } = useWebSocket(wsUrl);

  return (
    <div>
      <h2>Live Stream</h2>
      {lastMessage ? (
        <img
          src={`data:image/jpeg;base64,${lastMessage}`}
          alt="stream"
          style={{ width: "1300px" }}
        />
      ) : (
        <p>Waiting for stream...</p>
      )}
    </div>
  );
}