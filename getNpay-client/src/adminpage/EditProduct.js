import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
  uploadBytes,
} from "firebase/storage";
import { db } from "../firebase.config";
import { MdEdit } from "react-icons/md";
import { storage } from "../firebase.config";
import { deleteObject } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = ({ product }) => {
  const [currentProduct, setCurrentProduct] = useState(product);
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [, setProduct] = useState(null); // Add this line

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Delete the old image
    const oldImageRef = ref(storage, product.imageProduct);
    await deleteObject(oldImageRef);

    // Upload the new image
    const storageRef = ref(storage, `productImage/${product.id}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Update the imageProduct field in the database
    await updateDoc(doc(db, "Products", product.id), {
      imageProduct: downloadURL,
    });

    // Update the imageProduct field in the local state
    setProduct((prevProduct) => ({
      ...prevProduct,
      imageProduct: downloadURL,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: value,
    });
  };

  const updateProduct = async () => {
    try {
      const productRef = doc(db, "Products", product.id);
      await updateDoc(productRef, {
        productName: currentProduct.productName,
        price: currentProduct.price,
        category: currentProduct.category,
        imageProduct: currentProduct.imageProduct, // Add this line to update the image URL
        // Add any other fields you want to update
      });
      toast.success("Product successfully updated!");
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  return (
    <>
      <button
        className="text-gray-500 hover:text-gray-600"
        type="button"
        onClick={toggleModal}
      >
        <MdEdit />
      </button>

      <div
        id={`EditProductModal-${product.id}`}
        className={`fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-40 ${
          modalVisible ? "modal-open" : "hidden"
        }`}
      >
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="relative p-6 flex-auto">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateProduct();
                    // Close the modal after updating the product
                  }}
                  className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                >
                  {/* <!-- Modal header --> */}
                  <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Edit Product
                    </h3>
                    <button
                      onClick={toggleModal}
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                          type="text"
                          name="productName"
                          id="product-name"
                          value={currentProduct.productName}
                          onChange={handleInputChange}
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
                        <ul className="list-disc pl-5"></ul>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          for="price"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          value={currentProduct.price}
                          onChange={handleInputChange}
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="e.g. ₱5.00"
                          required
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
                          value={currentProduct.category}
                          onChange={handleInputChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="">Choose a category</option>
                          <option value="Fruits & Vegetables">
                            Fruits & Vegetables
                          </option>
                          <option value="Snacks & Beverages">
                            Snacks & Beverages
                          </option>
                          <option value="Canned Goods">Canned Goods</option>
                          <option value="Dairy">Dairy</option>
                          <option value="Fish & Meat">Fish & Meat</option>
                          <option value="Pasta, Rice & Cereal">
                            Pasta, Rice & Cereal
                          </option>
                          <option value="Household & Cleaning Suppliesaning">
                            Household & Cleaning Supplies
                          </option>
                          <option
                            value="Personal Care & Health Care
"
                          >
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
                          onChange={handleImageChange}
                          className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        />
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
      </div>
    </>
  );
};

export default EditProduct;
