import "./App.css";
import Mines from "./games/pazzle/mines";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JunkgleAdventure from "./games/slots/jungle-adventure";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mines />} />
        <Route
          path="/games/slots/jungle-adventure"
          element={<JunkgleAdventure />}
        />
        <Route path="/games/puzzle/mines" element={<Mines />} />
      </Routes>
    </Router>
  );
}

export default App;
