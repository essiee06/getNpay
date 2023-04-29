import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripee();
  const element = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: ElementInternals.getElements(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:8000/payment", {
          amount: 1000,
          id,
        });
        if (response.data.success) {
          console.log("Successful Payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };
  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <CardElement options={CARD_OPTIONS} />
            </div>
          </div>
          <button>PAY</button>
        </form>
      ) : (
        <div>
          <h2> You just passed!</h2>
        </div>
      )}
    </>
  );
}
