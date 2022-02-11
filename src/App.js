import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Error from "./pages/Error";
import { useState } from "react";
import Navigation from "./components/Navigation";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleInfo,
  faSquareXmark,
  faAngleDown,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
library.add(faCircleInfo, faSquareXmark, faAngleDown, faTrash);

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  const [modalSignup, setModalSignup] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [resultsTab, setResultsTab] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const setUser = (token) => {
    console.log("mon token récupéré est ", token);
    if (token) {
      Cookies.set("userToken", token);
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };

  return (
    <Router>
      <Navigation
        token={token}
        setUser={setUser}
        setModalSignup={setModalSignup}
        setModalLogin={setModalLogin}
        modalSignup={modalSignup}
        modalLogin={modalLogin}
        resultsTab={resultsTab}
        setResultsTab={setResultsTab}
        setIsLoading={setIsLoading}
      />
      <Routes>
        <Route
          path="/"
          element={<Home resultsTab={resultsTab} isLoading={isLoading} />}
        ></Route>
        <Route path="/offer/:id" element={<Offer />}></Route>
        <Route path="/signup" element={<Signup setUser={setUser} />}></Route>
        <Route path="/login" element={<Login setUser={setUser} />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
