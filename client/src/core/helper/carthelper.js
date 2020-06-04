export const loadCart = () => {
    let cart = []
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
    }
    return cart
}

export const addItemToCart = (item, next) => {
    let cart = []
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({
            ...item,
            count: 1
        })
        localStorage.setItem("cart", JSON.stringify(cart))
        next()
    }
}

export const removeItemFromCart = (productId) => {
    let cart = []
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart = cart.filter((product) => product._id !== productId)
        localStorage.setItem("cart", JSON.stringify(cart))
    }
}

export const emptyCart = (next) => {
    if (typeof window !== undefined) {
        localStorage.removeItem("cart")

        let cart = []
        localStorage.setItem("cart", JSON.stringify(cart))

        next()
    }
}