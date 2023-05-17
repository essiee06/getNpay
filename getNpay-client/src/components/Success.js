import React from "react";
import { Link, useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const products = JSON.parse(searchParams.get("products"));
  const totalAmt = searchParams.get("totalAmt");
  if (!products) {
    return <div>Error: products not found</div>;
  }
  return (
    <div className="container items-center flex justify-center p-10 h-screen">
      <div className="p-4 rounded shadow-lg ring ring-green-600/50">
        <div className="flex flex-col items-center space-y-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-green-600 w-28 h-28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="border px-8 mt-5 border-gray-600">
            <h3 className="py-4">Order Summary</h3>
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
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      ₱ {item.price * item.RFID.length}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className="py-4">Amount to pay: ₱ {totalAmt}</h3>
          </div>
          <h1 className=" py-4 text-2xl font-bold">
            Thank You for YOur Purchase!
          </h1>
          <p>GCash Payment successfully received.</p>
          <Link
            className="inline-flex items-center px-4 py-2 text-white bg-green-600 border border-green-600 rounded rounded-full hover:bg-green-700 focus:outline-none focus:ring"
            to="/cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span className="text-sm font-medium">back</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
