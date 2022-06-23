const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Please enter a name"]
    },
    description: {
        type: String,
        required:[true, "Please enter a description"]
    },
    price: {
        type:Number,
        required:[true, "Please enter a price"],
        maxLength:[6, "Price cannot be greater than 6 digits"]
    },
    images: [
        {
            public_id: {
                type:String,
                required:true
            },
            url: {
                type:String,
                required:true
            }
        }
    ],
    rating: {
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:[true,"Please enter a category"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter a stock number"],
        maxLength:[4, "Stock number cannot be greater than 4 digits"]
    },
    // reviews: [
    //     {
    //         name:{
    //             type:String,
    //             required:[true, "Please enter name"]
    //         },
    //         rating: {
    //             type:Number,
    //             default:0
    //         },
    //         comment: {
    //             type: String,
    //             required: true
    //         }
    //     }
    // ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema)