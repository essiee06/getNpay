import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GCash from "./GCash";

const Checkout = ({ totalAmt, products }) => {
  const [paymentOption, setPaymentOption] = useState(0);
  const [checkoutID, setCheckoutID] = useState("");
  const navigate = useNavigate();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showGCash, setShowGCash] = useState(false);

  //   // Getting the Checkout Information
  useEffect(() => {
    const checkoutIDJSON = localStorage.getItem("checkoutID");
    const checkoutIDString = !!checkoutIDJSON ? JSON.parse(checkoutIDJSON) : "";
    setCheckoutID(checkoutIDString);
  }, []);

  const payment = async (token) => {
    setShowGCash(false);
    await axios
      .post("http://localhost:8000/pay", {
        amount: totalAmt * 100,
        token: token,
        checkoutID: checkoutID,
      })
      .then(() => {
        navigate("/success");
      })
      .catch((error) => {
        console.error("Payment Error: ", error);
      });
  };
  return (
    <div>
      {/* <!-- Main modal --> */}
      <div
        id="checkout"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-md max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="checkout"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="content-center w-full pt-4 items-center ">
              <div className="px-8 bg-white border mt-5 ">
                <h2 className="py-4">Payment for ID{checkoutID}</h2>

                <h3 className="pb-3">Order Summary</h3>
                <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                  {products.map((item) => (
                    <li key={item.id} className="pb-3 sm:pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            className="w-8 h-8 rounded-full"
                            src={item.imageProduct}
                            alt={item.productName}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {item.productName}
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {item.quantity} X ₱{item.price}
                          </p>
                        </div>
                        <div className="items-center text-base font-semibold text-gray-900 dark:text-white">
                          ₱ {item.price * item.RFID.length}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <h3 className="py-4">Amount to pay: ₱ {totalAmt}</h3>
              </div>
            </div>
            {/* <!-- Modal header --> */}
            <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                Select Payment Method
              </h3>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-6">
              <ul className="my-4 space-y-3">
                <li>
                  <div className="w-full flex items-center justify-center">
                    <StripeCheckout
                      stripeKey="pk_test_51MuEDZFWNvcSsDyX8BLoebDhjtd1Paz2uvoGGFfEaM0w17bY5DZ3ghAQ16tYJSdYcH60N23BFCXmkyr3jKCJymAH00XU1kSebi"
                      name="Get N' Pay"
                      amount={totalAmt * 100}
                      label="Pay with Card"
                      description={`Your Payment amount is $${totalAmt}`}
                      token={payment}
                      // email={userInfo.email}
                    />
                  </div>
                </li>
                <li>
                  <div className="w-full pb-8 flex items-center justify-center">
                    <button
                      onClick={() => setShowGCash(true)}
                      className="bg-gradient-to-b from-blue-200 via-blue-500 to-blue-400 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Pay with Gcash
                    </button>
                  </div>
                  {showGCash && (
                    <GCash
                      show={showGCash}
                      onClose={() => setShowGCash(false)}
                    />
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
