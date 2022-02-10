import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/vinted_logo.png";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="wrapped">
      <Link to={"/"}>
        <img src={logo} alt="logo vinted" />
      </Link>

      <div className="button-nav">
        {" "}
        {Cookies.get("token") ? (
          <button
            onClick={() => {
              Cookies.remove("token");
              navigate("/");
            }}
          >
            Deconnexion
          </button>
        ) : (
          <div>
            <Link to={"/signup"}>
              <button>S'inscrire</button>
            </Link>
            <Link to={"/login"}>
              <button>Se connecter</button>
            </Link>
          </div>
        )}
        <button>Vends maintenant</button>
      </div>
    </nav>
  );
};

export default Navigation;
