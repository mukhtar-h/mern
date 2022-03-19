const mongoose = require('mongoose')

// connecting to mongodb database
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MANGO_URI)

        console.log(`MangoDB connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB