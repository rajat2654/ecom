import React, { useState, useEffect } from 'react'
import '../styles.css'
import Base from './Base'
import Card from './Card'
import { getProducts } from '../admin/helper/adminapicall'

export default function Home() {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const preload = () => {
        getProducts()
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setProducts(data)
                }
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        preload()
    }, [])

    return (
        <Base title="Home">
            <div className="row text-center">
                <h1 className="text-white">All products</h1>
                <div className="row">
                    {products.map((product, index) => {
                        return (
                            <div key={index} className="col-4 mb-4">
                                <Card product={product} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base>
    )
}
