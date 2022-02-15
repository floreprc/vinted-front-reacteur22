import { Link } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import sentPicture from "../assets/img/purchase_success.svg";

const CheckoutForm = ({ userID, totalBasket, setCompleted, completed }) => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: `${userID}`,
      });
      const stripeToken = stripeResponse.token.id;
      console.log(stripeToken, userID);
      console.log(totalBasket);
      const response = await axios.post(
        "https://vinted-reacteur22.herokuapp.com/payment",
        {
          stripeToken: stripeToken,
          productPrice: totalBasket,
          userID: userID,
        }
      );
      console.log("hello", response.data);
      setCompleted(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  return completed ? (
    <div className="purchase-sent">
      <p>Commande envoyée !</p> <img src={sentPicture} alt="" />
      <Link to="/">
        <button className="back-home">Retour à l'accueil</button>
      </Link>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Valider</button>
    </form>
  );
};

export default CheckoutForm;
