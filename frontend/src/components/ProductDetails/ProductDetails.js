import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import StarRatings from "react-star-ratings";
import { getProdcuctDetails } from "../../actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Review from "../Review/Review";
import { addItemsToCart } from "../../actions/CartAction";
import { useAlert } from "react-alert";

function ProductDetails() {
  const alert = useAlert();
  const [quantity, setquantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.productDetails);

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    let quant = quantity;
    setquantity(quant - 1);
  };

  const increaseQuantity = () => {
    if (product?.stock <= quantity) return;
    let quant = quantity;
    setquantity(quant + 1);
  };

  const addtocart = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added to Cart");
  };

  useEffect(() => {
    dispatch(getProdcuctDetails(id));
  }, [dispatch, id, quantity]);

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <div className="product-details">
            <div className="product-details-left">
              <Carousel>
                {product?.images &&
                  product?.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div className="product-details-right">
              <h1>{product?.name}</h1>
              <h3>Product id {product?._id}</h3>
              <div className="product-rating">
                <StarRatings
                  rating={product?.rating}
                  starRatedColor="#FFD700"
                  numberOfStars={5}
                  name="rating"
                  starDimension="30px"
                />
                <span>({product?.reviews.length} reviews)</span>
              </div>
              <p className="product-price">₹{product?.price}</p>
              <p className="product-description">{product?.description}</p>

              <div className="product-quantity">
                <p>Enter quantity</p>
                <button className="quantitybtn" onClick={decreaseQuantity}>
                  -
                </button>
                <input readOnly type="number" value={quantity} />
                <button className="quantitybtn" onClick={increaseQuantity}>
                  +
                </button>
              </div>

              <button
                onClick={addtocart}
                className="addtocartbtn"
                disabled={product?.stock < 1 ? true : false}
              >
                Add to Cart
              </button>

              <p className="product-stock">
                Status:
                <b className={product?.stock < 1 ? "nostock" : "instock"}>
                  {product?.stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>

              <button className="reviewbtn">Add a review</button>
            </div>
          </div>

          {product?.reviews && product?.reviews[0] ? (
            <div className="reviews">
              {product?.reviews &&
                product?.reviews.map((review) => <Review review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet...</p>
          )}
        </>
      )}
    </>
  );
}

export default ProductDetails;
