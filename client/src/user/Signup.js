import React, { useState } from 'react'
import Base from '../core/Base'
import { Link, Redirect } from 'react-router-dom'
import { signup, isAuthenticated } from '../auth/helper/index'


const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const { name, email, password, error, success } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const performRedirect = () => {
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: false })
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    })
                }
            })
            .catch(error => {
                setValues({ ...values, error: error, success: false })
                console.log("Error in signup")
            })
    }

    const signupForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-white">Name</label>
                            <input
                                className="form-control"
                                onChange={handleChange("name")}
                                type="text"
                                value={name}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-white">Email</label>
                            <input
                                className="form-control"
                                onChange={handleChange("email")}
                                type="email"
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-white">Password</label>
                            <input
                                className="form-control"
                                onChange={handleChange("password")}
                                type="password"
                                value={password}
                            />
                        </div>
                        <button onClick={onSubmit} className="btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    const successMessage = () => {
        return (
            <div
                className="alert alert-success"
                style={{ display: success ? "" : "none" }}
            >
                New account was created successfully.
                Please <Link to="/signin">Login here</Link>
            </div>)
    }

    const errorMessage = () => {
        if (error) {
            return (
                <div
                    className="alert alert-danger"
                >
                    {JSON.stringify(error)}
                </div>)
        }
    }

    return (
        <Base title="Signup page" desc="A page for user to signup!">
            {successMessage()}
            {errorMessage()}
            {signupForm()}
            {performRedirect()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signup