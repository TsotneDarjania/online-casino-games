import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JunkgleAdventure from "./games/slots/jungle-adventure/index.tsx";
import Mines from "./games/pazzle/mines/index.tsx";

console.log("main tsx");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<Mines />} />
      <Route path="/jungle" element={<JunkgleAdventure />} />
      <Route path="/mines" element={<Mines />} />
    </Routes>
  </Router>
);
