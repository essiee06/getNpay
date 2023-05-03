import React, { useState, useEffect } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../firebase.config";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "Products");
      const productsSnapshot = await getDocs(productsCollection);
      setProducts(
        productsSnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        })
      );
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure to delete the product?")) {
      try {
        // Delete product from database
        await deleteDoc(doc(db, "Products", productId));

        // Update products state by removing the deleted product

        setProducts(products.filter((product) => product.id !== productId));
      } catch (error) {
        console.error("Error deleting product: ", error);
      }
    }
  };
  return (
    <div>
      <HeaderAdmin />
      <section className="bg-white mt-16 dark:bg-gray-900 p-5 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          {/* <!-- Start coding here --> */}

          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <div className="mb-4 pt-5 col-span-full xl:mb-2">
                  <h1 className="text-3xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                    Dashboard
                  </h1>
                </div>{" "}
                <div>
                  <p
                    type="button"
                    data-modal-target="EditProductModal"
                    data-modal-show="EditProductModal"
                    className="px-4 py-3  hover:text-red-600"
                  >
                    <MdEdit>Edit</MdEdit>
                  </p>
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
                    <th className="px-4 py-3">Image Product</th>
                    <th className="px-4 py-3">Product Name</th>
                    <th className="px-4 py-3">RFID Tag No.</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="px-4 py-3">
                        <img
                          src={product.imageProduct}
                          alt={product.productName}
                          className="w-16"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {product.productName}
                      </td>
                      <td className="px-4 py-3">
                        <ul>
                          {product.RFIDnum.map((RFID, i) => (
                            <li key={i}>{RFID}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-3">{product.RFIDnum.length}</td>
                      <td className="px-4 py-3">{product.category}</td>
                      <td className="px-4 py-3">{product.price}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="mr-2 text-red-500 hover:text-red-600"
                        >
                          <MdDelete />
                        </button>
                        <EditProduct />
                        {/* <button
                          data-modal-target={`EditProductModal-${product.id}`}
                          data-modal-show="EditProductModal"
                          className="text-gray-500 hover:text-gray-600"
                        >
                          <MdEdit /> 
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* <!-- Edit user modal --> */}
              {/* <EditProduct /> */}

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
