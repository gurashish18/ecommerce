import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./OrderSuccess.css";
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <h1>Your Order has been Placed successfully </h1>
      <Link to="/orders">View Orders</Link>
    </div>
  );
}

export default OrderSuccess;
