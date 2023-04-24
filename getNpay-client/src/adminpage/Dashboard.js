import React, { useEffect, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../redux/getNpaySlice";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";

const Dashboard = () => {
  const dispatch = useDispatch();

  // //VIEW PRODUCTS
  const data = useSelector((state) => state.getNpay.productsArray);
  console.log(data);

  //fetch products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  //Delete Product
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  // //Edit Products
  const [productEdit, setProductEdit] = useState(null);

  // const handleEdit = (product) => {
  //   setProductEdit(product);
  // };

  // const cancelUpdate = () => {
  //   setProductEdit(null);
  // };

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
                <p
                  type="button"
                  data-modal-target="AddProductModal"
                  data-modal-show="AddProductModal"
                  className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <MdAdd />
                  Add product
                </p>
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
                  {data.map((newProduct) => (
                    <tr className="border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {newProduct.product.productName}
                      </th>
                      <td className="px-4 py-3">
                        {newProduct.product.RFIDnum}
                      </td>
                      <td className="px-4 py-3">{newProduct.product.lenght}</td>
                      <td className="px-4 py-3">
                        {newProduct.product.category}
                      </td>
                      <td className="px-4 py-3">₱{newProduct.product.price}</td>
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
                            <p
                              onClick={() => handleDelete(newProduct.id)}
                              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              Delete
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* <!-- Edit user modal --> */}
              <EditProduct />

              {/* <!-- ADD PRODUCT modal --> */}
              <AddProduct />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
