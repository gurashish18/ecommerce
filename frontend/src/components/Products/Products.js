import React, { useEffect, useState } from "react";
import "./Products.css";
import { getProdcucts } from "../../actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
import ReactLoading from "react-loading";
import Product from "../Product/Product";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";

function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 200000]);
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const { loading, products, resultsperpage, productsCount } = useSelector(
    (state) => state.products
  );

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    dispatch(getProdcucts(keyword, currentPage, price));
  }, [dispatch, keyword, currentPage, price]);
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
        <>
          <div className="products-main-container">
            <div className="filter-box">
              <div className="price-filter">
                <p>Price Filter</p>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={200000}
                />
              </div>
            </div>
            <div className="products-container">
              <div className="products">
                {products &&
                  products.map((product) => <Product product={product} />)}
              </div>
            </div>
          </div>

          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultsperpage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        </>
      )}
    </>
  );
}

export default Products;
