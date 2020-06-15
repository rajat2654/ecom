import React from 'react'
import Base from '../core/Base'
import { Link, Redirect } from 'react-router-dom'
import { isAuthenticated, updateUser } from '../auth/helper'
import { useState } from 'react'

const UpdateUser = () => {
    const { user, token } = isAuthenticated()

    const [userdata, setUserdata] = useState({
        ...user,
        error: "",
        success: "",
        formData: new FormData()
    })

    const {
        name,
        lastName,
        email,
        userinfo,
        formData,
        error,
        success
    } = userdata

    const handleChange = name => event => {
        const value = event.target.value
        formData.set(name, value)
        setUserdata({ ...userdata, [name]: value })
    }

    const onSubmit = (event) => {
        event.preventDefault()
        updateUser(user._id, formData, token)
            .then(data => {
                if (data.error) {
                    setUserdata({ ...userdata, error })
                } else {
                    setUserdata({
                        ...userdata,
                        name: "",
                        lastName: "",
                        email: "",
                        userinfo: "",
                        formData: new FormData(),
                        success: true
                    })
                }
            })
            .catch(error => setUserdata({ ...userdata, error }))
    }

    const goBack = () => {
        return (
            <div className="mt-5">
                <Link className="btn btn-md btn-dark mb-3" to="/myprofile">Back</Link>
            </div>
        )
    }

    const successMessage = () => {
        return (
            <div className="alert alert-success mt-3"
                style={{ display: success ? "" : "none" }}
            >
                <h4>Profile updated successfully</h4>
            </div>
        )
    }

    const warningMessage = () => {
        return (
            <div className="alert alert-danger mt-3"
                style={{ display: error ? "" : "none" }}
            >
                <h4>Updating profile failed</h4>
            </div>
        )
    }

    const updateUserForm = () => (
        <form >
            <div className="form-group">
                <input
                    onChange={handleChange("name")}
                    name="photo"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    required
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("lastName")}
                    name="lname"
                    className="form-control"
                    placeholder="Last name"
                    value={lastName}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    required
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("userinfo")}
                    name="userinfo"
                    className="form-control"
                    placeholder="User info"
                    value={userinfo}
                />
            </div>

            <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
                Update details
            </button>
        </form>
    )

    return (
        <Base
            title="Update profile"
            className="container bg-info p-4"
        >
            <div className="bg-dark p-4 rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {updateUserForm()}
                </div>
            </div>
            {goBack()}
        </Base>
    )
}

export default UpdateUser
