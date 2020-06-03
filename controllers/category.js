const Category = require('../models/category')

const getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((error, category) => {
        if (error) {
            return res.status(400).send({ error })
        }

        req.category = category
        next()
    })
}

const createCategory = (req, res) => {
    const category = new Category(req.body)
    category.save((error, category) => {
        if (error) {
            return res.status(400).send({ error })
        }

        res.send(category)
    })
}

const getCategory = (req, res) => {
    res.send(req.category)
}

const getAllCategories = (req, res) => {
    Category.find((error, categories) => {
        if (error) {
            return res.status(400).send({ error })
        }

        res.send(categories)
    })
}

const updateCategory = (req, res) => {
    const category = req.category
    category.name = req.body.name

    category.save((error, updatedCategory) => {
        if (error) {
            return res.status(400).send({ error })
        }

        res.send(updatedCategory)
    })
}

const removeCategory = (req, res) => {
    const category = req.category
    category.remove((error, category) => {
        if (error) {
            return res.status(400).send({ error })
        }

        res.send(category)
    })
}



module.exports = {
    getCategoryById,
    createCategory,
    getCategory,
    getAllCategories,
    updateCategory,
    removeCategory
}