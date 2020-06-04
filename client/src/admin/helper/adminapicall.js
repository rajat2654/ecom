//category calls

//create category
export const createCategory = (userId, token, categoryName) => {
    return fetch(`/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(categoryName)
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}

//get all categories
export const getAllCategories = () => {
    return fetch(`/categories`, {
        method: "GET"
    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}

//update category
export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`/category/${categoryId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json()
        })
        .catch(error => console.log(error))
}

//delete category
export const deleteCategory = (categoryId, userId, token) => {
    return fetch(`/category/${categoryId}/${userId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(error => console.log(error))
}

//product calls

//create product
export const createProduct = (userId, token, product) => {
    return fetch(`/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}

//get all products
export const getProducts = () => {
    return fetch(`/products`, {
        method: "GET"
    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}

//delete product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application form",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    })
        .catch(error => console.log(error))
}

//get a product
export const getProduct = (productId) => {
    return fetch(`/product/${productId}`, {
        method: "GET",
    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}

//update a product
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}