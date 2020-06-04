import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import { Link, Redirect } from 'react-router-dom'
import { getAllCategories, getProduct, updateProduct } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper'


const UpdateProduct = ({ match }) => {

    const { user, token } = isAuthenticated()

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        catName: "",
        loading: false,
        error: "",
        updatedProduct: "",
        getRedirect: false,
        formData: ""
    })

    const {
        name,
        description,
        price,
        stock,
        photo,
        categories,
        category,
        catName,
        loading,
        error,
        updatedProduct,
        getRedirect,
        formData
    } = values

    const preLoad = (productId) => {
        getProduct(productId)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    preloadCategories()
                    setValues({
                        ...values,
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        stock: data.stock,
                        photo: data.photo,
                        category: data.category._id,
                        catName: data.category.name,
                        formData: new FormData(),
                    })
                }
            })
            .catch(error => {
                setValues({ ...values, error })
            })
    }

    const preloadCategories = () => {
        getAllCategories()
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        categories: data,
                        formData: new FormData()
                    })
                }
            })
    }

    useEffect(() => {
        preLoad(match.params.productId)
    }, [])

    const onSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: "", loading: true })

        updateProduct(match.params.productId, user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        price: "",
                        photo: "",
                        stock: "",
                        loading: false,
                        updatedProduct: data.name,
                        getRedirect: true
                    })
                }
            })
            .catch(error => setValues({ ...values, error }))
    }

    const redirect = () => {
        if (getRedirect) {
            alert(`${updatedProduct} updated successfully`)
            return (
                <Redirect to="/admin/dashboard" />
            )
        }
    }

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value })
    }

    const successMessage = () => {
        return (
            <div className="alert alert-success mt-3"
                style={{ display: updatedProduct ? "" : "none" }}
            >
                <h4>{updatedProduct} updated successfully</h4>
            </div>
        )
    }

    const warningMessage = () => {
        return (
            <div className="alert alert-danger mt-3"
                style={{ display: error ? "" : "none" }}
            >
                <h4>Updating product failed</h4>
            </div>
        )
    }

    const createProductForm = () => (
        <form >
            <span>Post photo</span>
            <div className="form-group">
                <label className="btn btn-block btn-success">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("name")}
                    name="photo"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group">
                <textarea
                    onChange={handleChange("description")}
                    name="photo"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                />
            </div>
            <div className="form-group">
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                    placeholder="Category"
                >
                    <option value={category}>{catName}</option>
                    {categories &&
                        categories.map((category, index) => (
                            <option key={index} value={category._id}>{category.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("stock")}
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    value={stock}
                />
            </div>

            <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
                Update Product
            </button>
        </form>
    )

    const goBack = () => {
        return (
            <div className="mt-5">
                <Link className="btn btn-md btn-dark mb-3" to="/admin/products">Back</Link>
            </div>
        )
    }

    return (
        <Base
            title="Update product here"
            desc="Welcome to update product section"
            className="container bg-info p-4"
        >
            <h1 className="text-white">Update any product from here</h1>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {createProductForm()}
                    {redirect()}
                </div>
            </div>
            {goBack()}
        </Base>
    )
}

export default UpdateProduct
