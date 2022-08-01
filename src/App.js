import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QSelection from "./components/QSelection";
import Questions from "./components/Questions";
import Restart from "./components/Restart";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="" exact element={<QSelection />} />
          <Route path="/questions" exact element={<Questions />} />
          <Route path="/restart" exact element={<Restart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
