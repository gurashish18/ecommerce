import React from "react";
import "./Review.css";
import StarRatings from "react-star-ratings";
import { FaUserCircle } from "react-icons/fa";

function Review({ review }) {
  return (
    <>
      <div className="user-review">
        <FaUserCircle style={{ fontSize: "2.5rem" }} />
        <div className="user-review-details">
          <h1>{review?.name}</h1>
          <StarRatings
            rating={review?.rating}
            starRatedColor="#FFD700"
            numberOfStars={5}
            name="rating"
            starDimension="20px"
          />
          <p>{review?.comment}</p>
        </div>
      </div>
    </>
  );
}

export default Review;
