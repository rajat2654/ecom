import React from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'

const UserDashBoard = () => {
    return (
        <Base title="UserDashBoard page">
            <h1>This is UserDashBoard page</h1>
            <h3>
                <Link to="/user/profile">Profile</Link>
            </h3>
        </Base>
    )
}

export default UserDashBoard
