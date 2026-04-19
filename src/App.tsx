import { NavLink, Route, Routes } from "react-router-dom";
import Streamer from "./components/Streamer";
import Publisher from "./components/Publisher";
import "./App.css";

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden />
          <span className="brand-name">StreamFleet</span>
        </div>
        <nav className="main-nav" aria-label="Primary">
          <NavLink
            to="/publish"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link--active" : "nav-link"
            }
          >
            Publish
          </NavLink>
          <NavLink
            to="/stream"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link--active" : "nav-link"
            }
          >
            Watch
          </NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/publish" element={<Publisher />} />
          <Route path="/stream" element={<Streamer />} />
        </Routes>
      </main>
    </div>
  );
}
