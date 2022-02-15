import "./Offer.css";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";

const Offer = ({ token, setModalLogin }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [item, setItem] = useState();

  // useEffect(() => {

  // }, []);

  // Request on the database to find infos on the selected item
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://vinted-reacteur22.herokuapp.com/offer?id=${id}`
      );
      setItem(response.data);
      setIsLoading(false);
    };
    fetchData();
    // setProtectionFees(item.product_price * 0.1);
    // setShippingCost(item.product_price * 0.2);
    // setTotalBasket(item.product_price + protectionFees + shippingCost);
  }, [id]);

  console.log(item);
  // console.log(totalBasket);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="background-item">
          <div className="img-item">
            {" "}
            <img src={item.product_image.secure_url} alt="" />
          </div>

          <div className="item-description">
            <div className="price-item"> {item.product_price} €</div>
            <div className="details-item">
              <p>
                <span>MARQUE</span>
                <span>{item.product_details[0].MARQUE}</span>
              </p>
              <p>
                <span>TAILLE</span>
                <span>{item.product_details[1].TAILLE}</span>
              </p>{" "}
              <p>
                <span>ETAT</span>
                <span>{item.product_details[2].ETAT}</span>
              </p>{" "}
              <p>
                <span>COULEUR</span>
                <span>{item.product_details[3].COULEUR}</span>
              </p>{" "}
              <p>
                <span>EMPLACEMENT</span>
                <span>{item.product_details[4].EMPLACEMENT}</span>
              </p>{" "}
              <p>
                <span>MODE DE PAIEMENT</span>
                <span>CARTE BANCAIRE, PAYPAL</span>
              </p>
            </div>
            <h3> {item.product_name}</h3>

            <p>{item.product_description}</p>
            <div className="owner">{item.owner.account.username}</div>
            {token ? (
              <Link
                to={"/payment"}
                state={{
                  amount: item.product_price,
                  title: item.product_name,
                  userID: item.owner._id,
                }}
              >
                <button className="buy-button">Acheter</button>
              </Link>
            ) : (
              <button onClick={() => setModalLogin(true)}>Acheter</button>
            )}
            <Link to={"/"}>
              <button className="home-return">
                Retour à la page des résultats
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;
