import React, { useState, useEffect, useCallback } from "react";
import {
  collection,
  where,
  query,
  getDocs,
  setDoc,
  addDoc,
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

const AddNewProduct = () => {
  const [productName, setProductName] = useState("");
  const [RFID, setRFIDnum] = useState([]);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [productId, setProductId] = useState("");

  const handleProductNameChange = (e) => setProductName(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleProductIdChange = (e) => setProductId(e.target.value);

  useEffect(() => {
    const rfidRef = realtimeRef(
      rtdb,
      "UsersData/cLmwoz9mYfeVQv9u2qdlskMplRy1/data_uploads/rfidtag_id"
    ); // Replace with the actual path to your RFID tags in the realtime database

    const handleData = (snapshot) => {
      const fetchedData = snapshot.val();
      const fetchedRFIDTags = Object.values(fetchedData || {});
      setRFIDnum(fetchedRFIDTags);
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

  const navigate = useNavigate("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productsRef = collection(db, "Products");
      let existingRFID = false;

      for (const RFIDtag of RFID) {
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
      const RFIDWithIsPaid = RFID.map((RFIDtag) => ({
        RFIDtag,
        isPaid: false,
      }));

      const docData = {
        productName: productName,
        RFID: RFIDWithIsPaid, // Use the modified RFID array
        price: price,
        category: category,
      };

      const docRef = await addDoc(productsRef, docData);

      if (file) {
        const storage = getStorage();
        const storageRef = ref(
          storage,
          `productImage/${docRef.id}/${file.name}`
        );

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Progress function
            // You can use this to provide feedback on upload progress to the user
          },
          (error) => {
            // Error function
            console.log(error);
          },
          () => {
            // Complete function
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              const productRef = doc(db, "Products", docRef.id);
              updateDoc(productRef, {
                imageProduct: downloadURL,
              });
            });
          }
        );
      }

      setProductName("");
      //setRFIDnum([]);
      setPrice("");
      setCategory("");
      setFile(null);
      setFileName("No file chosen");
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
      id="AddNewProductModal"
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
              Add New Product
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="AddNewProductModal"
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
                  <input
                    type="text"
                    name="product-id"
                    id="product-id"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
                    placeholder="e.g Product 01"
                    required
                    value={productId}
                    onChange={handleProductIdChange}
                  />
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  for="RFIDtagNum"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  RFID Tag UID No.:
                </label>
                <div className="flex items-center mb-2">
                  {RFID.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {RFID.map((rfid, index) => (
                        <li key={index}>{rfid}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No RFID Tag Scanned</p>
                  )}
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  for="product-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="product-name"
                  id="product-name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="e.g Mega Sardines"
                  required
                  value={productName}
                  onChange={handleProductNameChange}
                />
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
                  type="number"
                  name="price"
                  id="price"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="e.g. ₱5.00"
                  required
                  value={price}
                  onChange={handlePriceChange}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlfor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select an option
                </label>
                <select
                  type="text"
                  name="category"
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={category}
                  onChange={handleCategoryChange}
                >
                  <option value="">Choose a category</option>
                  <option value="Fruits & Vegetables">
                    Fruits & Vegetables
                  </option>
                  <option value="Snacks & Beverages">Snacks & Beverages</option>
                  <option value="Canned Goods">Canned Goods</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Fish & Meat">Fish & Meat</option>
                  <option value="Pasta, Rice & Cereal">
                    Pasta, Rice & Cereal
                  </option>
                  <option value="Household & Cleaning Suppliesaning">
                    Household & Cleaning Supplies
                  </option>
                  <option value=" Personal Care & Health Care">
                    Personal Care & Health Care
                  </option>
                </select>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  for="company"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Upload Image
                </label>
                <input
                  id="file"
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setFileName(e.target.files[0].name);
                  }}
                  className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                />

                <br></br>
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

export default AddNewProduct;
