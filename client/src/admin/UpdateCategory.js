import React, { useState } from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper'
import { updateCategory } from './helper/adminapicall'
import { Link } from 'react-router-dom'

const UpdateCategory = ({ match }) => {

    const [name, setName] = useState(match.params.categoryName)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const { user, token } = isAuthenticated()

    const goBack = () => {
        return (
            <div className="mt-5">
                <Link className="btn btn-sm btn-info mb-3" to="/admin/categories">Back</Link>
            </div>
        )
    }

    const handleChange = event => {
        setError("")
        setName(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setError("")
        setSuccess(false)

        // backend request fired
        updateCategory(match.params.categoryId, user._id, token, { name })
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                    setError(true)
                } else {
                    setError("")
                    setSuccess(true)
                    setName("")
                }
            })
    }

    const successMessage = () => {
        if (success) {
            return (
                <h4 className="text-success" >Category updated</h4>
            )
        }
    }

    const warningMessage = () => {
        if (error) {
            return (
                <h4 className="text-danger" >Failed to update category</h4>
            )
        }
    }

    const myCategoryForm = () => {
        return (
            <form>
                <div className="form-group">
                    <p className="lead">Enter category name</p>
                    <input type="text"
                        className="form-control my-3"
                        onChange={handleChange}
                        value={name}
                        autoFocus
                        required
                    />
                    <button
                        className="btn btn-outline-info"
                        onClick={onSubmit}
                    >Update category</button>
                </div>
            </form>
        )
    }

    return (
        <Base title="Update categories"
            desc="Update category from here"
            className="container bg-info p-4"
        >
            <div className="row bg-white rounded">
                <dib className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </dib>
            </div>
        </Base>
    )
}

export default UpdateCategory
