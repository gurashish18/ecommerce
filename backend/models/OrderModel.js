const mongoose = require("mongoose");

const orderschema = new mongoose.Schema({
  shippingDetails: {
    address: {
      type: String,
      required: [true, "Please enter address"],
    },
    city: {
      type: String,
      required: [true, "Please enter city"],
    },
    state: {
      type: String,
      required: [true, "Please enter state"],
    },
    country: {
      type: String,
      required: [true, "Please enter country"],
    },
    pinCode: {
      type: Number,
      required: [true, "Please enter pincode"],
    },
    phoneNo: {
      type: Number,
      required: [true, "Please enter phone number"],
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: [true, "Please enter order name"],
      },
      price: {
        type: Number,
        required: [true, "Please enter order price"],
      },
      quantity: {
        type: Number,
        required: [true, "Please enter order quantity"],
      },
      image: {
        type: String,
        required: [true, "Please enter order image"],
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderschema);
