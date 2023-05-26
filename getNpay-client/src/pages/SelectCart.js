import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QRCodeScanner from "../components/QRCodeScanner";

const SelectCart = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="px-8 pt-10 pb-10 align-middle text-xl text-white text-center">
        Please scan the QR Code to continue shopping!
      </div>
      <div className="bg-black px-2">
        <QRCodeScanner />
      </div>
    </div>
  );
};

export default SelectCart;
