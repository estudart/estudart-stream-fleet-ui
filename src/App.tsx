import { useState } from "react";
import "./App.css";
import Stream from "./components/Stream";
import IdInputField from "./components/IdInputField";

function App() {
  const [channelId, setChannelId] = useState<string>("");

  return (
    <div>
      <h1>StreamFleet</h1>
      <IdInputField channelId={channelId} onChange={setChannelId} />
      {channelId.trim() ? (
        <Stream channelId={channelId.trim()} />
      ) : (
        <p>Enter a channel ID above to connect.</p>
      )}
    </div>
  );
}

export default App
