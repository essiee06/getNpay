import React, { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRCodeScanner = () => {
  const [result, setResult] = useState("");
  const [facingMode, setFacingMode] = useState("environment");
  const scannerRef = useRef(null);

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
            setResult(decodedText);
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
  }, [facingMode]);

  return (
    <>
      <div>
        <label>Select Camera:</label>
        <select
          value={facingMode}
          onChange={(e) => setFacingMode(e.target.value)}
        >
          <option value="environment">Rear</option>
          <option value="user">Front</option>
        </select>
      </div>
      <div
        id="reader"
        ref={scannerRef}
        className="w-full h-full md:w-64 md:h-64 border-2 border-gray-300 mb-16 md:mb-4"
      >
        {/* Camera feed will be placed here by html5-qrcode */}
      </div>
      <p className="mb-4 text-center">{result}</p>
    </>
  );
};

export default QRCodeScanner;
