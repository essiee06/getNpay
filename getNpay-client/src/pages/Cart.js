import React, { useState, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import { auth, db, rtdb } from "../firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
// import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutForm from "../components/CheckoutForm";

const Cart = () => {
  // const [email, setEmail] = useState("");

  // auth.onAuthStateChanged((user) => {
  //   var userUid = auth.currentUser.uid;
  //   var docRef = doc(db, "users", userUid);
  //   if (user) {
  //     getDoc(docRef)
  //       .then((doc) => {
  //         if (doc.exists) {
  //           //WELCOME USER
  //           setEmail(doc.data().email);
  //           // setProfPic(doc.data().image);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("Error getting document:", error);
  //       });
  //   }
  // });
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

  //ends here

  let navigate = useNavigate();

  auth.onAuthStateChanged((user) => {
    if (!auth.currentUser) {
      navigate("/");
    } else {
      // setPayNow(true);
    }
  });

  // const [payNow, setPayNow] = useState(false);
  const [totalAmt, setTotalAmt] = useState("");

  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price.toFixed(2));
  }, [products]);

  return (
    <div>
      <Header />
      <div className="max-w-screen-xl mx-auto">
        <CartItem products={products} />
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
            data-modal-target="proceed-to-checkout"
            data-modal-toggle="proceed-to-checkout"
            class="text-base bg-blue-400 text-white w-full py-3 mt-6 hover:bg-blue-800 duration-300"
          >
            Proceed to checkout
          </button>
          <CheckoutForm />
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
  );
};

export default Cart;
