const { Order, ProductCart } = require('../models/order')

const getOrderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        .exec((error, order) => {
            if (error) {
                return res.status(400).send({ error })
            }

            req.order = order
            next()
        })
}

const createOrder = (req, res) => {
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    order.save((error, order) => {
        if (error) {
            return res.status(400).send({ error })
        }

        res.send(order)
    })
}

const getAllOrders = (req, res) => {
    Order.find()
        .populate('user', '_id name')
        .exec((error, orders) => {
            if (error) {
                return res.status(400).send({ error })
            }

            res.send(orders)
        })
}

const getStatus = (req, res) => {
    res.send(Order.schema.path('status').enumValue)
}

const updateStatus = (req, res) => {
    Order.update(
        { _id: req.body.orderId },
        { $set: { status: req.body.status } },
        (error, order) => {
            if (error) {
                return res.status(400).send({ error })
            }

            res.send(order)
        }
    )
}



module.exports = {
    getOrderById,
    createOrder,
    getAllOrders,
    getStatus,
    updateStatus
}