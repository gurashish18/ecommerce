import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../actions/OrderAction";
import { useAlert } from "react-alert";

const OrderDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { id } = useParams();

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (isAuthenticated === false) navigate("/auth");
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);
  return (
    <Fragment>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <Fragment>
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <h1 component="h1">Order #{order?._id}</h1>
              <h1>Shipping Info</h1>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order?.user?.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>{order?.shippingDetails?.phoneNo}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {`${order?.shippingDetails?.address}, ${order?.shippingDetails?.city}, ${order?.shippingDetails?.state}, ${order?.shippingDetails?.pinCode}, ${order?.shippingDetails?.country}`}
                  </span>
                </div>
              </div>
              <h1>Payment</h1>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order?.paymentInfo?.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order?.paymentInfo?.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>₹{order?.totalPrice}</span>
                </div>
              </div>

              <h1>Order Status</h1>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order?.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order?.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <h1>Order Items:</h1>
              <div className="orderDetailsCartItemsContainer">
                {order?.orderItems &&
                  order?.orderItems.map((item) => (
                    <div key={item?.product}>
                      <img src={item?.image} alt="Product" />
                      <Link to={`/product/${item?.product}`}>
                        {item?.name}
                      </Link>{" "}
                      <span>
                        {item?.quantity} X ₹{item?.price} ={" "}
                        <b>₹{item?.price * item?.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
