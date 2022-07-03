import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { getProdcuctDetails } from "../../actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

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
        <div className="product-details">
          <div className="product-details-left">
            <h1>{product?.name}</h1>
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
          <div className="product-details-right"></div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
