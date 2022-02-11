import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginModal = ({ setModalLogin, setUser }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://vinted-reacteur22.herokuapp.com/user/login",
        { email: mail, password: password }
      );
      if (response.data.token) {
        setUser(response.data.token);
        console.log("ça fonctionne, mon token est", response.data.token);
        navigate("/");
        setModalLogin(false);
      }
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 401) {
        setErrorMessage("Mauvais email et/ou mot de passe");
      }
    }
  };

  return (
    <div>
      <div className="login-form">
        <p className="close-icon" onClick={() => setModalLogin(false)}>
          <FontAwesomeIcon icon="square-xmark" />
        </p>
        <h2>Se connecter</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="mail"
            placeholder="Email"
            onChange={(event) => {
              setMail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <input type="submit" value="Se connecter" className="submit" />
        </form>{" "}
        <Link to={"/signup"}>
          <p>Pas encore de compte ? Inscris-toi !</p>
        </Link>
        <p className="error-message">{errorMessage}</p>
      </div>{" "}
    </div>
  );
};

export default LoginModal;
