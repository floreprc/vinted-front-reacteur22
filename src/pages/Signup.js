import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const signupFunc = async () => {
      const response = await axios.post(
        "https://vinted-reacteur22.herokuapp.com/user/signup",
        { username: username, email: mail, password: password }
      );
      console.log(response);
      Cookies.set("token", response.data.token);
    };
    signupFunc();
    navigate("/");
  };

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const response = await axios.get(
  //         "https://vinted-reacteur22.herokuapp.com/user/signup"
  //       );
  //       setData(response.data);
  //       setIsLoading(false);
  //     };
  //     fetchData();
  //   }, []);

  return (
    <div className="signup-form">
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
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
        <div className="newsletter">
          <input type="checkbox" name="newsletter" />
          <label htmlFor=""> S'inscrire à notre Newsletter</label>
        </div>
        <p>
          En m'inscrivant, je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans
        </p>

        <input type="submit" value="S'inscrire" className="submit" />
      </form>{" "}
      <Link to={"/login"}>
        <p>Tu as déjà un compte ? Connecte-toi !</p>
      </Link>
    </div>
  );
};

export default Signup;
