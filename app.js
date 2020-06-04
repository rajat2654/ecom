require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

//My routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')
const paymentBRoutes = require('./routes/payment')

//Connect to database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("DB CONNECTED")
}).catch(error => console.log("CAN'T CONNECT TO DATABASE"))

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', orderRoutes)
app.use('/api', paymentBRoutes)

//Serve static files
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})