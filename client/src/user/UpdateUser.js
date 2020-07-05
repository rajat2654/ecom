import React from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { isAuthenticated, updateUser, authenticate } from '../auth/helper'
import { useState } from 'react'

const UpdateUser = () => {
    const { user, token } = isAuthenticated()

    const [userdata, setUserdata] = useState({
        ...user,
        error: "",
        success: ""
    })

    const {
        firstName,
        lastName,
        email,
        error,
        success
    } = userdata

    const handleChange = name => event => {
        const value = event.target.value
        setUserdata({ ...userdata, [name]: value })
    }

    const onSubmit = (event) => {
        event.preventDefault()

        updateUser(user._id, { firstName, lastName, email }, token)
            .then(data => {
                if (data.error) {
                    setUserdata({ ...userdata, error: data.error })
                } else {
                    authenticate(data, () => {
                        setUserdata({
                            ...userdata,
                            firstName: "",
                            lastName: "",
                            email: "",
                            success: true
                        })
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
                    onChange={handleChange("firstName")}
                    name="photo"
                    className="form-control"
                    placeholder="First name"
                    value={firstName}
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
