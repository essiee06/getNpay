import React from "react";
import { paymongo } from "../../api/paymongo";

function PayWithGCash() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!paymongo || !paymongo.createPaymentIntent) {
      console.error(
        "Paymongo object or createPaymentIntent method is undefined"
      );
      return;
    }

    const { id } = await paymongo.createPaymentIntent(10000, "PHP");
    try {
      const { paymentMethod } = await window.Paymongo.payment.create({
        // GCash payment details payment_intent_id: id,
        payment_method: {
          type: "gcash",
          amount: 1000.0,
          redirect: {
            success: "https://example.com/success",
            failed: "https://example.com/failed",
            canceled: "https://example.com/canceled",
          },
          billing: {
            email: "test@example.com",
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
        <button
          type="submit"
          className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none
         focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Pay with GCash
        </button>
      </form>
    </div>
  );
}

export default PayWithGCash;
