import React, { useState, useEffect, useCallback } from "react";
import {
  collection,
  where,
  query,
  getDocs,
  setDoc,
  getDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";
import { db, rtdb } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { ref as realtimeRef, onValue, off } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNewExistingProduct = () => {
  const [productName, setProductName] = useState("");
  const [realtimeRFID, setRealtimeRFID] = useState([]);
  const [firestoreRFID, setFirestoreRFID] = useState([]);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [productId, setProductId] = useState("");

  const [productIds, setProductIds] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProductRFID, setSelectedProductRFID] = useState([]);

  const handleProductNameChange = (e) => setProductName(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleSelectedProductIdChange = (e) => {
    setSelectedProductId(e.target.value);
    if (e.target.value) {
      setProductId(e.target.value);
      fetchProductDetails(e.target.value);
    }
  };

  //fetch the product details from firestore
  const fetchProductDetails = async (id) => {
    try {
      const productRef = doc(db, "Products", id);
      const productDoc = await getDoc(productRef);

      if (productDoc.exists()) {
        const data = productDoc.data();
        setProductName(data.productName);
        setPrice(data.price);
        setCategory(data.category);
        setSelectedProductRFID(data.RFID.map((RFIDObj) => RFIDObj.RFIDtag));
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error getting document:", error);
    }
  };

  useEffect(() => {
    const rfidRef = realtimeRef(
      rtdb,
      "UsersData/cLmwoz9mYfeVQv9u2qdlskMplRy1/data_uploads/rfidtag_id"
    ); // Replace with the actual path to your RFID tags in the realtime database

    const handleData = (snapshot) => {
      const fetchedData = snapshot.val();
      const fetchedRFIDTags = Object.values(fetchedData || {});
      setRealtimeRFID(fetchedRFIDTags);
    };

    onValue(rfidRef, handleData, (error) => {
      console.error("Error fetching RFID tags:", error);
      toast.error("Error fetching RFID tags:");
    });

    return () => {
      // Unsubscribe from the onValue listener when the component unmounts
      off(rfidRef);
    };
  }, []);

  //Fetch rfid tag from REALTIME DATABASE
  useEffect(() => {
    const rfidRef = realtimeRef(
      rtdb,
      "UsersData/cLmwoz9mYfeVQv9u2qdlskMplRy1/data_uploads/rfidtag_id"
    ); // Replace with the actual path to your RFID tags in the realtime database

    const handleData = (snapshot) => {
      const fetchedData = snapshot.val();
      const fetchedRFIDTags = Object.values(fetchedData || {});
      setRealtimeRFID(fetchedRFIDTags);
    };

    onValue(rfidRef, handleData, (error) => {
      console.error("Error fetching RFID tags:", error);
      toast.error("Error fetching RFID tags:");
    });

    return () => {
      // Unsubscribe from the onValue listener when the component unmounts
      off(rfidRef);
    };
  }, []);

  //fetch rfid tag from FIRESTORE
  useEffect(() => {
    const fetchFirestoreRFIDTags = async () => {
      const productsCol = collection(db, "Products");
      const productsSnapshot = await getDocs(productsCol);
      const allRFIDtags = [];

      productsSnapshot.forEach((doc) => {
        const productId = doc.id;
        const productData = doc.data();
        const RFIDArray = productData.RFID;

        RFIDArray.forEach((RFIDObj) => {
          const RFIDtag = RFIDObj.RFIDtag;
          allRFIDtags.push({ RFIDtag, productId });
        });
      });

      setFirestoreRFID(allRFIDtags);
    };

    fetchFirestoreRFIDTags();
  }, []);

  //Fetch product id from FIRESTORE
  useEffect(() => {
    const fetchProductIds = async () => {
      const productsCol = collection(db, "Products");
      const productsSnapshot = await getDocs(productsCol);
      const fetchedProductIds = [];

      productsSnapshot.forEach((doc) => {
        fetchedProductIds.push(doc.id);
      });

      setProductIds(fetchedProductIds);
    };

    fetchProductIds();
  }, []);

  const navigate = useNavigate("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productsRef = collection(db, "Products");
      let existingRFID = false;

      for (const RFIDtag of firestoreRFID) {
        const querySnapshot = await getDocs(
          query(
            productsRef,
            where("RFID", "array-contains", { RFIDtag, isPaid: false })
          )
        );

        if (!querySnapshot.empty) {
          existingRFID = true;
          break;
        }
      }

      if (existingRFID) {
        // Display an error if an RFID tag already exists
        toast.error("RFID Tag ID already exists.");
        return;
      }

      // Map the RFID array to an array of objects with RFIDtag and isPaid properties
      const RFIDWithIsPaid = firestoreRFID.map((RFIDtag) => ({
        RFIDtag,
        isPaid: false,
      }));

      const productRef = doc(db, "Products", productId);
      await setDoc(productRef, {
        productName: productName,
        RFID: RFIDWithIsPaid, // Use the modified RFID array
        price: price,
        category: category,
      });

      setProductName("");
      //setRFIDnum([]);
      setPrice("");
      setCategory("");
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);
      toast.success("Product has successfully added");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error(errorMessage);
    }
  };

  return (
    <div
      id="AddExistingProductModal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}

        <form
          onSubmit={handleSubmit}
          className="relative bg-white rounded-lg shadow dark:bg-gray-700"
        >
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add Existing Product
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="AddExistingProductModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  for="product-id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product ID
                </label>
                <div className="relative">
                  <select
                    id="selected-product-id"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={selectedProductId}
                    onChange={handleSelectedProductIdChange}
                  >
                    <option value="">Choose an existing Product ID</option>
                    {productIds.map((id) => (
                      <option key={id} value={id}>
                        {id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  for="RFIDtagNumRealtime"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Scanned RFID Tag UID No. (Realtime Database):
                </label>
                <div className="flex items-center mb-2">
                  {realtimeRFID.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {realtimeRFID.map((rfid, index) => (
                        <li key={index}>{rfid}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No RFID Tag Scanned (Realtime Database)</p>
                  )}
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  for="selectedProductRFIDtags"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Existing RFID Tag UID No. (Firestore):
                </label>
                <div className="flex items-center mb-2">
                  {selectedProductRFID.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {selectedProductRFID.map((rfid, index) => (
                        <li key={index}>{rfid}</li>
                      ))}
                    </ul>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  for="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  numberOnly
                >
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={price}
                  onChange={handlePriceChange}
                  readOnly
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlfor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={category}
                  onChange={handleCategoryChange}
                  readOnly
                ></input>
              </div>
            </div>
          </div>
          {/* <!-- Modal footer --> */}
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save all
            </button>

            {/* {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )} */}
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewExistingProduct;
