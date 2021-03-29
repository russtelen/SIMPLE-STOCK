// ==========
// REQUIRE
// ==========
const mongoose = require("mongoose")
const dotenv = require("dotenv")
// Read .env file
dotenv.config()

// Connect Mongoose
let db = process.env.DB

module.exports.connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/stealth-simple", {
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
