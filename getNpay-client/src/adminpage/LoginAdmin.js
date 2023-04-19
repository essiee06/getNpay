import React from "react";
import {
  GoogleAuthProvider,
  getAuth,
  //   signInWithPopup,
  //   signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
// import { addUser, removeUser } from "../redux/getNpaySlice";
import { useNavigate } from "react-router-dom";
import { logoLight } from "../assets/index";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const auth = getAuth();
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Do something with currentUser if needed
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        navigate("/cart");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  //   const handleGoogleLogin = () => {
  //     signInWithPopup(auth, provider)
  //       .then((result) => {
  //         const user = result.user;
  //         dispatch(
  //           addUser({
  //             _id: user.uid,
  //             name: user.displayName,
  //             email: user.email,
  //             image: user.photoURL,
  //           })
  //         );
  //         // This gives you a Google Access Token. You can use it to access the Google API.
  //         // const credential = GoogleAuthProvider.credentialFromResult(result);
  //         // const token = credential.accessToken;
  //         // // The signed-in user info.
  //         // const user = result.user;
  //         // // IdP data available using getAdditionalUserInfo(result)
  //         // // ...
  //         setTimeout(() => {
  //           navigate("/cart");
  //         }, 1500);
  //       })
  //       .catch((error) => {
  //         // // Handle Errors here.
  //         // const errorCode = error.code;
  //         // const errorMessage = error.message;
  //         // // The email of the user's account used.
  //         // const email = error.customData.email;
  //         // // The AuthCredential type that was used.
  //         // const credential = GoogleAuthProvider.credentialFromError(error);
  //         // // ...
  //         console.Log(error);
  //       });
  //   };

  //   const handleSignOut = () => {
  //     signOut(auth)
  //       .then(() => {
  //         // Sign-out successful.
  //         toast.success("Log Out Successfully!");
  //         dispatch(removeUser());
  //         setTimeout(() => {
  //           navigate("/login");
  //         }, 1500);
  //       })

  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  return (
    <div className="bg-background bg-no-repeat bg-cover bg-center">
      <div className="flex items-center min-h-screen p-4 lg:justify-center">
        <div className="flex flex-col overflow-hidden bg-white bg-opacity-25 rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
          <div className="p-4 py-6 text-white bg-blue-500 bg-opacity-25 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
            <div className="my-3 text-4xl font-bold tracking-wider text-center">
              <img src={logoLight} />
            </div>
          </div>
          <div className="p-5 bg-white md:flex-1">
            <h3 className="my-4 text-2xl font-semibold justify-center flex text-blue-600">
              Admin Login{" "}
            </h3>
            <form action="#" className="flex flex-col space-y-5">
              <div className="flex flex-col space-y-1">
                <label
                  for="email"
                  className="text-sm font-semibold text-gray-500"
                >
                  Email address
                </label>
                <input
                  value={loginEmail}
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                  }}
                  type="email"
                  id="email"
                  autofocus
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    for="password"
                    className="text-sm font-semibold text-gray-500"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:underline focus:text-blue-800"
                  >
                    Forgot Password?
                  </a>
                </div>
                <input
                  value={loginPassword}
                  onChange={(event) => {
                    setLoginPassword(event.target.value);
                  }}
                  type="password"
                  id="password"
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                />
                <label
                  for="remember"
                  className="text-sm font-semibold text-gray-500"
                >
                  Remember me
                </label>
              </div>
              <div>
                <button
                  onClick={handleLogin}
                  type="submit"
                  className="w-full px-4 py-2 text-lg  text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
