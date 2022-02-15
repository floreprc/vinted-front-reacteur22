import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreateOffer from "./pages/CreateOffer";
import Payment from "./pages/Payment";
import Error from "./pages/Error";
import Footer from "./components/Footer";
import { useState } from "react";
import Navigation from "./components/Navigation";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSquareXmark,
  faAngleDown,
  faTrash,
  faArrowDownWideShort,
  faArrowUpWideShort,
  faMagnifyingGlass,
  faPlus,
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faSquareXmark,
  faAngleDown,
  faTrash,
  faArrowDownWideShort,
  faArrowUpWideShort,
  faMagnifyingGlass,
  faPlus,
  faCircleArrowLeft,
  faCircleArrowRight
);

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  const [modalSignup, setModalSignup] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [resultsTab, setResultsTab] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [newOfferSubmited, setNewOfferSubmited] = useState(false);

  const resultsForEachPage = 5;

  // Token management
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
        pageNumber={pageNumber}
        resultsForEachPage={resultsForEachPage}
        newOfferSubmited={newOfferSubmited}
        setNewOfferSubmited={setNewOfferSubmited}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              token={token}
              resultsTab={resultsTab}
              isLoading={isLoading}
              setPageNumber={setPageNumber}
              pageNumber={pageNumber}
              resultsForEachPage={resultsForEachPage}
              setModalLogin={setModalLogin}
            ></Home>
          }
        />
        <Route
          path="/offer/:id"
          element={<Offer token={token} setModalLogin={setModalLogin} />}
        ></Route>
        <Route path="/signup" element={<Signup setUser={setUser} />}></Route>
        <Route path="/login" element={<Login setUser={setUser} />}></Route>
        <Route
          path="/publish"
          element={
            <CreateOffer
              token={token}
              setNewOfferSubmited={setNewOfferSubmited}
              newOfferSubmited={newOfferSubmited}
            />
          }
        ></Route>
        <Route path="/payment" element={<Payment token={token} />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
