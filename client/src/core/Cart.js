import React, { useState, useEffect } from 'react'
import '../styles.css'
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/carthelper'
import Paymentb from './Paymentb'

const Cart = () => {
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])

    const loadAllProducts = () => {
        return (
            <div>
                <h2>This section is to load products</h2>
                <h2>{products.length} items in cart</h2>
                {products.map((product, index) => (
                    <Card
                        key={index}
                        product={product}
                        addToCart={false}
                        removeFromCart={true}
                        setReload={setReload}
                        reload={reload}
                    />
                ))}
            </div>
        )
    }

    const loadCheckout = () => {
        return (
            <Paymentb products={products} setReload={setReload} />
        )
    }

    return (
        <Base title="Cart" desc="Ready to checkout">
            <div className="row text-center">
                <div className="col-6">{loadAllProducts()}</div>
                <div className="col-6">{loadCheckout()}</div>
            </div>
        </Base>
    )
}


export default Cart