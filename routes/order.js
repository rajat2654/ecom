const express = require('express')
const router = express.Router()
const { getUserById, pushOrderInPurchaseList } = require('../controllers/user')
const { isSignedin, isAuthenticated, isAdmin } = require('../controllers/auth')
const { updateStock } = require('../controllers/product')
const { getOrderById, createOrder, getAllOrders, getStatus, updateStatus } = require('../controllers/order')

//params
router.param('/userId', getUserById)
router.param('/orderId', getOrderById)

//actual routes

//create
router.post('/order/create/:userId', isSignedin, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder)

//read
router.get('/order/all/:userId', isSignedin, isAuthenticated, isAdmin, getAllOrders)

//status of order
router.get('/order/status/:userId', isSignedin, isAuthenticated, isAdmin, getStatus)
router.put('/order/:orderId/status/:userId', isSignedin, isAuthenticated, isAdmin, updateStatus)



module.exports = router