import React from "react";
import { logoDark } from "../assets/index";

const Splash = () => {
  return (
    <div className="flex bg-background items-center justify-center h-screen bg-blue-500">
      <img
        className="w-400 h-150 bg-center bg-no-repeat bg-cover absolute top-1/8 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        src={logoDark}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-4">
        <div className="w-12 h-12 border-t-4 border-light border-solid  border-blue-500 rounded-full animate-spin"></div>
        <div className="w-12 h-12 border-t-4 border-light border-solid  border-blue-500 rounded-full animate-spin"></div>
        <div className="w-12 h-12 border-t-4 border-light border-solid  border-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Splash;
