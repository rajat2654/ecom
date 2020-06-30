const braintree = require("braintree");

const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BT_merchantId,
    publicKey: process.env.BT_publicKey,
    privateKey: process.env.BT_privateKey
});

const getToken = (req, res) => {
    gateway.clientToken.generate({}, function (error, response) {
        if (error) {
            return res.status(500).json({ error: "Client token cannot be generated" })
        }
        res.json(response)
    });
}

const processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce

    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, function (error, result) {
        if (error) {
            return res.status(500).json({ error: "Payment failed" })
        }
        res.json(result)
    });
}



module.exports = {
    getToken,
    processPayment
}