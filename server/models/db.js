// ==========
// REQUIRE
// ==========
const mongoose = require("mongoose")
const dotenv = require("dotenv")
// Read .env file
dotenv.config()

// Connect Mongoose
let db = process.env.DB
// let db = 'mongodb://localhost:27017/myapp'

module.exports.connectDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })

    console.log("MONGO CONNECTED")
  } catch (e) {
    console.log("MONGO CONNECTION ERROR :(")
    console.log(e)
  }
}
