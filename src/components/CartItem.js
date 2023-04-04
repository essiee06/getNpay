import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import {
  decrementQuantity,
  deleteItem,
  increamentQuantity,
  resetCart,
} from "../redux/getNpaySlice";

const CartItem = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.getNpay.productData);
  return (
    <div className=" pr-10">
      <div className="w-full">
        {" "}
        <h2 className="font-titleFont text-2xl">shopping cart</h2>
      </div>
      <div>
        {productData.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between gap-6 mt-6"
          >
            <div className="flex items-center gap-2">
              <MdOutlineClose
                onClick={() => dispatch(deleteItem(item._id))}
                className="text-xl text-gray-600 hover:text-red-600 cursor-pointer duration-300"
              />
              <img
                className="w-32 h-32 object-cover flex"
                src={item.image}
                alt="productImg"
              />
            </div>
            <h2 className="w-52">{item.title}</h2>
            <p className="w-10">${item.price}</p>
            <div className="w-52 flex items-center justify-between text-gray-500 gap-4 border p-3">
              {/* <p className="text-sm">Quantity</p> */}
              <div className="flex items-center gap-4 text-sm font-semibold">
                <span
                  onClick={() =>
                    dispatch(
                      decrementQuantity({
                        _id: item._id,
                        title: item.title,
                        image: item.image,
                        price: item.price,
                        quantity: 1,
                        description: item.description,
                      })
                    )
                  }
                  className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                >
                  -
                </span>
                {item.quantity}
                <span
                  onClick={() =>
                    dispatch(
                      increamentQuantity({
                        _id: item._id,
                        title: item.title,
                        image: item.image,
                        price: item.price,
                        quantity: 1,
                        description: item.description,
                      })
                    )
                  }
                  className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                >
                  +
                </span>
              </div>
            </div>
            <p className="w-14">${item.quantity * item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItem;
