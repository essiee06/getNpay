import React, { useState } from "react";
import axios from "axios";
import { Paymongo } from "paymongo";
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");

  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      const paymongo = new Paymongo("pk_test_XWgQRf7AGZuvdV4d8rveic12");
      const paymentIntent = await paymongo.paymentIntents.create({
        amount: 1000,
        paymentMethod: {
          type: paymentMethod,
          details:
            paymentMethod === "gcash"
              ? {
                  phone: "+639123456789",
                  redirect: {
                    success: "http://localhost:3000/success",
                    failed: "<your failed URL>",
                  },
                }
              : {
                  number: "4242424242424242",
                  exp_month: "12",
                  exp_year: "2022",
                  cvc: "123",
                },
        },
        description: "Test payment",
        statement_descriptor: "Test payment",
        currency: "PHP",
        metadata: {
          customer_name: name,
          customer_email: email,
          billing_address: billingAddress,
        },
      });
      setPaymentUrl(paymentIntent.attributes.redirect.checkout_url);
      navigate("/payment");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handlePaymentConfirmation = async () => {
    try {
      const paymongo = new Paymongo("sk_test_kE82VnYyRqT5aSTUuATpZf6S");
      const paymentIntent = await paymongo.paymentIntents.retrieve(
        "https://api.paymongo.com/v1/payment_intents/${intent.id}/attach"
      );
      if (paymentIntent.attributes.status === "succeeded") {
        // payment succeeded, do something
      } else {
        // payment failed, do something
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Billing Address</label>
        <input
          type="text"
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
        />
      </div>
      <div>
        <label>Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="credit_card">Credit Card</option>
          <option value="gcash">GCash</option>
        </select>
      </div>
      {errorMessage && <div>{errorMessage}</div>}
      <button onClick={handlePayment}>Pay Now</button>
      {paymentUrl && (
        <div>
          Redirecting to payment page...
          <script>window.location.href = '{paymentUrl}';</script>
        </div>
      )}
      {navigate.location.pathname === "/payment" && (
        <div>
          <h2>Payment Page</h2>
          <button onClick={handlePaymentConfirmation}>Confirm Payment</button>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
