import React from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper'
import { Link } from 'react-router-dom'

const Profile = () => {
    const { user: { firstName, lastName, email } } = isAuthenticated()

    const userDetails = () => {
        return (
            <div className="card mb-4">
                <h4 className="card-header bg-dark text-white">User info</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">First name:</span>{firstName}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Last name:</span>{lastName}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Email:</span>{email}
                    </li>
                </ul>
            </div>
        )
    }

    const goBack = () => {
        return (
            <div className="mt-5">
                <Link className="btn btn-sm btn-info mb-3" to="/user/dashboard">Back</Link>
            </div>
        )
    }

    return (
        <Base
            title="Profile page"
            desc="Manage your profile from here"
            className="container bg-info p-4"
        >
            <div className="row">
                <div className="col">
                    {userDetails()}
                    <div className="mt-5">
                        <Link className="btn btn-sm btn-success mb-3" to="/myprofile/update">Update details</Link>
                    </div>
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default Profile
