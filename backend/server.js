const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middlewares/errorsMiddleware')

const port = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/goals/', require('./routes/goalRoutes'))
// ErrorHandler middleware should be used after routes
app.use(errorHandler)

app.listen(port, () => console.log(`server started: running on port: ${port}`))