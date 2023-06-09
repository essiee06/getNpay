import React, { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

const GCash = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [totalAmt, setTotalAmt] = useState(0);
  const [checkoutID, setCheckoutID] = useState("");
  const [products, setProducts] = useState([]);

  const [payProcess, setPayProcess] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const publicKey = "pk_test_XWgQRf7AGZuvdV4d8rveic12";

  // Getting the Checkout Information
  useEffect(() => {
    const totalJSON = localStorage.getItem("totalPayment");
    const totalNumber = !!totalJSON ? JSON.parse(totalJSON) : 0;
    setTotalAmt(totalNumber);

    const productsJSON = localStorage.getItem("products");
    const productsArray = !!totalJSON ? JSON.parse(productsJSON) : [];
    setProducts(productsArray);

    const checkoutIDJSON = localStorage.getItem("checkoutID");
    const checkoutIDString = !!checkoutIDJSON ? JSON.parse(checkoutIDJSON) : "";
    setCheckoutID(checkoutIDString);
  }, []);

  const updateAllProducts = async () => {
    try {
      const productsRef = collection(db, "Products");
      const snapshot = await getDocs(productsRef);

      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      snapshot.forEach((docSnapshot) => {
        const product = docSnapshot.data();
        const updatedRFIDs = product.RFID.map((item) => ({
          ...item,
          isPaid: true,
        }));

        const productRef = doc(db, "Products", docSnapshot.id);

        updateDoc(productRef, {
          RFID: updatedRFIDs,
        })
          .then(() => {
            console.log("Update complete.");
          })
          .catch((err) => {
            console.error("Error updating document: ", err);
          });
      });
    } catch (err) {
      console.error("Error getting documents", err);
    }
  };
  // Function to Create A Source
  const createSource = async () => {
    setPaymentStatus("Creating Source");
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${publicKey}:`)}`,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            amount: totalAmt * 100,
            // Pass the Firestore document ID here
            metadata: {
              document_id: checkoutID,
            },
            redirect: {
              success: `${window.location.protocol}//${
                window.location.hostname
              }${
                window.location.port ? ":" + window.location.port : ""
              }/success?products=${encodeURIComponent(
                JSON.stringify(products)
              )}&totalAmt=${totalAmt}`,
              failed: `${window.location.protocol}//${
                window.location.hostname
              }${
                window.location.port ? ":" + window.location.port : ""
              }/payment`,
            },
            billing: { name: `${name}`, phone: `${phone}`, email: `${email}` },
            type: "gcash",
            currency: "PHP",
          },
        },
      }),
    };
    return fetch("https://api.paymongo.com/v1/sources", options)
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((err) => console.error(err));
  };

  // Function to Listen to the Source in the Front End
  const listenToPayment = async (sourceId) => {
    let i = 5;
    for (let i = 5; i > 0; i--) {
      setPaymentStatus(`Listening to Payment in ${i}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (i == 1) {
        const sourceData = await fetch(
          "https://api.paymongo.com/v1/sources/" + sourceId,
          {
            headers: {
              Authorization: `Basic ${btoa(publicKey + ":")}`,
            },
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            console.log(response.data);
            return response.data;
          });
        if (sourceData.attributes.status === "failed") {
          setPaymentStatus("Payment Failed");
        } else if (sourceData.attributes.status === "paid") {
          setPaymentStatus("Payment Success");
          toast.success("Payment Successful");
          await updateAllProducts();
        } else {
          i = 5;
          setPayProcess(sourceData.attributes.status);
        }
      }
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const source = await createSource();

    await updateAllProducts();

    if (source.errors) {
      console.error("API Error:", source.errors);
      setPaymentStatus("The value for amount cannot be less than 100.00.");
      return;
    }

    window.open(source.data.attributes.redirect.checkout_url, "_blank");
    listenToPayment(source.data.id);
  };
  return (
    <section>
      <div>
        <div className="px-10">
          <form className="flex flex-col space-y-5" onSubmit={onSubmit}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Billing Information
            </h5>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div className="flex flex-col space-y-1">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="customer-name"
                >
                  Customer Name:
                </label>
                <input
                  id="customer-name"
                  placeholder="Juan Dela Cruz"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="phone"
                >
                  Phone Number:
                </label>
                <input
                  id="phone"
                  placeholder="09xxxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="user@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Pay
            </button>{" "}
            <p>{paymentStatus}</p>
            <p>{payProcess}</p>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </section>
  );
};

export default GCash;
