const User = require('../models/user')
const { Order } = require('../models/order')

const getUserById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id)
        req.profile = user
        next()
    } catch (error) {
        return res.status(404).json({ error_details, error, error: "User not found" })
    }
}

const getUser = (req, res) => {
    return res.json(req.profile)
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        return res.status(400).json({ error_details, error, error: "No users found" })
    }
}

const updateUser = (req, res) => {
    User.findByIdAndUpdate({ _id: req.profile._id }, req.body, { new: true }).exec((error, user) => {
        if (error) {
            return res.json({ error_details: error, error: "Unable to update user details" })
        }

        res.json(user)
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