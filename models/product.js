const mongoose = require('mongoose')

const prodSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 1000
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    }
}, {
    timestamps: true
})

prodSchema.methods.toJSON = function () {
    const product = this
    const prodObject = product.toObject()

    if (prodObject.photo) {
        delete prodObject.photo.data
    }
    return prodObject
}



const Product = mongoose.model('Product', prodSchema)

module.exports = Product