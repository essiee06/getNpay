import React from "react";
import { useParams } from "react-router-dom";

const SpecificCartPage = () => {
  const { cartId } = useParams();

  // Sample cart data based on the cartId
  const cartData = {
    cart1: {
      id: "cart1",
      name: "Cart 1",
      items: [
        { id: "item1", name: "Item 1" },
        { id: "item2", name: "Item 2" },
        { id: "item3", name: "Item 3" },
      ],
    },
    cart2: {
      id: "cart2",
      name: "Cart 2",
      items: [
        { id: "item4", name: "Item 4" },
        { id: "item5", name: "Item 5" },
      ],
    },
  };

  const cart = cartData[cartId];

  if (!cart) {
    return <div>Cart not found</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Cart {cart.name}</h1>
      <div>
        <h2 className="text-xl font-bold mb-2">Items:</h2>
        <ul>
          {cart.items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SpecificCartPage;
