import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-blue-400">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-white px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button className="mt-5">
        <p className="relative inline-block text-sm font-medium text-white group active:text-gray-200 focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-white group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3 bg-blue-400 border border-current">
            <Link to="/cart">go to cart</Link>
          </span>
        </p>
      </button>
    </div>
  );
};

export default ErrorPage;
