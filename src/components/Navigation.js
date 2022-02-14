import "./Navigation.css";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/vinted_logo.png";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";

const Navigation = ({
  token,
  setUser,
  setModalLogin,
  setModalSignup,
  modalLogin,
  modalSignup,
  setResultsTab,
  setIsLoading,
  pageNumber,
  resultsForEachPage,
  newOfferSubmited,
  setNewOfferSubmited,
}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [searchedText, setSearchedText] = useState("");
  const [priceBox, setPriceBox] = useState(false);
  const [sortBox, setSortBox] = useState(false);
  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();
  const [sortValue, setSortValue] = useState("asc");

  // Recovery of user informations (when identified)
  useEffect(() => {
    const fetchData = async (token) => {
      try {
        const response = await axios.get(
          `https://vinted-reacteur22.herokuapp.com/user/find?token=${token}`
        );
        setUsername(response.data.username);
      } catch (error) {
        // console.log(error.response);
      }
    };
    fetchData(token);
  }, [token]);

  // Request of item results (displayed on home page), integrating filters (title, price, sorting)
  useEffect(() => {
    const searchedItem = async () => {
      try {
        let toAdd = "";
        if (searchedText) {
          toAdd += `?title=${searchedText}`;
        }
        if (minValue) {
          if (searchedText) {
            toAdd += `&priceMin=${minValue}`;
          } else {
            toAdd += `?priceMin=${minValue}`;
          }
        }
        if (maxValue) {
          if (searchedText || minValue) {
            toAdd += `&priceMax=${maxValue}`;
          } else {
            toAdd += `?priceMax=${maxValue}`;
          }
        }
        if (searchedText || minValue || maxValue) {
          toAdd += `&sort=price-${sortValue}`;
        } else {
          toAdd += `?sort=price-${sortValue}`;
        }
        toAdd += `&resultsForEachPage=${resultsForEachPage}&page=${pageNumber}`;

        // console.log(toAdd);
        const response = await axios.get(
          `https://vinted-reacteur22.herokuapp.com/offers${toAdd}`
        );
        setResultsTab(response.data.offers);
        setIsLoading(false);
      } catch (error) {}
    };
    searchedItem();
  }, [
    searchedText,
    setResultsTab,
    setIsLoading,
    minValue,
    maxValue,
    sortValue,
    pageNumber,
    resultsForEachPage,
    newOfferSubmited,
    setNewOfferSubmited,
  ]);

  // Preventing scrolling when a modal is open
  useEffect(() => {
    const scrollingMgmt = () => {
      // const body = document.body;
      if (modalLogin || modalSignup) {
        document.body.classList.add("modalActive");
      } else {
        document.body.classList.remove("modalActive");
      }
    };
    scrollingMgmt();
  }, [modalLogin, modalSignup]);

  return (
    <nav className="wrapped nav-lines">
      <div className="big-screen-div">
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo vinted"
            onClick={() => setNewOfferSubmited(false)}
          />
        </Link>

        {/* Filter bar */}
        <div className="search-and-buttons">
          <SearchBar
            searchedText={searchedText}
            setSearchedText={setSearchedText}
            setPriceBox={setPriceBox}
            priceBox={priceBox}
            setSortBox={setSortBox}
            minValue={minValue}
            setMinValue={setMinValue}
            maxValue={maxValue}
            setMaxValue={setMaxValue}
            sortBox={sortBox}
            sortValue={sortValue}
            setSortValue={setSortValue}
            responsive="big-screen"
          />

          {/* authentification buttons + create new offer button  >> distinction between an authentificated and unauthentificated user*/}
          <div className="button-nav">
            {" "}
            {token ? (
              // Authentificated version
              <div>
                {username && <p>Bonjour {username}</p>}
                <button
                  className="exit-button"
                  onClick={() => {
                    setUser(null);
                    navigate("/");
                  }}
                >
                  Deconnexion
                </button>
                <Link to="/publish">
                  <button className="sell-now">Vends maintenant</button>
                </Link>
              </div>
            ) : (
              // Unauthentificated version
              <div>
                <button onClick={() => setModalSignup(true)}>S'inscrire</button>
                <button
                  onClick={() => setModalLogin(true)}
                  className="connexion-button"
                >
                  Se connecter
                </button>
                <Link to="/login">
                  <button className="sell-now">Vends maintenant</button>
                </Link>
              </div>
            )}
            {/* Modals to sign up and login */}
            {modalSignup && (
              <div className="background">
                <SignupModal
                  setUser={setUser}
                  setModalSignup={setModalSignup}
                  setModalLogin={setModalLogin}
                ></SignupModal>
              </div>
            )}
            {modalLogin && (
              <div className="background">
                <LoginModal
                  setUser={setUser}
                  setModalLogin={setModalLogin}
                  setModalSignup={setModalSignup}
                ></LoginModal>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* search bar for smaller screens */}
      <div>
        <SearchBar
          searchedText={searchedText}
          setSearchedText={setSearchedText}
          setPriceBox={setPriceBox}
          priceBox={priceBox}
          setSortBox={setSortBox}
          minValue={minValue}
          setMinValue={setMinValue}
          maxValue={maxValue}
          setMaxValue={setMaxValue}
          sortBox={sortBox}
          sortValue={sortValue}
          setSortValue={setSortValue}
          responsive="small-screen"
        />
      </div>
    </nav>
  );
};

export default Navigation;
