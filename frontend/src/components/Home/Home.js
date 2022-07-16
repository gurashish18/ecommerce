import React, { useEffect } from "react";
import Product from "../Product/Product";
import "./Home.css";
import Pagehead from "../Pagehead";
import { getProdcucts } from "../../actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
import ReactLoading from "react-loading";

function Home() {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProdcucts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <ReactLoading
          type={"bubbles"}
          color={"#2874f0"}
          height={"10%"}
          width={"10%"}
        />
      ) : (
        <div className="home-container">
          <Pagehead title="ECOMMERCE" />
          <div className="home-products-container">
            <h1>Featured Products</h1>
            <div className="home-products">
              {products &&
                products.map((product) => <Product product={product} />)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
