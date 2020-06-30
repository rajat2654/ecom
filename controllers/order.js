const { Order, ProductCart } = require('../models/order')

const getOrderById = async (req, res, next, id) => {
    try {
        const order = await Order.findById(id)
        await order.populate('products.product', 'name price').execPopulate()
        req.order = order
        next()
    } catch (error) {
        res.status(404).json({ error: "Order not found" })
    }
}

const createOrder = async (req, res) => {
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    try {
        await order.save()
        res.json(order)
    } catch (error) {
        res.status(400).json({ error: "Unable to create order" })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        await orders.populate('user', '_id name')
        res.json(orders)
    } catch (error) {
        res.status(400).json({ error: "Orders not found" })
    }
}

const getStatus = (req, res) => {
    res.json(Order.schema.path('status').enumValue)
}

const updateStatus = async (req, res) => {
    try {
        const order = await Order.update(
            { _id: req.body.orderId },
            { $set: { status: req.body.status } }
        )
        res.json(order)
    } catch (error) {
        res.status(400).json({ error: "Unable to update order" })
    }
}



module.exports = {
    getOrderById,
    createOrder,
    getAllOrders,
    getStatus,
    updateStatus
}