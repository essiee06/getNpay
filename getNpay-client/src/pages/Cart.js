import React, { useState, useEffect, useContext } from "react";
import { auth } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "react-toastify/dist/ReactToastify.css";
import { ref, onValue, off, remove, update, get, set } from "firebase/database";
import { db, rtdb } from "../firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { QRCodeContext } from "../components/context/QRCodeContext";
import { ImgNotAvail } from "../assets";
import Checkout from "../components/paymentMethod/Checkout";

const Cart = () => {
  let navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalAmt, setTotalAmt] = useState(0);
  const { qrResult, setQrResult } = useContext(QRCodeContext);

  const fetchProductsByRfid = async (rfidList) => {
    const productsRef = collection(db, "Products");
    const productsWithRfid = [];

    try {
      const querySnapshot = await getDocs(productsRef);
      querySnapshot.forEach((doc) => {
        const product = { ...doc.data(), id: doc.id };

        for (const rfid of rfidList) {
          if (product.RFID) {
            // Find the RFID item that matches the rfid and is not paid
            const matchingRfidItem = product.RFID.find(
              (item) => item.EPC === rfid && !item.isPaid
            );
            if (matchingRfidItem) {
              productsWithRfid.push({
                ...product,
                id: product.id + "-" + rfid,
                quantity: 1,
                RFID: [rfid],
              });
            }
          }
        }
      });
    } catch (error) {
      console.error("Error fetching products by RFID:", error);
    }

    // Sort the array alphabetically by product name
    const sortedProducts = productsWithRfid.sort((a, b) =>
      a.productName.localeCompare(b.productName)
    );
    console.log("Fetched products:", JSON.stringify(sortedProducts, null, 2));

    setProducts(sortedProducts);
  };

  useEffect(() => {
    let localQrResult = localStorage.getItem("qrResult");
    if (localQrResult) {
      setQrResult(localQrResult);
    }

    const rfidRef = ref(rtdb, `UsersData/cLmwoz9mYfeVQv9u2qdlskMplRy1/data_uploads/rfidtag_id`);
    const handleNewRfid = (snapshot) => {
      const data = snapshot.val();

      if (data === null) {
        console.log("No RFID tags found");
        setProducts([]);
      } else {
        const rfidList = Object.values(data); //epc array from realtime database
        console.log(rfidList);
        fetchProductsByRfid(rfidList);
      }
    };

    onValue(rfidRef, handleNewRfid);
    console.log("this is the cart ID: ", qrResult);

    return () => {
      off(rfidRef);
    };
  }, [qrResult]);

  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.RFID.length;
      return price;
    });
    setTotalAmt(price.toFixed(2));
  }, [products]);

  const ProceedPayment = (totalAmt, products) => {
    localStorage.setItem("totalPayment", JSON.stringify(totalAmt));
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("checkoutID", JSON.stringify(`${Date.now()}-Guide`));
    // navigate("/checkout");
  };
 
  const decreaseQuantity = async (productId) => {
    // Split the productId to get the original id and the RFID tag
    const [, rfid] = productId.split("-");

    // Remove the product from the cart
    setProducts(products.filter((product) => product.id !== productId));

    // Get the current list of RFID tags from the Realtime Database
    const rfidRef = ref(rtdb, `UsersData/${qrResult}/data_uploads/rfidtag_id`);
    const snapshot = await get(rfidRef);
    if (snapshot.exists()) {
      let rfidList = snapshot.val();

      // Log the current list of RFID tags and the tag to be removed
      console.log("Current RFID tags:", rfidList);
      console.log("RFID tag to be removed:", rfid);

      // Remove the RFID tag from the list
      rfidList = rfidList.filter((item) => item !== rfid);

      // Log the updated list of RFID tags
      console.log("Updated RFID tags:", rfidList);

      // Convert the list to an object
      const rfidObject = {};
      for (let i = 0; i < rfidList.length; i++) {
        rfidObject[i] = rfidList[i];
      }

      // Log the RFID object to be updated in the database
      console.log("RFID object for database:", rfidObject);

      // Update the list of RFID tags in the Realtime Database
      set(rfidRef, rfidObject)
        .then(() => {
          console.log("RFID tag removed successfully");
        })
        .catch((error) => {
          console.error("Error removing RFID tag:", error);
        });
    } else {
      console.log("No RFID tags found");
    }
  };

  return (
    <div>
      <Header products={products} />
      <div  className="flex flex-col justify-center py-14 items-center ">
      
          <div className="w-full">
          </div>
    
            <div className="flex border items-center justify-between mt-6 ">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products && products.length > 0 ? (
                    products.map((item) => (
                      <tr
                        key={item.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="w-32 p-4">
                          <img src={item.imageProduct} alt={item.productName} />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item.productName}
                        </td>
                        <td className="px-6 py-4 text-black">
                          {/* Quantity controls */}
                          <div className="flex items-center space-x-3">
                            {/* Quantity display */}
                            <span>{item.quantity}</span>
                            {/* Decrease quantity button */}
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              className="bg-red-500 text-white px-3 rounded"
                            >
                              -
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          ₱{item.price}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          ₱
                          {parseFloat(item.price * item.RFID.length).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center">
                        Cart is empty
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className=" py-6 px-4">
            <div className=" border-b-[1px] border-b-gray-400 pb-6"></div>
            <p className="font-titleFont font-semibold flex justify-between mt-6">
              Total <span className="text-md font-bold">₱{totalAmt}</span>
            </p>
            {/* <button
              type="button"
              onClick={() => {
                ProceedPayment(totalAmt, products);
              }}
              className="text-base bg-blue-400 text-white w-full py-3 mt-6 hover:bg-blue-800 duration-300"
            >
              Proceed to checkout
            </button> */}
            <button
              type="button"
              onClick={() => {
                ProceedPayment(totalAmt, products);
              }}
              data-modal-target="checkout"
              data-modal-toggle="checkout"
              className="text-base bg-blue-400 text-white w-full py-3 mt-6 hover:bg-blue-800 duration-300"
            >
              Proceed to Checkout{" "}
            </button>
            {/* <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <p
                type="button"
                data-modal-target="checkout"
                data-modal-show="checkout"
                className="text-base bg-blue-400 text-white w-full py-3 mt-6 hover:bg-blue-800 duration-300"
              >
                Proceed to Checkout
              </p>
            </div> */}
            <Checkout totalAmt={totalAmt} products={products} />
          </div>
        </div>
  );
};

export default Cart;
