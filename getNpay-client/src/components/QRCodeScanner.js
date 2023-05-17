import React, { useState, useEffect, useRef, useContext } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { QRCodeContext } from "../components/context/QRCodeContext";
import { useNavigate } from "react-router-dom";

const QRCodeScanner = () => {
  const [qrResult, setQrResult] = useState("");
  const [facingMode, setFacingMode] = useState("environment");
  const scannerRef = useRef(null);
  // const { setQrResult } = useContext(QRCodeContext);
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

  return (
    <>
      <QRCodeContext.Provider value={qrResult}>
        <div className="my-2">
          <label htmlFor="camera" className="sr-only">
            Select a Camera View:
          </label>
          <select
            value={facingMode}
            onChange={(e) => setFacingMode(e.target.value)}
            id="camera"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {" "}
            <option defaultValue>Select a Camera View</option>
            <option value="environment">Rear</option>
            <option value="user">Front</option>
          </select>
        </div>
        <div
          id="reader"
          ref={scannerRef}
          className="mx-auto max-w-screen-xl h-auto max-w-full"
        >
          {/* Camera feed will be placed here by html5-qrcode */}
        </div>
        <p className="text-center">{qrResult}</p>
      </QRCodeContext.Provider>
    </>
  );
};

export default QRCodeScanner;
