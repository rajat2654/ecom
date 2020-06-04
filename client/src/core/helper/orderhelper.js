export const createOrder = (userId, token, orderData) => {
    return fetch(`/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: orderData })
    }).then(response => response.json())
        .catch(error => console.log(error))
}