const express = require('express')
const { isSignedin, isAuthenticated, isAdmin } = require('../controllers/auth')
const { getUserById } = require('../controllers/user')
const { getCategoryById, createCategory, getCategory, getAllCategories, updateCategory, removeCategory } = require('../controllers/category')

const router = express.Router()

// params
router.param('userId', getUserById)
router.param('categoryId', getCategoryById)

//actual routes

//create
router.post('/category/create/:userId', isSignedin, isAuthenticated, isAdmin, createCategory)

//read
router.get('/category/:categoryId', getCategory)
router.get('/categories', getAllCategories)

//update
router.put('/category/:categoryId/:userId', isSignedin, isAuthenticated, isAdmin, updateCategory)

//delete
router.delete('/category/:categoryId/:userId', isSignedin, isAuthenticated, isAdmin, removeCategory)




module.exports = router