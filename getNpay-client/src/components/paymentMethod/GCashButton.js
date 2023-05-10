import React, { useState } from "react";

function GCashButton() {
  const [error, setError] = useState(null);

  const handleClick = () => {
    if (/Mobi/.test(navigator.userAgent)) {
      // User is on a mobile device
      const deepLinkURL =
        "gcash://send-money?amount=100&recipient=09618156904 "; // Replace with the actual deep link URL for Gcash
      const isGcashInstalled = isAppInstalled("gcash"); // Check if Gcash is installed
      if (isGcashInstalled) {
        window.location.href = deepLinkURL;
      } else {
        setError("Please install the Gcash app to use this feature.");
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    } else {
      // User is not on a mobile device
      window.open("https://www.gcash.com/", "_blank"); // Open the Gcash website in a new tab
    }
  };

  // Function to check if an app is installed on the device
  const isAppInstalled = (scheme) => {
    const appUrl = `${scheme}://`;
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        resolve(false);
      }, 1000);
      const iframe = document.createElement("iframe");
      iframe.setAttribute("src", appUrl);
      iframe.setAttribute("style", "display:none;");
      document.body.appendChild(iframe);
      iframe.onload = () => {
        clearTimeout(timer);
        resolve(true);
      };
    });
  };

  return (
    <>
      <button onClick={handleClick}>Pay with GCash</button>
      {error && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            padding: 10,
            backgroundColor: "red",
            color: "white",
          }}
        >
          {error}
        </div>
      )}
    </>
  );
}

export default GCashButton;
