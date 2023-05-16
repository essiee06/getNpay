import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectCart = () => {
  const navigate = useNavigate();
  const [selectedCart, setSelectedCart] = useState("");

  const handleCartSelection = (event) => {
    setSelectedCart(event.target.value);
  };

  const handleRedirect = () => {
    if (selectedCart) {
      navigate(`/cart/${selectedCart}`);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Select a Cart</h1>
      <div className="flex justify-center">
        <select
          value={selectedCart}
          onChange={handleCartSelection}
          className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a cart</option>
          <option value="cart1">Cart 1</option>
          <option value="cart2">Cart 2</option>
          {/* Add more options for additional carts */}
        </select>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
          onClick={handleRedirect}
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default SelectCart;
