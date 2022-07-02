const Product = require("../models/ProductModel");
const Apifeatures = require("../utils/Apifeatures");

// Create product (ADMIN)
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return next(error);
  }
};

// Get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const resultsperpage = 8;
    const apifeatures = new Apifeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultsperpage);
    const products = await apifeatures.query;
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(error);
  }
};

// Update product (ADMIN)
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      res.status(500).json({
        success: false,
        message: "No product found with that id",
      });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(error);
  }
};

// Delete Product (ADMIN)
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(500).json({
        success: false,
        message: "No product found with that id",
      });
    }
    await product.remove();
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};

// Get product details
exports.getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(500).json({
        success: false,
        message: "No product found with that id",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(error);
  }
};

// Create/Update Product Review
// Means if a user has already reviewed a particular product, the review will be updated otherwise it will be cerated
exports.createReview = async (req, res, next) => {
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: req.body.rating,
    comment: req.body.comment,
  };

  const product = await Product.findById(req.body.productId);

  // checking if the user has already reviewed that product
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    // if already reviewd update it
    product.reviews.find((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = req.body.rating;
        rev.comment = req.body.comment;
      }
    });
  } else {
    // if not reviewed create it
    product.reviews.push(review);
  }

  // Now update the overall ratings of a product;
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: true });

  res.status(200).json({
    success: true,
  });
};

// Get all Product reviews
exports.getAllReviews = async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    res.status(400).json({
      success: false,
      message: "No product found with that id",
    });
    return;
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};

// Delete review
