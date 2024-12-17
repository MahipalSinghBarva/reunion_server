const mongoose = require("mongoose")
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("DB connected succussfully");
    } catch (error) {
        console.error("Failed to connected DB", error)
        process.exit(1)
    }
}

module.exports = connectDB