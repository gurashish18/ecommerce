import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "./Product.css";

function Product({ product }) {
  return (
    <Link className="product-card" to={product.productId}>
      <img src={product.image} alt="product" />
      <h3>{product.name}</h3>
      <div className="rating">
        <StarRatings
          rating={product.rating}
          starRatedColor="#FFD700"
          numberOfStars={5}
          name="rating"
          starDimension="30px"
        />
        <span>(250 reviews)</span>
      </div>
      <p>₹ {product.price}</p>
    </Link>
  );
}

export default Product;
