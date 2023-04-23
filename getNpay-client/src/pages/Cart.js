import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

      <div className="max-w-screen-xl mx-auto">
        <CartItem />
        <div className="bg-[#fafafa] py-6 px-4">
          <div className=" flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
            <h2 className="text-2xl font-medium "> cart totals</h2>
            <p className="flex items-center gap-4 text-base">
              Subtotal{" "}
              <span className="font-titleFont font-bold text-lg">
                ₱{totalAmt}
              </span>
            </p>
          </div>
          <p className="font-titleFont font-semibold flex justify-between mt-6">
            Total <span className="text-xl font-bold">₱{totalAmt}</span>
          </p>
          <p
            type="button"
            data-modal-target="CheckoutModal"
            data-modal-show="CheckoutModal"
            className=" text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300"
          >
            proceed to checkout
          </p>
          {/* {payNow && (
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
          )} */}

          {/* CHECKOUT MODAL */}
          <div>
            <div
              id="CheckoutModal"
              tabindex="-1"
              class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
              <div class="relative w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-hide="popup-modal"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                  <div class="p-6 text-center">
                    <ul class="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
                      <li class="w-full">
                        <div
                          onClick={handleCheckout}
                          class="inline-block w-full p-4 text-gray-900 bg-gray-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
                          aria-current="page"
                        >
                          Pay with Card
                        </div>
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
                      </li>

                      <li class="w-full">
                        <button
                          class="inline-block w-full p-4 bg-white rounded-r-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                          aria-current="page"
                        >
                          Pay with Gcash
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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
      </div>

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
