import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  resultsTab,
  setResultsTab,
  setIsLoading,
}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [searchedText, setSearchedText] = useState("");
  const [priceBox, setPriceBox] = useState(false);
  const [sortBox, setSortBox] = useState(false);

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

  useEffect(() => {
    const searchedItem = async () => {
      try {
        let toAdd = "";
        if (searchedText) {
          toAdd += `?title=${searchedText}`;
          console.log("Hello");
        }
        const response = await axios.get(
          `https://vinted-reacteur22.herokuapp.com/offers${toAdd}`
        );
        setResultsTab(response.data.offers);
        setIsLoading(false);
      } catch (error) {}
    };
    searchedItem();
  }, [searchedText, setResultsTab, setIsLoading]);

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
    <nav className="wrapped">
      <Link to={"/"}>
        <img src={logo} alt="logo vinted" />
      </Link>
      <div className="searching-inputs">
        <input
          type="text"
          id="searched-bar"
          placeholder="Rechercher des articles"
          onChange={(event) => {
            setSearchedText(event.target.value);
            console.log(searchedText);
          }}
        ></input>
        <button
          onClick={() => {
            setPriceBox(!priceBox);
            setSortBox(false);
          }}
        >
          <p>Prix</p>
          <FontAwesomeIcon icon="angle-down" />
        </button>
        {priceBox && (
          <div className="chooseAPrice">
            Trier par prix{" "}
            <button
              onClick={() => {
                setPriceBox(false);
              }}
            >
              Appliquer
            </button>
            <button
              onClick={() => {
                setPriceBox(false);
              }}
            >
              <FontAwesomeIcon icon="trash" />
            </button>
          </div>
        )}
        <button
          onClick={() => {
            setSortBox(!sortBox);
            setPriceBox(false);
          }}
        >
          <p>Trier par</p>
          <FontAwesomeIcon icon="angle-down" />
        </button>
        {sortBox && (
          <div className="sortByPrice">
            Trier par prix croissant ou décroissant{" "}
            <button
              onClick={() => {
                setSortBox(false);
              }}
            >
              Appliquer
            </button>
            <button
              onClick={() => {
                setSortBox(false);
              }}
            >
              <FontAwesomeIcon icon="trash" />
            </button>
          </div>
        )}
      </div>

      <div className="button-nav">
        {" "}
        {token ? (
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
          </div>
        ) : (
          <div>
            <button onClick={() => setModalSignup(true)}>S'inscrire</button>
            <button onClick={() => setModalLogin(true)}>Se connecter</button>
          </div>
        )}
        <button>Vends maintenant</button>
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
    </nav>
  );
};

export default Navigation;
