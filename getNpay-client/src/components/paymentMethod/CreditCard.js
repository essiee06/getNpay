import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const CreditCard = ({ amount, description }) => {
  const [payNow, setPayNow] = useState(false);
  const [totalAmt, setTotalAmt] = useState("");
  // Getting the Checkout Information
  // useEffect(() => {
  //   const totalJSON = localStorage.getItem("totalPayment");
  //   const totalNumber = !!totalJSON ? JSON.parse(totalJSON) : 0;
  //   setTotalAmt(totalNumber);

  //   const productsJSON = localStorage.getItem("products");
  //   const productsArray = !!totalJSON ? JSON.parse(productsJSON) : [];
  //   setProducts(productsArray);

  //   const checkoutIDJSON = localStorage.getItem("checkoutID");
  //   const checkoutIDString = !!checkoutIDJSON ? JSON.parse(checkoutIDJSON) : "";
  //   setCheckoutID(checkoutIDString);
  // }, []);

  //STRIPE
  const payment = async (token) => {
    await axios.post("http://localhost:8000/pay", {
      amount: totalAmt * 100,
      token: token,
    });

    
  };
  const handleCheckout = () => {
    setPayNow(true);
  };
  return (
    <div>
      {payNow && (
        <div className="w-full mt-6 flex items-center justify-center">
          <StripeCheckout
            stripeKey="pk_test_51MuEDZFWNvcSsDyX8BLoebDhjtd1Paz2uvoGGFfEaM0w17bY5DZ3ghAQ16tYJSdYcH60N23BFCXmkyr3jKCJymAH00XU1kSebi"
            name="Get N' Pay"
            amount={totalAmt * 100}
            label="Place Order"
            description={`Your Payment amount is $${totalAmt}`}
            token={payment}
            // email={userInfo.email}
          />
        </div>
      )}
    </div>
  );
};

export default CreditCard;
