import "./Navigation.css";

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
}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [searchedText, setSearchedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const updateResults = (title) => {
    // console.log("check :", resultsTab);
    if (title) {
      const filtered = resultsTab.filter((item) => {
        return item.product_name.toLowerCase().includes(title.toLowerCase());
      });
      setResultsTab(filtered);
    }

    // console.log("filtered :", filtered);
  };

  const searchedItem = async (text) => {
    try {
      const response = await axios.get(
        `https://vinted-reacteur22.herokuapp.com/offers`
      );
      console.log(response.data.offers);
      setResultsTab(response.data.offers);
      setIsLoading(true);
      if (isLoading) {
        console.log("resultTab avant filtre ==>", resultsTab);
        updateResults(text);
        console.log("resultTab final ==>", resultsTab);
      }
    } catch (error) {}
  };

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
      <input
        type="text"
        placeholder="Rechercher des articles"
        onChange={(event) => {
          setSearchedText(event.target.value);
          searchedItem(event.target.value);
          console.log(searchedText);
        }}
      ></input>
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
            ></SignupModal>
          </div>
        )}
        {modalLogin && (
          <div className="background">
            <LoginModal
              setUser={setUser}
              setModalLogin={setModalLogin}
            ></LoginModal>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
