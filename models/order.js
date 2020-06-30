const mongoose = require('mongoose')

const productCartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    },
    name: String,
    count: Number,
    price: Number
})

const orderSchema = new mongoose.Schema({
    products: [productCartSchema],
    transaction_id: {},
    amount: {
        type: Number
    },
    address: String,
    status: {
        type: String,
        default: "Recieved",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"]
    },
    updated: Date,
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})



const ProductCart = mongoose.model('ProductCart', productCartSchema)
const Order = mongoose.model('Order', orderSchema)

module.exports = {
    Order,
    ProductCart
}