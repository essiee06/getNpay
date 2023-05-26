import React, { useState, useEffect } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import { MdArrowBack, MdDelete, MdEdit } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../firebase.config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import EditProduct from "./EditProduct";
import { ImgNotAvail } from "../assets/index";
import { Link } from "react-router-dom";

const PaidItems = () => {
  const [paidItems, setPaidItems] = useState([]);

  useEffect(() => {
    const fetchPaidItems = () => {
      const paidItemsCollection = collection(db, "Products");
      const q = query(paidItemsCollection);

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const paidItemsData = [];
        querySnapshot.forEach((doc) => {
          const product = doc.data();
          // Filter out unpaid items
          if (Array.isArray(product.RFID) && product.RFID.some((RFID) => RFID.isPaid)) {
            paidItemsData.push({ id: doc.id, ...product });
          }
        });
        setPaidItems(paidItemsData);
      });

      return () => unsubscribe();
    };

    fetchPaidItems();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure to delete the product?")) {
      try {
        // Delete product from database
        await deleteDoc(doc(db, "Products", productId));

        // Update paidItems state by removing the deleted product
        setPaidItems(paidItems.filter((item) => item.id !== productId));
      } catch (error) {
        console.error("Error deleting product: ", error);
      }
    }
  };

  return (
    <div>
      <HeaderAdmin />
      <section className="bg-white mt-16 dark:bg-gray-900 p-5 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12"> <div className="w-full md:w-1/2">
                <div className="mb-4 pt-5 col-span-full xl:mb-2">
                <Link
          to="/admin/dashboard"
          className="w-1/2 md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
<MdArrowBack /> <span className="p-2">go back to dashboard </span>       </Link>
                </div>{" "}
              </div>
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-[#d6e6ee] dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-3">Image Product</th>
                    <th className="px-4 py-3">Product ID</th>
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
                  {paidItems.map((item) => (
                    <tr key={item.id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3">
                      <img
                        src={
                          item.imageProduct ? item.imageProduct : ImgNotAvail
                        }
                        alt={item.productName}
                        className="w-16"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.id}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.productName}
                    </td>
                    <td className="px-4 py-3">
                      <ul>
                        {Array.isArray(item.RFID) &&
                          item.RFID.map((RFID, i) => {
                            if (RFID && RFID.EPC !== undefined && RFID.isPaid !== undefined) {
                              return (
                                <li key={i}>
                                  {RFID.EPC.toString()} - {RFID.isPaid ? "Paid" : "Not Paid"}
                                </li>
                              );
                            } else {
                              return null;
                            }
                          })}
                      </ul>
                    </td>
                    <td className="px-4 py-3">
                      {item.RFID ? item.RFID.length : 0}
                    </td>
                    <td className="px-4 py-3">{item.category}</td>
                    <td className="px-4 py-3">{item.price}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="mr-2 text-red-500 hover:text-red-600"
                      >
                        <MdDelete />
                      </button>
                      <EditProduct product={item} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
);
};

export default PaidItems;