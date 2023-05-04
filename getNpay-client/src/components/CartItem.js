import React, { useState, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import { db, rtdb } from "../firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { profile } from "../assets";

const CartItem = () => {
  const [products, setProducts] = useState([]);

  const fetchProductsByRfid = async (rfidList) => {
    const productsRef = collection(db, "Products");
    const productsWithRfid = [];

    try {
      for (let rfid of rfidList) {
        console.log("Searching for product with RFID:", rfid);
        const q = query(productsRef, where("RFIDnum", "array-contains", rfid));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          console.log("Found product:", doc.data());
          const product = { ...doc.data(), id: doc.id };

          // Check if product's RFID tags are in the RFID list and if it has not already been added
          const hasAllRfidTags = product.RFIDnum.every((tag) =>
            rfidList.includes(tag)
          );
          const notAddedYet = !productsWithRfid.some(
            (existingProduct) => existingProduct.id === product.id
          );

          if (hasAllRfidTags && notAddedYet) {
            productsWithRfid.push(product);
          }
        });
      }
    } catch (error) {
      console.error("Error fetching products by RFID:", error);
    }

    // Sort products alphabetically by their product name
    productsWithRfid.sort((a, b) => a.productName.localeCompare(b.productName));
    console.log("Fetched products:", JSON.stringify(productsWithRfid, null, 2));

    setProducts(productsWithRfid);
  };

  useEffect(() => {
    const rfidRef = ref(
      rtdb,
      "UsersData/cLmwoz9mYfeVQv9u2qdlskMplRy1/data_uploads/rfidtag_id"
    );
    const handleNewRfid = (snapshot) => {
      const data = snapshot.val();

      if (data === null) {
        console.log("No RFID tags found");
        setProducts([]);
      } else {
        const rfidList = Object.values(data);
        console.log(rfidList);
        fetchProductsByRfid(rfidList);
      }
    };

    onValue(rfidRef, handleNewRfid);

    return () => {
      off(rfidRef);
    };
  }, []);

  return (
    <div className="py-10">
      <div className="w-full">
        <h2 className="font-titleFont text-2xl">shopping cart</h2>
      </div>
      <div>
        <div className="flex border items-center justify-between gap-6 mt-6">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {products && products.length > 0 ? (
                products.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-32 p-4">
                      <img src={item.imageproduct} alt={item.productName} />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.productName}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <span>{item.RFIDnum.length}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      ₱{item.price}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      ₱ {item.price}*{item.RFIDnum.length}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center">
                    Cart is empty
                  </td>
                  {/* <td className="w-32 p-4">
                    <img src={profile} alt="{item.productName}" />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    Busog Lusog
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <span>9</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    ₱6.00
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    ₱54.00
                  </td> */}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
