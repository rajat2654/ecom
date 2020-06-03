const User = require('../models/user')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

const signup = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).send({
            error: errors.array()[0].msg,
            param: errors.array()[0].param
        })
    }

    const user = new User(req.body)
    user.save((error, user) => {
        if (error) {
            return res.status(400).send({ error })
        }

        // const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '1 day' })
        // res.cookie('token', token).status(201).send({ user, token, msg: "User data was saved" })
    })

}

const signin = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).send({
            error: errors.array()[0].msg,
            param: errors.array()[0].param
        })
    }

    const { email, password } = req.body

    User.findOne({ email }, (error, user) => {
        if (error) {
            return res.status(400).send({ error })
        }

        if (!user) {
            return res.status(404).send({
                error: "User not found"
            })
        }

        if (!user.authenticate(password)) {
            return res.status(401).send({
                error: "Email and password do not match"
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '1 day' })

        res.cookie('token', token).send({ user, token })
    })
}

const signout = (req, res) => {
    res.clearCookies
    res.send({
        message: "Signed out"
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
        return res.status(403).send({ error: "Access denied" })
    }
    next()
}

const isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).send({ error: "You are not am admin, access denied" })
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