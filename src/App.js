import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import { Link } from "react-router-dom";
import logo from "./assets/img/vinted_logo.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
library.add(faCircleInfo);

function App() {
  return (
    <Router>
      <nav className="wrapped">
        <Link to={"/"}>
          <img src={logo} alt="logo vinted" />
        </Link>

        <div className="button-nav">
          {" "}
          <button>S'inscrire</button>
          <button>Se connecter</button>
          <button>Vends maintenant</button>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/offer/:id" element={<Offer />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
