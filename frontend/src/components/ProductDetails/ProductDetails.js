import React, { useEffect } from "react";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import StarRatings from "react-star-ratings";
import { getProdcuctDetails } from "../../actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Review from "../Review/Review";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  console.log(product);

  // console.log(product);
  useEffect(() => {
    dispatch(getProdcuctDetails(id));
  }, [dispatch]);

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
                <button className="quantitybtn" onClick={() => {}}>
                  -
                </button>
                <input readOnly type="number" />
                <button className="quantitybtn" onClick={() => {}}>
                  +
                </button>
              </div>

              <button
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
