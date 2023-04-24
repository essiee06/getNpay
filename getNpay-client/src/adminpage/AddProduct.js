import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProductToFirestore } from "../redux/getNpaySlice";
import { getDatabase, ref, onValue} from "firebase/database";
import { app } from "../firebase.config";

const AddProduct = () => {
  const dispatch = useDispatch();

  //ADD PRODUCT
  const [productName, setProductName] = useState("");
  const [RFIDnum, setRFIDnum] = useState([]);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageproduct, setImageProduct] = useState("");

  //ADD PRODUCT EVENT
  const handleAddProduct = (e) => {
    e.preventDefault();
    let product = {
      productName,
      RFIDnum,
      price,
      category,
      imageproduct,
    };
    //dispatch function
    dispatch(addProductToFirestore(product));
    setProductName("");
    setRFIDnum([]);
    setPrice("");
    setCategory("");
    setImageProduct("");
  };
  //Edit Products
  const [productEdit, setProductEdit] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const db = getDatabase(app);
    const rfidRef = ref(db, "UsersData/cLmwoz9mYfeVQv9u2qdlskMplRy1/data_uploads/rfidtag_id");
    onValue(rfidRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data); // Add this line to log the data
      if (data) {
        const rfidTags = Object.values(data);
        setRFIDnum(rfidTags);
      } else {
        setRFIDnum([]);
      }
    });
  };

  return (
    <div
      id="AddProductModal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <form
          onSubmit={handleAddProduct}
          className="relative bg-white rounded-lg shadow dark:bg-gray-700"
        >
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add Product
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="AddProductModal"
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
                  for="product-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Name
                </label>
                <input
                  onChange={(e) => setProductName(e.target.value)}
                  value={productName}
                  type="text"
                  name="product-name"
                  id="product-name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="e.g Mega Sardines"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  for="RFIDtagNum"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  RFID Tag UID No.:
                </label>
                <ul className="list-disc pl-5">
                  {RFIDnum.map((rfidTag, index) => (
                    <li key={index}>{rfidTag}</li>
                  ))}
                </ul>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  for="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  type="number"
                  name="price"
                  id="price"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="e.g. ₱5.00"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  for="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <input
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  type="text"
                  name="category"
                  id="category"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="e.g Canned Goods"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  for="company"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Upload Image
                </label>

                <div className="flex items-center justify-center w-full">
                  <label
                    for="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      onChange={(e) => setImageProduct(e.target.value)}
                      value={imageproduct}
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                    />
                  </label>
                </div>
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
