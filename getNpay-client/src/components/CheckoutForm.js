import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { creditCard, gcash } from "../assets/index";
import GCash from "../components/paymentMethod/GCash";
import CreditCard from "./paymentMethod/CreditCard";

const CheckoutForm = () => {
  const [paymentOption, setPaymentOption] = useState(0);
  const [total, setTotal] = useState(0);
  const [checkoutID, setCheckoutID] = useState("");

  const displayPaymentForm = (paymentOption) => {
    const description = checkoutID;
    if (paymentOption == 0) {
      return <CreditCard amount={total} description={description} />;
    } else if (paymentOption == 1) {
      return <GCash amount={total} description={description} />;
    }
  };
  // Getting the Checkout Information
  useEffect(() => {
    const totalJSON = localStorage.getItem("totalPayment");
    const totalNumber = !!totalJSON ? JSON.parse(totalJSON) : 0;
    setTotal(totalNumber);

    const checkoutIDJSON = localStorage.getItem("checkoutID");
    const checkoutIDString = !!checkoutIDJSON ? JSON.parse(checkoutIDJSON) : "";
    setCheckoutID(checkoutIDString);
  }, []);

  return (
    <div
      id="proceed-to-checkout"
      tabindex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-md max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="proceed-to-checkout"
          >
            <MdClose />
            <span className="sr-only">Close modal</span>
          </button>
          {/* <!-- Modal header --> */}
          <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
              Select Payment Method
            </h3>
          </div>
          {/* <!-- Modal body --> */}
          <div className="p-6">
            <form
              onChange={(event) => {
                setPaymentOption(event.target.value);
              }}
            >
              <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      name="paymentOption"
                      type="radio"
                      value={0}
                      defaultChecked
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <img
                      src={creditCard}
                      className="w-10 h-10 ml-2"
                      alt="card-iCon"
                    />
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Pay with Card
                    </span>
                  </div>
                </li>

                <li className="w-full dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      name="paymentOption"
                      type="radio"
                      value={1}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />{" "}
                    <img
                      src={gcash}
                      className="w-10 h-10 ml-2"
                      alt="card-iCon"
                    />
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Pay with Gcash
                    </span>
                  </div>
                </li>
              </ul>
            </form>
          </div>
          <div className="flex content-center w-full items-center ">
            {displayPaymentForm(paymentOption)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
