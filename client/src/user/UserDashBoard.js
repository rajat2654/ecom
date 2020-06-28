import React from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'

const UserDashBoard = () => {
    return (
        <Base title="User Dashboard">
            <h1>This is User Dashboard page</h1>
            <h3>
                <Link to="/myprofile">My profile</Link><br />
                <Link to="/myorders">My orders</Link>
            </h3>
        </Base>
    )
}

export default UserDashBoard
