import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase.config";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";

const Forgotpass = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link has been sent to your email.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="bg-background bg-no-repeat bg-cover bg-center">
      <div className="flex items-center justify-center px-6 py-8  min-h-screen">
        <div className="w-full p-6 bg-blue-600 bg-opacity-20 rounded-lg shadow dark:border items-center justify-center">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form
            onSubmit={handleSubmit}
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            action="#"
          >
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Submit
            </button>
          </form>
          {message && (
            <div className="mt-4 text-center text-black-500">{message}</div>
          )}
          <Link to="/login"><button className="mt-8 flex justify-center items-center bg-blue-400/75 p-2 rounded text-sm">        
          <MdArrowBack /> <span className="ml-2">go back to login</span>
         </button></Link>
        </div>
      </div>
    </div>
  );
};

export default Forgotpass;
