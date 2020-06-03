const express = require('express')
const { getUserById, getUser, getAllUsers, updateUser, userPurchaseList } = require('../controllers/user')
const { isSignedin, isAuthenticated, isAdmin } = require('../controllers/auth')

const router = express.Router()

router.param('userId', getUserById)

router.get('/user/:userId', isSignedin, isAuthenticated, getUser)
router.put('/user/:userId', isSignedin, isAuthenticated, updateUser)
router.get('/user/orders/:userId', isSignedin, isAuthenticated, userPurchaseList)

router.get('/allusers', getAllUsers)



module.exports = router