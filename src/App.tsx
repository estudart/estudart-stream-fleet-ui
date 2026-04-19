import { Navigate, Route, Routes } from "react-router-dom";
import Streamer from "./components/Streamer";
import "./App.css";

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden />
          <span className="brand-name">StreamFleet</span>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/stream" replace />} />
          <Route path="/stream" element={<Streamer />} />
        </Routes>
      </main>
    </div>
  );
}
