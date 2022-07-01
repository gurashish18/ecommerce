import React from "react";
import Product from "../Product/Product";
import Slider from "../Slider/Slider";
import "./Home.css";

const product = {
  productId: "sample",
  image:
    "https://i02.appmifile.com/315_operator_sg/09/01/2022/d6cada422152c4d3cb234713b3d89b0b.jpg",
  name: "Xiaomi 11i hypercharge",
  rating: 4,
  price: 27000,
};

function Home() {
  return (
    <div className="home-container">
      <Slider />
      <div className="home-products-container">
        <h1>Featured Products</h1>
        <div className="home-products">
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
        </div>
      </div>
    </div>
  );
}

export default Home;
