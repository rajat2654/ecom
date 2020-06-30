const Category = require('../models/category')

const createCategory = async (req, res) => {
    const category = new Category(req.body)
    try {
        await category.save()
        res.json(category)
    } catch (error) {
        res.status(400).json({ error: "Unable to create category" })
    }
}

const getCategoryById = async (req, res, next, id) => {
    try {
        const category = await Category.findById(id)
        req.category = category
        next()
    } catch (error) {
        res.status(404).json({ error: "Category not found" })
    }
}

const getCategory = (req, res) => {
    res.json(req.category)
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (error) {
        res.status(404).json({ error: "Categories not found" })
    }
}

const updateCategory = async (req, res) => {
    const category = req.category
    category.name = req.body.name

    try {
        await category.save()
        res.json(category)
    } catch (error) {
        res.status(400).json({ error: "Unable to update category" })
    }
}

const removeCategory = async (req, res) => {
    const category = req.category
    try {
        await category.remove()
        res.json(category)
    } catch (error) {
        res.status(400).json({ error: "Unable to delete category" })
    }
}



module.exports = {
    getCategoryById,
    createCategory,
    getCategory,
    getAllCategories,
    updateCategory,
    removeCategory
}