import React, { useEffect, useState } from "react";
import { updateProduct } from "../redux/getNpaySlice";
import { useDispatch } from "react-redux";

const EditProduct = () => {
  const dispatch = useDispatch();

  //EDIT PRODUCT
  const [editedproductName, setEditedProductName] = useState("");
  const [editedRFIDnum, setEditedRFIDnum] = useState("");
  const [editedprice, setEditedPrice] = useState("");
  const [editedcategory, setEditedCategory] = useState("");
  const [editedimageproduct, setEditedImageProduct] = useState("");

  // //Edit Products
  const [productEdit, setProductEdit] = useState(null);

  // const cancelUpdate = () => {
  //   setProductEdit(null);
  // };
  useEffect(() => {
    if (productEdit !== null) {
      setEditedProductName(productEdit.product.productName);
      setEditedRFIDnum(productEdit.product.RFIDnum);
      setEditedPrice(productEdit.product.price);
      setEditedCategory(productEdit.product.category);
      setEditedImageProduct(productEdit.product.imageproduct);
    }
  }, [productEdit]);

  const handleUpdateProduct = (e) => {
    let product = {
      productName: editedproductName,
      RFIDnum: editedRFIDnum,
      price: editedprice,
      category: editedcategory,
      imageproduct: editedimageproduct,
    };
    dispatch(updateProduct({ id: productEdit.id, product }));
  };

  return (
    <div
      id="editProductModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative w-full max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <form
          onSubmit={handleUpdateProduct}
          class="relative bg-white rounded-lg shadow dark:bg-gray-700"
        >
          {/* <!-- Modal header --> */}
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Product
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="editProductModal"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
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
          <div class="p-6 space-y-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="product-name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Name
                </label>
                <input
                  onChange={(e) => setEditedProductName(e.target.value)}
                  value={editedproductName}
                  type="text"
                  name="product-name"
                  id="product-name"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="e.g Mega Sardines"
                  required=""
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="RFIDtagNum"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  RFID Tag UID No.:
                </label>
                <input
                  onChange={(e) => setEditedRFIDnum(e.target.value)}
                  value={editedRFIDnum}
                  type="number"
                  name="RFIDtagNum"
                  id="RFIDtagNum"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="e.g 1234"
                  required=""
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="price"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  onChange={(e) => setEditedPrice(e.target.value)}
                  value={editedprice}
                  type="price"
                  name="price"
                  id="price"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="e.g. ₱5.00"
                  required=""
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="category"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <input
                  onChange={(e) => setEditedCategory(e.target.value)}
                  value={editedcategory}
                  type="text"
                  name="category"
                  id="category"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="e.g Canned Goods"
                  required=""
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="company"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Upload Image
                </label>

                <div class="flex items-center justify-center w-full">
                  <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        class="w-10 h-10 mb-3 text-gray-400"
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
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      onChange={(e) => setEditedImageProduct(e.target.value)}
                      value={editedimageproduct}
                      id="dropzone-file"
                      type="file"
                      class="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Modal footer --> */}
          <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save all
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
