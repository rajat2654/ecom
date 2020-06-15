import React from 'react'
import img from '../../myt.jpg'

const Imagehelper = ({ product }) => {

    const imageURL = product.photo
        ? `/api/product/photo/${product._id}`
        : img

    return (
        <img
            src={imageURL}
            width="400" height="225"
            className="mb-3 rounded"
        />
    )
}

export default Imagehelper
