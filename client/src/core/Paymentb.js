import React, { useState, useEffect } from 'react'
import { loadCart, emptyCart } from './helper/carthelper'
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

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        if (isAuthenticated()) {
            console.log(products.length, "GETTING TOKEN")
            getmeToken(userId, token)
                .then(info => {
                    console.log("INFO", info)

                    if (info.error) {
                        setInfo({ ...info, error: info.error })
                    } else {
                        const clientToken = info.clientToken
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
                        createOrder(userId, token, orderData)

                        emptyCart(() => {
                            console.log("Cart emptied")
                        })

                        setReload(!reload)

                    })
                    .catch(error => {
                        console.log("PAYMENT failed")
                        setInfo({ loading: false, success: false })
                    })
            })
    }

    const getAmount = () => {
        let amount = 0
        products.map(p => {
            amount = amount + p.price
        })
        return amount
    }

    return (
        <div>
            <h3>Total amount : {getAmount()}</h3>
            {showbtdropIn()}
            {signInMsg()}
            {addItemsMsg()}
        </div>
    )
}

export default Paymentb
