import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { emptycart, logo3, shoppingcart } from "../assets/index";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Header from "../components/Header";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const productData = useSelector((state) => state.getNpay.productData);
  const userInfo = useSelector((state) => state.getNpay.userInfo);
  const [payNow, setPayNow] = useState(false);
  const [totalAmt, setTotalAmt] = useState("");

  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price.toFixed(2));
  }, [productData]);

  const handleCheckout = () => {
    if (userInfo) {
      setPayNow(true);
    } else {
      toast.error("Please sign in to Checkout");
    }
  };

  //STRIPE
  const payment = async (token) => {
    await axios.post("http://localhost:8000/pay", {
      amount: totalAmt * 100,
      token: token,
    });
  };
  return (
    <div>
      <Header />
      {/* <img
        className="w-full h-60 object-cover"
        src="https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="cartImg"
      /> */}
      <div className="px-10 py-10">
        <CartItem />
        <div className="bg-[#fafafa] py-6 px-4">
          <div className=" flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
            <h2 className="text-2xl font-medium "> cart totals</h2>
            <p className="flex items-center gap-4 text-base">
              Subtotal{" "}
              <span className="font-titleFont font-bold text-lg">
                ${totalAmt}
              </span>
            </p>
          </div>
          <p className="font-titleFont font-semibold flex justify-between mt-6">
            Total <span className="text-xl font-bold">${totalAmt}</span>
          </p>
          <button
            onClick={handleCheckout}
            className=" text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300"
          >
            proceed to checkout
          </button>
          {payNow && (
            <div className="w-full mt-6 flex items-center justify-center">
              <StripeCheckout
                stripeKey="pk_test_51MuEDZFWNvcSsDyX8BLoebDhjtd1Paz2uvoGGFfEaM0w17bY5DZ3ghAQ16tYJSdYcH60N23BFCXmkyr3jKCJymAH00XU1kSebi"
                name="Get N' Pay"
                amount={totalAmt * 100}
                label="Place Order"
                description={`Your Payment amount is $${totalAmt}`}
                token={payment}
                email={userInfo.email}
              />
            </div>
          )}
        </div>
      </div>
      <Link to="/">
        <button className="mt-8 ml-7 flex items-center gap-1 text-gray-400 hover:text-black duration-300 pb-8">
          <span>
            <HiOutlineArrowLeft />
          </span>
          go shopping
        </button>
      </Link>

      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Cart;
