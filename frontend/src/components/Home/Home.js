import React, { useEffect } from "react";
import Product from "../Product/Product";
import Slider from "../Slider/Slider";
import "./Home.css";
import Pagehead from "../Pagehead";
import { getProdcucts } from "../../actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";

import ReactLoading from "react-loading";

const Example = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={667} width={375} />
);

// const product = {
//   productId: "sample",
//   image:
//     "https://i02.appmifile.com/315_operator_sg/09/01/2022/d6cada422152c4d3cb234713b3d89b0b.jpg",
//   name: "Xiaomi 11i hypercharge",
//   rating: 4,
//   price: 27000,
// };

function Home() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  console.log("PRODUCTS->>>", products);

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
          <Slider />
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