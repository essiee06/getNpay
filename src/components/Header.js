import React from "react";
import { cartImg, logo3, profile } from "../assets/index";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const productData = useSelector((state) => state.getNpay.productData);

  return (
    <div className="w-full h-20 bg-[#7aa5f9] border-b-[1px]  sticky top-0 z-50">
      <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between">
        <NavLink to="/">
          <img className="w-40 py-5" src={logo3} alt="Logo" />
        </NavLink>

        <div className="flex items-center gap-8">
          <NavLink to="/cart" className="relative">
            <img className="w-10" src={cartImg} alt="cart" />
            <span className="absolute w-10 top-3 left-0 text-sm flex items-center justify-center font-titleFont text-white">
              {productData.length}
            </span>
          </NavLink>
          <NavLink to="/login">
            <img className="w-10 rounded-full" src={profile} alt="userLogo" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
