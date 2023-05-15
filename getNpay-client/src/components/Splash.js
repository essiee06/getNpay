import React from "react";
import { logoLight } from "../assets/index";

const Splash = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-blue-400">
      <img className="w-40 h-40" src={logoLight} />
      <h1 className="text-2xl font-extrabold py-8 text-white ">
        L O A D I N G . . .
      </h1>
    </div>
  );
};

export default Splash;
