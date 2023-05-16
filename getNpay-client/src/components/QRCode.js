import React, { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRCode = () => {
  const [device, setDevice] = useState("");
  const [result, setResult] = useState("");
  const scannerRef = useRef(null);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      (message) => {
        // do something when code is read
        setResult(message);
      },
      (errorMessage) => {
        // parse error
      }
    );

    return () => {
      html5QrCode.stop();
    };
  }, [device]);

  const toggleCamera = () => {
    setDevice(device === "user" ? "environment" : "user");
  };

  return (
    <>
      <div
        id="reader"
        ref={scannerRef}
        className="w-full h-full md:w-64 md:h-64 border-2 border-gray-300 mb-16 md:mb-4"
      >
        {/* Camera feed will be placed here by html5-qrcode */}
      </div>
      <p className="mb-4 text-center">{result}</p>
      <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-4">
        <button
          onClick={toggleCamera}
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Switch Camera
        </button>
      </div>
    </>
  );
};

export default QRCode;
