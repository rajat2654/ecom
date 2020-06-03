const express = require('express')
const { isSignedin, isAuthenticated } = require('../controllers/auth')
const { getUserById } = require('../controllers/user')
const { getToken, processPayment } = require('../controllers/payment')

const router = express.Router()

router.param('userId', getUserById)

router.get('/payment/gettoken/:userId', isSignedin, isAuthenticated, getToken)

router.post('/payment/braintree/:userId', isSignedin, isAuthenticated, processPayment)



module.exports = router