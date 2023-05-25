import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <img src="https://cdn.discordapp.com/attachments/1062786313738260660/1110909258305904670/infographic_verticalhd.png" />
      <Link to="/login">
        <button
          type="button"
          className="fixed bottom-0 right-0 m-4 text-white bg-[#d9dfff]/70 hover:bg-blue-800 focus:ring-4
        py-5 focus:outline-none focus:ring-blue-300 font-medium text-md px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login here to continue shopping .
          <svg
            aria-hidden="true"
            className="w-5 h-5 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </Link>
    </div>
  );
};

export default Home;
