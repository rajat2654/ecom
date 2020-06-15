import checkTokenExpirationMiddleware from "../../user/helper/checkexp"

export const getmeToken = async (userId, token) => {
    try {
        await checkTokenExpirationMiddleware(() => {
            throw new Error("Signin again")
        })
        const response = await fetch(`/api/payment/gettoken/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        return response.json()
    }
    catch (error) {
        return console.log(error)
    }
}

export const processPayment = async (userId, token, paymentInfo) => {
    try {
        await checkTokenExpirationMiddleware(() => {
            throw new Error("Signin again")
        })
        const response = await fetch(`/api/payment/braintree/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(paymentInfo)
        })
        return response.json()
    }
    catch (error) {
        return console.log(error)
    }
}