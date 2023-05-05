import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JunkgleAdventure from "./games/slots/jungle-adventure/index.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/games/slots/jungle-adventure"
          element={<JunkgleAdventure />}
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
