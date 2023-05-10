import React, { useEffect, useState } from "react";
import { MdArrowBack, MdClose } from "react-icons/md";
import { creditCard, gcash } from "../assets/index";
import GCash from "../components/paymentMethod/GCash";
import CreditCard from "./paymentMethod/CreditCard";
import GCashButton from "./paymentMethod/GCashButton";
import { Link } from "react-router-dom";

const CheckoutForm = () => {
  const [paymentOption, setPaymentOption] = useState(0);
  const [totalAmt, setTotalAmt] = useState(0);
  const [checkoutID, setCheckoutID] = useState("");
  const [products, setProducts] = useState([]);

  const displayPaymentForm = (paymentOption) => {
    const description = checkoutID;
    if (paymentOption == 0) {
      return <CreditCard amount={totalAmt} description={description} />;
    } else if (paymentOption == 1) {
      return <GCash amount={totalAmt} description={description} />;
    }
  };
  // Getting the Checkout Information
  useEffect(() => {
    const totalJSON = localStorage.getItem("totalPayment");
    const totalNumber = !!totalJSON ? JSON.parse(totalJSON) : 0;
    setTotalAmt(totalNumber);

    const productsJSON = localStorage.getItem("products");
    const productsArray = !!totalJSON ? JSON.parse(productsJSON) : [];
    setProducts(productsArray);

    const checkoutIDJSON = localStorage.getItem("checkoutID");
    const checkoutIDString = !!checkoutIDJSON ? JSON.parse(checkoutIDJSON) : "";
    setCheckoutID(checkoutIDString);
  }, []);

  return (
    // <div
    //   // id="proceed-to-checkout"
    //   // tabIndex="-1"
    //   // aria-hidden="true"
    //   className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    // >
    <div className="bg-background min-h-screen">
      {/* <!-- Modal content --> */}
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div>
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
            <ul className="items-center flex w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
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
                  <img src={gcash} className="w-10 h-10 ml-2" alt="card-iCon" />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Pay with Gcash
                  </span>
                </div>
              </li>
            </ul>
          </form>
          <div className="content-center w-full items-center ">
            <div className="">
              <h2 className="pt-4">Payment for ID{checkoutID}</h2>
            </div>

            <div className="p-8 border mt-5 border-gray-600">
              <h3>Order Summary</h3>
              <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                {products.map((item) => (
                  <li className="pb-3 sm:pb-4">
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
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        ₱ {item.price * item.RFID.length}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <h3 className="py-4">Amount to pay: ₱ {totalAmt}</h3>
            </div>
            <div className="border py-8 mt-10 border-gray-600">
              {displayPaymentForm(paymentOption)}
            </div>
          </div>

          <div></div>
          <div>
            <Link to="/cart">
              <button>
                <MdArrowBack />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
