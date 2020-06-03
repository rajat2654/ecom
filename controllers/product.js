const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')

const createProduct = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (error, fields, file) => {
        if (error) {
            res.status(400).send({ error })
        }

        let product = new Product(fields)

        //handle file
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).send({ error: "File size too large" })
            }

            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        product.save((error, product) => {
            if (error) {
                return res.status(400).send({ error })
            }

            res.send(product)
        })
    })
}

const getProductById = (req, res, next, id) => {
    Product.findById(id)
        .populate('category')
        .exec((error, product) => {
            if (error) {
                return res.status(400).send({ error })
            }

            req.product = product
            next()
        })
}

const getProduct = (req, res) => {
    const product = req.product
    res.send(product)
}

const photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType)
        res.send(req.product.photo.data)
    }
    next()
}

const removeProduct = (req, res) => {
    Product.findByIdAndRemove(req.product._id).exec((error, product) => {
        if (error) {
            return res.status(400).send({ error })
        }

        res.send(product)
    })
}

const updateProduct = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (error, fields, file) => {
        if (error) {
            res.status(400).send({ error })
        }

        //update handler
        let product = req.product
        product = _.extend(product, fields)

        //handle file
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).send({ error: "File size too large" })
            }

            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        product.save((error, product) => {
            if (error) {
                return res.status(400).send({ error })
            }

            res.send(product)
        })
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
                return res.status(400).send({ error })
            }

            res.send(products)
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
            return res.status(400).send({ error })
        }

        next()
    })
}

const getAllUniqueCategories = (req, res) => {
    Product.distinct('category', {}, (error, categories) => {
        if (error) {
            return res.status(400).send({ error })
        }

        res.send(categories)
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