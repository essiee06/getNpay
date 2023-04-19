import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDeleteForever } from "react-icons/md";
import {
  decrementQuantity,
  deleteItem,
  increamentQuantity,
} from "../redux/getNpaySlice";

const CartItem = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.getNpay.productData);
  return (
    <div>
      <div className="w-full">
        <h2 className="font-titleFont text-2xl">shopping cart</h2>
      </div>
      <div>
        <div class="flex border items-center justify-between gap-6 mt-6">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Image</span>
                </th>
                <th scope="col" class="px-6 py-3">
                  Product
                </th>
                <th scope="col" class="px-6 py-3">
                  Qty
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                {/* <th scope="col" class="px-6 py-3">
                  Action
                </th> */}
              </tr>
            </thead>
            <tbody>
              {productData.map((item) => (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td class="w-32 p-4">
                    <img src={item.image} alt="Apple Watch" />
                  </td>
                  <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center space-x-3">
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
                        // class="sr-only"
                      >
                        <svg
                          class="w-4 h-4"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </span>

                      <div> {item.quantity}</div>

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
                        // class="sr-only"
                      >
                        <svg
                          class="w-4 h-4"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </span>

                      {/* </button> */}
                    </div>
                  </td>
                  <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    ₱{item.quantity * item.price}
                  </td>
                  {/* <td class="px-6 py-4">
                    <p
                      onClick={() => dispatch(deleteItem(item._id))}
                      class="font-medium text-red-600 dark:text-red-500 hover:to-blue-400"
                    >
                      Remove
                    </p>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
