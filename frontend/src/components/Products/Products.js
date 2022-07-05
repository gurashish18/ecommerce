import React, { useEffect, useState } from "react";
import "./Products.css";
import { getProdcucts } from "../../actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
import ReactLoading from "react-loading";
import Product from "../Product/Product";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";

function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const { loading, error, products, resultsperpage, productsCount } =
    useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(getProdcucts(keyword, currentPage));
  }, [dispatch, keyword, currentPage]);
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
          <div className="home-container">
            <div className="home-products-container">
              <h1>Products</h1>
              <div className="home-products">
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
