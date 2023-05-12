import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JunkgleAdventure from "./games/slots/jungle-adventure/index.tsx";
import Mines from "./games/pazzle/mines/index.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/games/slots/jungle-adventure"
        element={<JunkgleAdventure />}
      />
      <Route path="/games/puzzle/mines" element={<Mines />} />
    </Routes>
  </Router>
);
