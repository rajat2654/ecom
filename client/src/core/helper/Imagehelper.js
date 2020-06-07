import React from 'react'
import img from '../../myt.jpg'

const Imagehelper = ({ product }) => {

    const imageURL = product.photo
        ? `/api/product/photo/${product._id}`
        : img

    return (
        <img
            src={imageURL}
            style={{ maxHeight: "100%", maxWidth: "100%" }
            }
            className="mb-3 rounded"
        />
    )
}

export default Imagehelper
