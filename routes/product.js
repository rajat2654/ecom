const express = require('express')
const { getProductById, getProduct, photo, createProduct, removeProduct, updateProduct, getAllProducts, getAllUniqueCategories } = require('../controllers/product')
const { getUserById } = require('../controllers/user')
const { isSignedin, isAuthenticated, isAdmin } = require('../controllers/auth')

const router = express.Router()

//params 
router.param('userId', getUserById)
router.param('productId', getProductById)

//actual routes

//create route
router.post('/product/create/:userId', isSignedin, isAuthenticated, isAdmin, createProduct)

//read routes
router.get('/product/:productId', getProduct)
router.get('/product/photo/:productId', photo)
router.get('/products', getAllProducts)

//delete route
router.delete('/product/:productId/:userId', isSignedin, isAuthenticated, isAdmin, removeProduct)

//update route
router.put('/product/:productId/:userId', isSignedin, isAuthenticated, isAdmin, updateProduct)



router.get('/products/categories', getAllUniqueCategories)



module.exports = router