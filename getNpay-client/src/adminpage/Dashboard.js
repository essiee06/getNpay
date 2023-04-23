import React from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import { MdAdd } from "react-icons/md";

const Dashboard = () => {
  return (
    <div>
      <HeaderAdmin />
      <section className="bg-white mt-16 dark:bg-gray-900 p-5 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          {/* <!-- Start coding here --> */}
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <div classNameName="mb-4 pt-5 col-span-full xl:mb-2">
                  <h1 classNameName="text-3xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                    Dashboard
                  </h1>
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <a
                  href="#"
                  type="button"
                  data-modal-target="AddProductModal"
                  data-modal-show="AddProductModal"
                  className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <MdAdd />
                  Add product
                </a>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-[#d6e6ee] dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      RFID Tag No.
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Apple iMac 27&#34;
                    </th>
                    <td className="px-4 py-3">PC</td>
                    <td className="px-4 py-3">Apple</td>
                    <td className="px-4 py-3">300</td>
                    <td className="px-4 py-3">$2999</td>
                    <td className="px-4 py-3 flex items-center justify-end">
                      <button
                        id="apple-imac-27-dropdown-button"
                        data-dropdown-toggle="apple-imac-27-dropdown"
                        className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                        type="button"
                      >
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewbox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                      <div
                        id="apple-imac-27-dropdown"
                        className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                      >
                        <ul
                          className="py-1 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="apple-imac-27-dropdown-button"
                        >
                          <li>
                            <p
                              type="button"
                              data-modal-target="editProductModal"
                              data-modal-show="editProductModal"
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Edit
                            </p>
                          </li>
                        </ul>
                        <div className="py-1">
                          <a
                            href="#"
                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Apple iMac 20&#34;
                    </th>
                    <td className="px-4 py-3">PC</td>
                    <td className="px-4 py-3">Apple</td>
                    <td className="px-4 py-3">200</td>
                    <td className="px-4 py-3">$1499</td>
                    <td className="px-4 py-3 flex items-center justify-end">
                      <button
                        id="apple-imac-20-dropdown-button"
                        data-dropdown-toggle="apple-imac-20-dropdown"
                        className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                        type="button"
                      >
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewbox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                      <div
                        id="apple-imac-20-dropdown"
                        className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                      >
                        <ul
                          className="py-1 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="apple-imac-20-dropdown-button"
                        >
                          <li>
                            <a
                              href="#"
                              type="button"
                              data-modal-target="editProductModal"
                              data-modal-show="editProductModal"
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Edit
                            </a>
                          </li>
                        </ul>
                        <div className="py-1">
                          <a
                            href="#"
                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Apple iPhone 14
                    </th>
                    <td className="px-4 py-3">Phone</td>
                    <td className="px-4 py-3">Apple</td>
                    <td className="px-4 py-3">1237</td>
                    <td className="px-4 py-3">$999</td>
                    <td className="px-4 py-3 flex items-center justify-end">
                      <button
                        id="apple-iphone-14-dropdown-button"
                        data-dropdown-toggle="apple-iphone-14-dropdown"
                        className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                        type="button"
                      >
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewbox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                      <div
                        id="apple-iphone-14-dropdown"
                        className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                      >
                        <ul
                          className="py-1 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="apple-iphone-14-dropdown-button"
                        >
                          <li>
                            <a
                              href="#"
                              type="button"
                              data-modal-target="editProductModal"
                              data-modal-show="editProductModal"
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Edit
                            </a>
                          </li>
                        </ul>
                        <div className="py-1">
                          <a
                            href="#"
                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* <!-- Edit user modal --> */}
              <div
                id="editProductModal"
                tabindex="-1"
                aria-hidden="true"
                class="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
              >
                <div class="relative w-full max-w-2xl max-h-full">
                  {/* <!-- Modal content --> */}
                  <form
                    action="#"
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
                                  <span class="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">
                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                              </div>
                              <input
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

              {/* <!-- ADD PRODUCT modal --> */}

              <div
                id="AddProductModal"
                tabindex="-1"
                aria-hidden="true"
                class="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
              >
                <div class="relative w-full max-w-2xl max-h-full">
                  {/* <!-- Modal content --> */}
                  <form
                    action="#"
                    class="relative bg-white rounded-lg shadow dark:bg-gray-700"
                  >
                    {/* <!-- Modal header --> */}
                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Add Product
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
                                  <span class="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">
                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                              </div>
                              <input
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
