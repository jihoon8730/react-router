import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Calculator from "./pages/Calculator/Calculator";
import Timer from "./pages/Timer/component/Timer";
import Cats from "./pages/Cats/Cats";

function App() {
  return (
    <div className="App">
      <ul className="links">
        <li className="link">
          <Link to="/calculator" className="link-line">
            계산기
          </Link>
        </li>
        <li className="link">
          <Link to="/timer" className="link-line">
            타이머
          </Link>
        </li>
        <li className="link">
          <Link to="/cats" className="link-line">
            고양이
          </Link>
        </li>
      </ul>
      <Routes>
        <Route path="/calculator" element={<Calculator />} />
        <Route
          path="/timer"
          element={
            <>
              <Timer
                intitHour={0}
                initMin={0}
                initSec={0}
                closeMent="타이머 끝"
              />
            </>
          }
        />
        <Route
          path="/cats"
          element={
            <>
              <Cats keywordSearch="B" />
              <Cats keywordSearch="C" />
              <Cats keywordSearch="D" />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
