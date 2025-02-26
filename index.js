const envFilePath = `${__dirname}/.env`;
require("dotenv").config({ path: envFilePath });

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const requestRoutes = require('./routes/requestRoutes')
const mailRoutes = require('./routes/mail')

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err))

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/requests', requestRoutes)
app.use('/api/mails', mailRoutes)

app.listen(5002, () => {
    console.log('Server is running...')
})