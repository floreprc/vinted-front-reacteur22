import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/vinted_logo.png";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";

const Navigation = ({ token, setUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [modalSignup, setModalSignup] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);

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

  return (
    <nav className="wrapped">
      <Link to={"/"}>
        <img src={logo} alt="logo vinted" />
      </Link>

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
