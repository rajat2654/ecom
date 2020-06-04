import React, { useState, useEffect } from 'react'
import Imagehelper from './helper/Imagehelper'
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/carthelper';

const Card = ({
    product,
    addToCart = true,
    removeFromCart = false,
    reload = undefined,
    setReload = f => f
}) => {

    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)

    const cardTitle = product ? product.name : "A photo from pixel"
    const cardDescription = product ? product.description : "Default description"
    const cardPrice = product ? product.price : "$$"

    const addProductToCart = () => {
        addItemToCart(product, () => setRedirect(true))
    }

    const getRedirect = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = (addToCart) => {
        return (
            addToCart && (
                <button
                    onClick={addProductToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                    Add to Cart
                </button>
            )
        )
    }

    const showRemoveFromCart = (removeFromCart) => {
        return (
            removeFromCart && (
                <button
                    onClick={() => {
                        removeItemFromCart(product._id)
                        setReload(!reload)
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Remove from cart
                </button>
            )
        )
    }

    return (
        <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cardTitle}</div>
            <div className="card-body">
                <div className="rounded border border-success p-2">
                    <Imagehelper product={product} />
                </div>
                <p className="lead bg-success font-weight-normal text-wrap">
                    {cardDescription}
                </p>
                <p className="btn btn-success rounded  btn-sm px-4">Rs {cardPrice}</p>
                <div className="row">
                    <div className="col-12">
                        {getRedirect(redirect)}
                        {showAddToCart(addToCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCart(removeFromCart)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card
