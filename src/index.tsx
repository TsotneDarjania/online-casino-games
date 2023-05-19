import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JunkgleAdventure from "./games/slots/jungle-adventure/index.tsx";
import Mines from "./games/pazzle/mines/index.tsx";

console.log("index tsx browser router");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Mines />} />
      <Route path="/jungle" element={<JunkgleAdventure />} />
      <Route path="/mines" element={<Mines />} />
    </Routes>
  </BrowserRouter>
);
