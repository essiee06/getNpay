import React, { useState, useEffect, useRef, useContext } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { QRCodeContext } from "../components/context/QRCodeContext";
import { useNavigate } from "react-router-dom";

// Import your SVG icon here, replace `CameraIcon` with your actual import
import { MdCameraswitch } from "react-icons/md";

const QRCodeScanner = () => {
  const { qrResult, setQrResult } = useContext(QRCodeContext);
  const [facingMode, setFacingMode] = useState("environment");
  const scannerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (scannerRef.current) {
      const html5QrCode = new Html5Qrcode(scannerRef.current.id);

      html5QrCode
        .start(
          { facingMode },
          {
            fps: 10, // Optional, frames per second
            qrbox: { width: 250, height: 250 }, // Optional, if you want a bounded box UI
          },
          (decodedText, decodedResult) => {
            setQrResult(decodedText);
            navigate("/cart");
          },
          (errorMessage) => {
            // handle errors
          }
        )
        .catch((err) => {
          console.error(err);
        });

      return () => {
        html5QrCode.stop();
      };
    }
  }, [facingMode, setQrResult, navigate]);

  const toggleFacingMode = () => {
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
    console.log(facingMode);
  };

  return (
    <>
      <QRCodeContext.Provider value={qrResult}>
        <div className="my-2 pt-2 ">
          <button
            className="flex items-end justify-end  p-4 rounded-lg text-white focus:outline-none"
            onClick={toggleFacingMode}
          >
            <MdCameraswitch className="w-8 h-8" />
          </button>
          <div
            id="reader"
            ref={scannerRef}
            className="mx-auto max-w-screen-xl h-auto max-w-full"
          >
            {/* Camera feed will be placed here by html5-qrcode */}
          </div>
        </div>

        <p className="text-center">{qrResult}</p>
      </QRCodeContext.Provider>
    </>
  );
};

export default QRCodeScanner;
