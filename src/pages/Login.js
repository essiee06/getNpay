import React from "react";
import { googleLogo, logo2 } from "../assets/index";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/getNpaySlice";
import { NavLink, useNavigate } from "react-router-dom";
import { logoLight } from "../assets/index";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          addUser({
            _id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // // The signed-in user info.
        // const user = result.user;
        // // IdP data available using getAdditionalUserInfo(result)
        // // ...
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        // // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // // ...
        console.Log(error);
      });
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("Log Out Successfully!");
        dispatch(removeUser());
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })

      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="bg-background bg-no-repeat bg-cover bg-center">
      <div class="flex items-center min-h-screen p-4 lg:justify-center">
        <div class="flex flex-col overflow-hidden bg-white bg-opacity-25 rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
          <div class="p-4 py-6 text-white bg-blue-500 bg-opacity-25 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
            <div class="my-3 text-4xl font-bold tracking-wider text-center">
              <img src={logoLight} />
            </div>

            <p class="flex flex-col items-center justify-center mt-10 text-center">
              <span>Don't have an account?</span>
              <a href="/signup" class="underline">
                Create an account here
              </a>
            </p>
            {/* <p class="mt-6 text-sm text-center text-gray-300">
              Read our{" "}
              <a href="#" class="underline">
                terms
              </a>{" "}
              and{" "}
              <a href="#" class="underline">
                conditions
              </a>
            </p> */}
          </div>
          <div class="p-5 bg-white md:flex-1">
            <h3 class="my-4 text-2xl font-semibold justify-center flex text-blue-600">
              Account Login
            </h3>
            <form action="#" class="flex flex-col space-y-5">
              <div class="flex flex-col space-y-1">
                <label for="email" class="text-sm font-semibold text-gray-500">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  autofocus
                  class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div class="flex flex-col space-y-1">
                <div class="flex items-center justify-between">
                  <label
                    for="password"
                    class="text-sm font-semibold text-gray-500"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    class="text-sm text-blue-600 hover:underline focus:text-blue-800"
                  >
                    Forgot Password?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  class="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                />
                <label
                  for="remember"
                  class="text-sm font-semibold text-gray-500"
                >
                  Remember me
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  class="w-full px-4 py-2 text-lg  text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  Log in
                </button>
              </div>
              <div class="flex flex-col space-y-5">
                <span class="flex items-center justify-center space-x-2">
                  <span class="h-px bg-gray-400 w-14"></span>
                  <span class="font-normal text-gray-500">or login with</span>
                  <span class="h-px bg-gray-400 w-14"></span>
                </span>
                <div class="flex flex-col space-y-4">
                  <div
                    onClick={handleGoogleLogin}
                    class="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-blue-600 focus:outline-none"
                  >
                    <span>
                      <img className="w-6" src={googleLogo} alt="googleLogo" />
                    </span>
                    <span class="text-sm font-medium text-gray-800 group-hover:text-white">
                      Google
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
