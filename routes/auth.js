const express = require('express')
const { signout, signup, signin, isSignedin } = require('../controllers/auth')
const { check, validationResult } = require('express-validator')

const router = express.Router()

router.get('/signout', signout)

router.post('/signup', [
    check('email').isEmail().withMessage("Email is not valid"),
    check('password').blacklist(" ").isLength({ min: 6 }).withMessage("Weak password")
], signup)

router.post('/signin', [
    check('email').isEmail().withMessage("Email is not valid"),
    check('password').isLength({ min: 6 }).withMessage("Invalid password")
], signin)

router.get('/me', isSignedin, (req, res) => {
    res.send(req.auth)
})



module.exports = router