import "./App.css";
import Mines from "./games/pazzle/mines";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JunkgleAdventure from "./games/slots/jungle-adventure";

console.log("app tsx");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mines />} />
        <Route path="/jungle" element={<JunkgleAdventure />} />
        <Route path="/mines" element={<Mines />} />
      </Routes>
    </Router>
  );
}

export default App;
