const User = require('../models/user')
const { Order } = require('../models/order')

const getUserById = (req, res, next, id) => {
    User.findById(id).exec((error, user) => {
        if (error || !user) {
            return res.status(400).send({ error: "No user found" })
        }

        req.profile = user
        next()
    })
}

const getUser = (req, res) => {
    return res.send(req.profile)
}

const getAllUsers = (req, res) => {
    User.find((error, users) => {
        if (error) {
            return res.send({ error })
        }

        res.send(users)
    })
}

const updateUser = (req, res) => {
    User.findByIdAndUpdate({ _id: req.profile._id }, { name: "RS" }, { new: true }).exec((error, user) => {
        if (error) {
            return res.send({ error })
        }

        res.send(user)
    })
}

const userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id }).populate('user', '_id name').exec((error, order) => {
        if (error) {
            return res.send({ error })
        }

        res.send(order)
    })
}

const pushOrderInPurchaseList = (req, res, next) => {
    let purchases = []
    req.body.order.products.forEach((product) => {
        const { } = product
        purchases.push({
            _id,
            name,
            description,
            category,
            quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    })

    // Storing in DB
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { purchases } },
        { new: true },
        (error, purchases) => {
            if (error) {
                return res.send((error))
            }
            next()
        }
    )

}



module.exports = {
    getUserById,
    getUser,
    getAllUsers,
    updateUser,
    userPurchaseList,
    pushOrderInPurchaseList
}