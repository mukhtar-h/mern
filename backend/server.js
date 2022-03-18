const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const { errorHandler } = require('./middlewares/errorsMiddleware')

// connection to Database
connectDB()

const port = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/goals/', require('./routes/goalRoutes'))
app.use('/api/users/', require('./routes/userRoutes'))

// ErrorHandler middleware should be used after routes
app.use(errorHandler)

app.listen(port, () => console.log(`server started: running on port: ${port}`))