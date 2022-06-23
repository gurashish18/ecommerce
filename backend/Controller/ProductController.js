const Product = require('../models/ProductModel')
const Apifeatures = require('../utils/Apifeatures')

// Create product (ADMIN)
exports.createProduct = async(req,res,next) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            message: "Product created successfully",
            product
        })
    } catch (error) {
        return next(error)
    }
}


// Get all products
exports.getAllProducts = async(req,res,next) => {
    try {
        const resultsperpage = 2;
        const apifeatures = new Apifeatures(Product.find(),req.query).search().filter().pagination(resultsperpage)
        const products = await apifeatures.query;
        res.status(200).json({
            success:true,
            products
        })   
    } catch (error) {
        return next(error)
    }
}

// Update product (ADMIN)
exports.updateProduct = async(req,res,next) => {
    try {
        let product = await Product.findById(req.params.id)

        if(!product)
        {
            res.status(500).json({
                success:false,
                message: "No product found with that id"
            })
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body,{new:true,runValidators:true});
        res.status(200).json({
            success:true,
            product
        })
    } catch (error) {
        return next(error)
    }
}

// Delete Product (ADMIN)
exports.deleteProduct = async(req,res,next) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product)
        {
            res.status(500).json({
                success:false,
                message: "No product found with that id"
            })
        }
        await product.remove();
        res.status(200).json({
            success:true,
            message:"Product deleted successfully"
        })
    } catch (error) {
        return next(error)
    }
}

// Get product details
exports.getProductDetails = async(req,res,next) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product)
        {
            res.status(500).json({
                success:false,
                message: "No product found with that id"
            })
        }

        res.status(200).json({
            success:true,
            product
        })
    } catch (error) {
        return next(error)
    }
}