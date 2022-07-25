import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import StarRatings from "react-star-ratings";
import { getProdcuctDetails, newReview } from "../../actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Review from "../Review/Review";
import { addItemsToCart } from "../../actions/CartAction";
import { useAlert } from "react-alert";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/ProductConstants";
import { Rating } from "@mui/material";

function ProductDetails() {
  const navigate = useNavigate();
  const alert = useAlert();
  const [quantity, setquantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const { isAuthenticated } = useSelector((state) => state.user);

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

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (isAuthenticated === false) navigate("/auth");
    if (error) {
      alert.error(error);
      // dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      // dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProdcuctDetails(id));
  }, [dispatch, id, quantity, error, alert, reviewError, success]);

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
                  rating={product?.ratings}
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

              <button onClick={submitReviewToggle} className="reviewbtn">
                Add a review
              </button>
            </div>
          </div>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

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
