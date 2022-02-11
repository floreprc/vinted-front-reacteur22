import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ setUser }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "https://vinted-reacteur22.herokuapp.com/user/login",
      { email: mail, password: password }
    );
    if (response.data.token) {
      setUser(response.data.token);
      console.log("ça fonctionne, mon token est", response.data.token);
      navigate("/");
    }
  };

  return (
    <div>
      <div className="login-form">
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
      </div>{" "}
    </div>
  );
};

export default Login;
