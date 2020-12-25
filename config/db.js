const mongoose = require("mongoose")
const config = require("config")

const db = config.get("mongoUri")

const connectDb = async () => {
    try {
        await mongoose.connect(db, {useCreateIndex: true, useNewUrlParser:true, useUnifiedTopology :true})
        console.log("connected to database")
    } catch (error) {
        console.error(error.message)

        //terminate the application
        procces.exit(1)
    }
}

module.exports = connectDb