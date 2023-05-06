import React, { useState, useEffect } from "react";
import { auth } from "../firebase.config";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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


  let navigate = useNavigate();

  auth.onAuthStateChanged((user) => {
    if (!auth.currentUser) {
      navigate("/");
    } else {
      // setPayNow(true);
    }
  });

  // const [payNow, setPayNow] = useState(false);
  
  return (
    <div>
      <Header />
      <div className="max-w-screen-xl mx-auto">
        <CartItem />
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
