import checkTokenExpirationMiddleware from "../../user/helper/checkexp"

export const createOrder = async (userId, token, orderData) => {
    try {
        await checkTokenExpirationMiddleware(() => {
            throw new Error("Signin again")
        })
        const response = await fetch(`/api/order/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ order: orderData })
        })
        return response.json()
    }
    catch (error) {
        return console.log(error)
    }
}