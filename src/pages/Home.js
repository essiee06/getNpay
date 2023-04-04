import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Products from "../components/Products";
import Header from "../components/Header";

const Home = () => {
  const [products, setProducts] = useState([]);
  const data = useLoaderData();

  useEffect(() => {
    setProducts(data.data);
  }, [data]);
  return (
    <div>
      <Header />
      <Products products={products} />
    </div>
  );
};

export default Home;
