import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import "./Payment.css";

const Payment = ({ token }) => {
  const location = useLocation();
  const { title, amount, userID } = location.state;
  const [protectionFees, setProtectionFees] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [totalBasket, setTotalBasket] = useState(0);
  const [completed, setCompleted] = useState(false);
  const stripePromise = loadStripe(
    "pk_test_51KTRERFT2kPusbx9DMIANtYJg82PZyi7NCGfICmnJN9fVhf0zVvuaJOuYRJ87eNTO0mWaPJcwMXyrEnQWBvBCyh100Q741wDCE"
  );
  useEffect(() => {
    setProtectionFees(amount * 0.1);
    setShippingCost(amount * 0.2);
    setTotalBasket(amount + amount * 0.1 + amount * 0.2);
  }, [amount]);

  console.log({
    userID: userID,
    totalBasket: totalBasket,
    title: title,
  });

  return token ? (
    <div className="payment-background">
      <div className="payment-box">
        <h2>Résumé de la commande</h2>
        <p>
          Commande <span>{amount.toFixed(2)} €</span>
        </p>
        <p>
          Frais protection acheteurs <span>{protectionFees.toFixed(2)} €</span>
        </p>
        <p>
          Frais de port <span>{shippingCost.toFixed(2)} €</span>
        </p>
        <p>
          Total<span>{totalBasket.toFixed(2)} €</span>
        </p>
        {!completed && (
          <p className="payment-summary">
            Il ne vous reste plus qu'une étape pour vous offrir
            <span> {title}</span>. Vous allez payer
            <span> {totalBasket.toFixed(2)} €</span> (frais de portection et
            frais de port inclus)
          </p>
        )}
        {location.state && totalBasket > amount && (
          <Elements stripe={stripePromise}>
            <CheckoutForm
              userID={userID}
              totalBasket={totalBasket}
              setCompleted={setCompleted}
              completed={completed}
            />
          </Elements>
        )}
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Payment;
