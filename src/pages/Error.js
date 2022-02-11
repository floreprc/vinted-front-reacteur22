import errorPicture from "../assets/img/error_picture.svg";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="error-page">
      <img src={errorPicture} alt="" />{" "}
      <h2>La page que vous cherchez n'existe pas.</h2>
      <p>
        Il est possible que vous ayez mal saisi l'adresse ou que la page ait été
        déplacée.
      </p>
      <Link to={"/"}>
        <button>Retour à la page d'accueil</button>
      </Link>
    </div>
  );
};

export default Error;
