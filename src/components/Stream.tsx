import useWebSocket from "../hooks/useWebSocket";

export default function Stream() {
    const { lastMessage } = useWebSocket(
        'ws://192.168.68.100:8000/v1/ws/consume?channel=4943361472'
    );

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