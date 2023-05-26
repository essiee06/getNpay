import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config';

function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByRfid = async (rfidList) => {
        const productsRef = collection(db, "Products");
        const productsWithRfid = [];
    
        try {
          const querySnapshot = await getDocs(productsRef);
          querySnapshot.forEach((doc) => {
            const product = { ...doc.data(), id: doc.id };
    
            for (const rfid of rfidList) {
              if (product.RFID) {
                // Find the RFID item that matches the rfid and is not paid
                const matchingRfidItem = product.RFID.find(
                  (item) => item.EPC === rfid && !item.isPaid
                );
                if (matchingRfidItem) {
                  productsWithRfid.push({
                    ...product,
                    id: product.id + "-" + rfid,
                    quantity: 1,
                    RFID: [rfid],
                  });
                }
              }
            }
          });
        } catch (error) {
          console.error("Error fetching products by RFID:", error);
        }
    
        // Sort the array alphabetically by product name
        const sortedProducts = productsWithRfid.sort((a, b) =>
          a.productName.localeCompare(b.productName)
        );
        console.log("Fetched products:", JSON.stringify(sortedProducts, null, 2));
    
        setProducts(sortedProducts);
      };
      fetchProductsByRfid();
  }, []);

  return products;
}

export default useProducts;
