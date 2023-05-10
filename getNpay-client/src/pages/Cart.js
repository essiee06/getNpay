import React, { useState, useEffect } from "react";
import { auth } from "../firebase.config";
// import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, onValue, off } from "firebase/database";
import { db, rtdb } from "../firebase.config";
import { collection, getDocs } from "firebase/firestore";
// import CheckoutForm from "../components/CheckoutForm";
// import Splash from "../components/Splash";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  auth.onAuthStateChanged((user) => {
    if (!auth.currentUser) {
      navigate("/");
    }
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  let navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [totalAmt, setTotalAmt] = useState(0);

  const fetchProductsByRfid = async (rfidList) => {
    const productsRef = collection(db, "Products");
    const productsWithRfid = {};

    try {
      const querySnapshot = await getDocs(productsRef);
      querySnapshot.forEach((doc) => {
        const product = { ...doc.data(), id: doc.id };
        let productRfidCount = 0;

        for (const rfid of rfidList) {
          if (
            product.RFID &&
            product.RFID.find((item) => item.RFIDtag === rfid)
          ) {
            productRfidCount += 1;
          }
        }

        if (productRfidCount > 0) {
          productsWithRfid[product.id] = {
            ...product,
            quantity: productRfidCount,
            RFID: rfidList.filter((rfid) =>
              product.RFID.find((item) => item.RFIDtag === rfid)
            ),
          };
        }
      });
    } catch (error) {
      console.error("Error fetching products by RFID:", error);
    }

    // Convert the object to an array and sort it alphabetically by product name
    const groupedProducts = Object.values(productsWithRfid).sort((a, b) =>
      a.productName.localeCompare(b.productName)
    );
    console.log("Fetched products:", JSON.stringify(groupedProducts, null, 2));

    setProducts(groupedProducts);
  };

  useEffect(() => {
    const rfidRef = ref(
      rtdb,
      "UsersData/cLmwoz9mYfeVQv9u2qdlskMplRy1/data_uploads/rfidtag_id"
    );
    const handleNewRfid = (snapshot) => {
      const data = snapshot.val();

      if (data === null) {
        console.log("No RFID tags found");
        setProducts([]);
      } else {
        const rfidList = Object.values(data);
        console.log(rfidList);
        fetchProductsByRfid(rfidList);
      }
    };

    onValue(rfidRef, handleNewRfid);

    return () => {
      off(rfidRef);
    };
  }, []);

  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.RFID.length;
      return price;
    });
    setTotalAmt(price.toFixed(2));
  }, [products, totalAmt]);

  const ProceedPayment = (totalAmt, products) => {
    localStorage.setItem("totalPayment", JSON.stringify(totalAmt));
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("checkoutID", JSON.stringify(`${Date.now()}-Guide`));
    navigate("/checkout");
  };

  return (
    <div>
      <div>
        <Header products={products} />
        <div className="max-w-screen-xl mx-auto">
          <div className="py-10">
            <div className="w-full">
              <h2 className="font-titleFont text-2xl">shopping cart</h2>
            </div>
            <div>
              <div className="flex border items-center justify-between gap-6 mt-6 px-4">
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
                            <img
                              src={item.imageProduct}
                              alt={item.productName}
                            />
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {item.productName}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <span>{item.quantity}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            ₱{item.price}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            ₱ {item.price * item.RFID.length}
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

            <div className="bg-[#fafafa] py-6 px-4">
              <div className=" flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
                <h2 className="text-2xl font-medium "> </h2>
                <p className="flex items-center gap-4 text-base">
                  Subtotal
                  <span className="font-titleFont font-bold text-sm">
                    ₱{totalAmt}
                  </span>
                </p>
              </div>
              <p className="font-titleFont font-semibold flex justify-between mt-6">
                Total <span className="text-md font-bold">₱{totalAmt}</span>
              </p>
              <button
                type="button"
                onClick={() => {
                  ProceedPayment(totalAmt, products);
                }}
                // onClick={handleCheckout}
                // data-modal-target="proceed-to-checkout"
                // data-modal-toggle="proceed-to-checkout"
                className="text-base bg-blue-400 text-white w-full py-3 mt-6 hover:bg-blue-800 duration-300"
              >
                Proceed to checkout
              </button>
              {/* <CheckoutForm /> */}
            </div>
          </div>
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
    </div>
  );
};

export default Cart;
