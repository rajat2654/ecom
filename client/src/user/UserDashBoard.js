import React from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'

const UserDashBoard = () => {
    return (
        <Base title="UserDashBoard page">
            <h1>This is UserDashBoard page</h1>
            <h3>
                <Link to="/myprofile">Profile</Link>
            </h3>
        </Base>
    )
}

export default UserDashBoard
