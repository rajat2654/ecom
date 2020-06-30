const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')

const createProduct = async (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (error, fields, file) => {
        if (error) {
            res.status(400).json({ error: "Unable to get form data" })
        }

        let product = new Product(fields)

        //handle file
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({ error: "File size too large" })
            }

            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        try {
            await product.save()
            res.json(product)
        } catch (error) {
            res.status(400).json({ error: "Unable to add product" })
        }
    })
}

const getProductById = async (req, res, next, id) => {
    try {
        const product = await Product.findById(id)
        // product.populate('category')
        req.product = product
        next()
    } catch (error) {
        res.status(404).json({ error: "Product not found" })
    }
}

const getProduct = (req, res) => {
    const product = req.product
    res.json(product)
}

const photo = (req, res) => {
    if (req.product.photo.data) {
        const photo = req.product.photo
        res.set("Content-Type", photo.contentType)
        res.send(photo.data)
    }
}

const removeProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndRemove(req.product._id)
        res.json(product)
    } catch (error) {
        res.status(404).json({ error: "Product not found" })
    }
}

const updateProduct = async (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (error, fields, file) => {
        if (error) {
            res.status(400).json({ error: "Unable to get form data" })
        }

        //update handler
        let product = req.product
        product = _.extend(product, fields)

        //handle file
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({ error: "File size too large" })
            }

            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        try {
            await product.save()
            res.json(product)
        } catch (error) {
            res.status(400).json({ error: "Unable to update product" })
        }
    })
}

const getAllProducts = (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 8
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id'

    Product.find()
        .select('-photo.data')
        .populate('category')
        .sort([[sortBy, 'asc']])
        .limit(limit)
        .exec((error, products) => {
            if (error) {
                return res.status(400).json({ error: "Unable to get products" })
            }

            res.json(products)
        })
}

const updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: { _id: prod._id },
                update: { $inc: { stock: -prod.count, sold: +prod.count } }
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (error, products) => {
        if (error) {
            return res.status(400).json({ error: "Unable to update stock" })
        }

        next()
    })
}

const getAllUniqueCategories = (req, res) => {
    Product.distinct('category', {}, (error, categories) => {
        if (error) {
            return res.status(400).json({ error: "Unable to get unique categories" })
        }

        res.json(categories)
    })
}



module.exports = {
    getProductById,
    createProduct,
    getProduct,
    photo,
    removeProduct,
    updateProduct,
    getAllProducts,
    updateStock,
    getAllUniqueCategories
}