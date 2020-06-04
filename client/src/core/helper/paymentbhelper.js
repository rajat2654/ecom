export const getmeToken = (userId, token) => {
    return fetch(`/payment/gettoken/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    })
        .catch(error => console.log(error))
}

export const processPayment = (userId, token, paymentInfo) => {
    return fetch(`/payment/braintree/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentInfo)
    }).then(response => {
        return response.json()
    }).catch(error => console.log(error))
}