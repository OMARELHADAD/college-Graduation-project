import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe("paste your public key");

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams(); // gigId

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(`/api/orders/intent/${id}`);
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, [id]);

  const appearance = { theme: "stripe" };
  const options = { clientSecret, appearance };

  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
