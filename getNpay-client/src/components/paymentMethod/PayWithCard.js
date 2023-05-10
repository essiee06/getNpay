import React, { useEffect, useState } from "react";
import { paymongo } from "../../api/paymongo";

function PayWithCard() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paymongo.com/v1/paymongo.js";
    script.async = true;
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      setIsScriptLoaded(true);
    });

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isScriptLoaded || !window.Paymongo || !window.Paymongo.card) {
      console.error("Paymongo script or card object not loaded");
      return;
    }

    const cardElement = window.Paymongo.card.mount("#card-element");

    const { id } = await paymongo.createPaymentIntent(10000, "PHP");

    try {
      const { paymentMethod } = await window.Paymongo.payment.create({
        payment_intent_id: id,
        payment_method: {
          type: "card",
          card: {
            number: cardElement.cardNumber,
            exp_month: cardElement.expiryMonth,
            exp_year: cardElement.expiryYear,
            cvc: cardElement.cvc,
          },
          billing: {
            address: {
              line1: "Test address",
              city: "Test city",
              state: "Test state",
              postal_code: "1000",
              country: "PH",
            },
            name: "Test name",
            email: "test@example.com",
            phone: "09123456789",
          },
        },
      });

      console.log(paymentMethod);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit}>
        <div
          id="card-element"
          className="p-4 rounded-md border border-gray-300"
        ></div>

        <button
          type="submit"
          className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Pay with Card
        </button>
      </form>
    </div>
  );
}

export default PayWithCard;
