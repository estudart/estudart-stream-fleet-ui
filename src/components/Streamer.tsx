import { useState } from "react";
import IdInputField from "./IdInputField";
import VideoStream from "./VideoStream";


export default function Streamer() {
    const [channelId, setChannelId] = useState<string>("");

    return (
        <section className="page-card">
            <h1>StreamFleet</h1>
            <h2>Live Stream</h2>
            <IdInputField channelId={channelId} onChange={setChannelId} />
            {channelId.trim() ? (
                <VideoStream channelId={channelId}/>
            ) : (
                <p className="status-line">Enter a channel ID above to connect.</p>
            )}
        </section>
    );
}