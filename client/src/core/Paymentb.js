import React, { useState, useEffect } from 'react'
import { emptyCart } from './helper/carthelper'
import { Link } from 'react-router-dom'
import { getmeToken, processPayment } from './helper/paymentbhelper'
import { createOrder } from './helper/orderhelper'
import { isAuthenticated } from '../auth/helper'
import DropIn from 'braintree-web-drop-in-react'

const Paymentb = ({ products, setReload = f => f, reload = undefined }) => {
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    })

    const [order, setOrder] = useState({
        status: '',
        transaction_id: '',
        amount: '',
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getAmount = () => {
        let amount = 0
        products.map(p => {
            amount = amount + p.price * p.count
        })
        return amount
    }

    const getToken = (userId, token) => {
        if (isAuthenticated()) {
            getmeToken(userId, token)
                .then(data => {
                    if (data.error) {
                        setInfo({ ...info, error: data.error })
                    } else {
                        const clientToken = data.clientToken
                        setInfo({ clientToken })
                    }
                })
                .catch(error => console.log(error))
        }
    }

    const signInMsg = () => {
        if (!isAuthenticated()) {
            return (
                <h3><Link to="/signin" >Signin</Link></h3>
            )
        }
    }

    const addItemsMsg = () => {
        if (products.length === 0) {
            return (
                <h3><Link to="/">Add items to cart</Link></h3>
            )
        }
    }

    const showbtdropIn = () => {
        if (info.clientToken !== null && products.length > 0) {
            return (
                <div>
                    <DropIn
                        options={{ authorization: info.clientToken }}
                        onInstance={(instance) => (info.instance = instance)}
                    />
                    <button className="btn btn-success btn-block" onClick={onPurchase}>Buy</button>
                </div>
            )
        }
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const onPurchase = () => {
        setInfo({ loading: true })
        let nonce;
        let getNonce = info.instance
            .requestPaymentMethod()
            .then(data => {
                nonce = data.nonce
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getAmount()
                }
                processPayment(userId, token, paymentData)
                    .then(response => {
                        setInfo({ ...info, success: response.success, loading: false })
                        console.log("PAYMENT SUCCESS", response)
                        const orderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount
                        }

                        console.log(orderData)

                        createOrder(userId, token, orderData)
                            .then(data => {
                                if (data.error) {
                                    console.log(data.error)
                                }
                                else {
                                    setOrder({ ...order, status: data.status, transaction_id: data.transaction_id, amount: data.amount })
                                    emptyCart(() => {
                                        console.log("Cart emptied")
                                    })
                                    setReload(!reload)
                                }
                            })
                            .catch(error => console.log("Order can not be placed", error))

                    })
                    .catch(error => {
                        console.log("PAYMENT failed")
                        setInfo({ loading: false, success: false })
                    })
            })
    }

    const orderDetails = () => {
        if (order.status) {
            return (
                <div>
                    <div className="text-bold">Order details:</div>
                    <div className="text">Status: {order.status}</div>
                    <div className="text">Transaction ID: {order.transaction_id}</div>
                    <div className="text">Total amount: {order.amount}</div>
                </div>
            )
        }
    }

    return (
        <div>
            <h3>Total amount : {getAmount()}</h3>
            {showbtdropIn()}
            {signInMsg()}
            {addItemsMsg()}
            {orderDetails()}
        </div>
    )
}

export default Paymentb
