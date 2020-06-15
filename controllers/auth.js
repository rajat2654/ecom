const User = require('../models/user')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

const signup = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param
        })
    }

    const user = new User(req.body)

    try {
        const old = await User.findOne({ email: user.email })
        console.log(old)
        if (old.length) {
            console.log(old)
            return res.status(400).json({ error_details: "", error: "Email already taken" })
        }
        await user.save()

        // const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '1 day' })
        // res.cookie('token', token).status(201).json({ user, token, msg: "User data was saved" })

        res.status(201).json({
            name: user.name,
            email: user.email,
            id: user._id
        })
    } catch (error) {
        res.status(400).json({ error_details: error, error: "Unable to signup" })
    }
}

const signin = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param,
            error_details: errors
        })
    }

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) {
            throw new Error("User not found")
        }

        if (!user.authenticate(password)) {
            throw new Error("Invalid password")
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "1d" })

        res.cookie('token', token).json({ user, token })

    } catch (error) {
        res.status(400).json({ error_details: error, error: "Bad credentials" })
    }
}

const signout = (req, res) => {
    res.clearCookie('token')
    res.json({
        message: "Signed out successfully"
    })
}

// protected routes
const isSignedin = expressJwt({
    secret: process.env.SECRET,
    userProperty: 'auth'
})

// custom middlewares
const isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if (!checker) {
        return res.status(403).json({ error: "Access denied" })
    }
    next()
}

const isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({ error: "You are not am admin, access denied" })
    }
    next()
}



module.exports = {
    signup,
    signin,
    signout,
    isSignedin,
    isAuthenticated,
    isAdmin
}