import { API } from '../../backend'
//category calls

//create category
export const createCategory = async (userId, token, categoryName) => {
    try {
        const response = await fetch(`${API}/category/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(categoryName)
        })
        return response.json()
    }
    catch (error) {
        console.log(error)
    }
}

//get all categories
export const getAllCategories = async () => {
    try {
        const response = await fetch(`${API}/categories`, {
            method: "GET"
        })
        return response.json()
    }
    catch (error) {
        return console.log(error)
    }
}

//update category
export const updateCategory = async (categoryId, userId, token, category) => {
    try {
        const response = await fetch(`${API}/category/${categoryId}/${userId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        })
        return response.json()
    }
    catch (error) {
        return console.log(error)
    }
}

//delete category
export const deleteCategory = async (categoryId, userId, token) => {
    try {
        const response = await fetch(`${API}/category/${categoryId}/${userId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.json()
    }
    catch (error) {
        return console.log(error)
    }
}

//product calls

//create product
export const createProduct = async (userId, token, product) => {
    try {
        const response = await fetch(`${API}/product/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: product
        })
        return response.json()
    }
    catch (error) {
        return console.log(error)
    }
}

//get all products
export const getProducts = async () => {
    try {
        const response = await fetch(`${API}/products`, {
            method: "GET"
        })
        return response.json()
    }
    catch (error) {
        return console.log(error)
    }
}

//delete product
export const deleteProduct = async (productId, userId, token) => {
    try {
        const response = await fetch(`${API}/product/${productId}/${userId}`, {
            method: "DELETE",
            headers: {
                Accept: "application form",
                Authorization: `Bearer ${token}`
            }
        })
        return response.json()
    }
    catch (error) {
        return console.log(error)
    }
}

//get a product
export const getProduct = async (productId) => {
    try {
        const response = await fetch(`${API}/product/${productId}`, {
            method: "GET",
        })
        return response.json()
    }
    catch (error) {
        return console.log(error)
    }
}

//update a product
export const updateProduct = async (productId, userId, token, product) => {
    try {
        const response = await fetch(`${API}/product/${productId}/${userId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: product
        })
        return response.json()
    }
    catch (error) {
        return console.log(error)
    }
}