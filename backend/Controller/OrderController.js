const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');


//Create new Order
exports.newOrder = async(req,res,next)=>{
    const {
    shippingDetails,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice} = req.body;

    const order = await Order.create({
        shippingDetails,
        orderItems,
        user:req.user,
        paymentInfo,
        paidAt: Date.now(),
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    })

    res.status(201).json({
        success:true,
        order
    })
}

// Get single order (ADMIN)
exports.getSingleOrder = async(req,res,next) => {
    const order = await Order.findById(req.params.id).populate( "user","name email");

    if(!order)
    {
        res.status(400).json({
            success:false,
            message: "No Order found with that id"
        })
        return;
    }


    res.status(200).json({
        success:true,
        order
    })
}

// Get User Orders
exports.getUserOrders = async(req,res,next) => {
    const orders = await Order.find({user: req.user._id})

    res.status(200).json({
        success: true,
        orders
    })
}

// Get all orders (ADMIN)
exports.getAllOrders = async(req,res,next) =>{
    const orders = await Order.find();

    res.status(200).json({
        success:true,
        orders
    })
}

// Update Order Status
exports.updateOrderStatus = async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(!order)
    {
        res.status(400).json({
            success:false,
            message: "No Order found with that id"
        })
        return;
    }

    if(order.orderStatus==="Delivered")
    {
        res.status(400).json({
            success:false,
            message: "Order is already delivered"
        })
        return;
    }

    if(req.body.status=="Shipped")
    {
        order.orderItems.forEach(async(order)=>{
            await updateStock(order)
        })
    }

    order.orderStatus = req.body.status;
    if(req.body.status=="Delivered")
        order.deliveredAt=Date.now();
    await order.save({validateBeforeSave:false});

    res.status(200).json({
        success:true
    })
}

async function updateStock(order){
    const product = await Product.findById(order.product);

    product.stock -= order.quantity

    await product.save({validateBeforeSave:false})
}

// Delete Order (ADMIN)
exports.deleteOrder = async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(!order) {
        res.status(400).json({
            success:false,
            message: "No order found with that id"
        })
        return;
    }

    await order.remove();
    res.status(200).json({
        success:true,
        message: "Order deleted successfully"
    })
}