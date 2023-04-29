import React, { useState, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import { auth, db, rtdb } from "../firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Header from "../components/Header";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  //fetching RFID data
  const [products, setProducts] = useState([]);

  const fetchProductsByRfid = async (rfidList) => {
    const productsRef = collection(db, "Products");
    const productsWithRfid = [];

    try {
      for (let rfid of rfidList) {
        console.log("Searching for product with RFID:", rfid);
        const q = query(productsRef, where("RFIDnum", "array-contains", rfid));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          console.log("Found product:", doc.data());
          const product = { ...doc.data(), id: doc.id };

          // Check if product's RFID tags are in the RFID list and if it has not already been added
          const hasAllRfidTags = product.RFIDnum.every((tag) =>
            rfidList.includes(tag)
          );
          const notAddedYet = !productsWithRfid.some(
            (existingProduct) => existingProduct.id === product.id
          );

          if (hasAllRfidTags && notAddedYet) {
            productsWithRfid.push(product);
          }
        });
      }
    } catch (error) {
      console.error("Error fetching products by RFID:", error);
    }

    // Sort products alphabetically by their product name
    productsWithRfid.sort((a, b) => a.productName.localeCompare(b.productName));
    console.log("Fetched products:", JSON.stringify(productsWithRfid, null, 2));

    setProducts(productsWithRfid);
  };

  // useEffect(() => {
  //   const rfidRef = ref(
  //     rtdb,
  //     "UsersData/cLmwoz9mYfeVQv9u2qdlskMplRy1/data_uploads/rfidtag_id"
  //   );
  //   const handleNewRfid = (snapshot) => {
  //     const data = snapshot.val();

  //     if (data === null) {
  //       console.log("No RFID tags found");
  //       setProducts([]);
  //     } else {
  //       const rfidList = Object.values(data);
  //       console.log(rfidList);
  //       fetchProductsByRfid(rfidList);
  //     }
  //   };

  //   onValue(rfidRef, handleNewRfid);

  //   return () => {
  //     off(rfidRef);
  //   };
  // }, []);

  //ends here
  const productData = useSelector((state) => state.getNpay.productData);
  const userInfo = useSelector((state) => state.getNpay.userInfo);
  const [payNow, setPayNow] = useState(false);
  const [totalAmt, setTotalAmt] = useState("");

  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price.toFixed(2));
  }, [products]);

  const handleCheckout = () => {
    if (userInfo) {
      setPayNow(true);
    } else {
      toast.error("Please sign in to Checkout");
    }
  };

  //STRIPE
  const payment = async (token) => {
    await axios.post("http://localhost:8000/pay", {
      amount: totalAmt * 100,
      token: token,
    });
  };
  return (
    <div>
      <Header products={products} />

      <div className="max-w-screen-xl mx-auto">
        <CartItem products={products} />
        <div className="bg-[#fafafa] py-6 px-4">
          <div className=" flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
            <h2 className="text-2xl font-medium "> cart totals</h2>
            <p className="flex items-center gap-4 text-base">
              Subtotal{" "}
              <span className="font-titleFont font-bold text-lg">
                ₱{totalAmt}
              </span>
            </p>
          </div>
          <p className="font-titleFont font-semibold flex justify-between mt-6">
            Total <span className="text-xl font-bold">₱{totalAmt}</span>
          </p>
          <p
            onChange={handleCheckout}
            type="button"
            className=" text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300"
          >
            proceed to checkout
          </p>
          {payNow && (
            <div className="w-full mt-6 flex items-center justify-center">
              <StripeCheckout
                stripeKey="pk_test_51MuEDZFWNvcSsDyX8BLoebDhjtd1Paz2uvoGGFfEaM0w17bY5DZ3ghAQ16tYJSdYcH60N23BFCXmkyr3jKCJymAH00XU1kSebi"
                name="Get N' Pay"
                amount={totalAmt * 100}
                label="Place Order"
                description={`Your Payment amount is $${totalAmt}`}
                token={payment}
                email={userInfo.email}
              />
            </div>
          )}

          {/* CHECKOUT MODAL */}
          <div></div>
        </div>
        <Link to="/">
          <button className="mt-8 ml-7 flex items-center gap-1 text-gray-400 hover:text-black duration-300 pb-8">
            <span>
              <HiOutlineArrowLeft />
            </span>
            go shopping
          </button>
        </Link>
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
  );
};

export default Cart;
