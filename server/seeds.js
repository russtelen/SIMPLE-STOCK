//=============================
// REQUIRE
//=============================
const dotenv = require("dotenv")
dotenv.config()
const { connectDb } = require("./models/db")
const mongoose = require("mongoose")
const User = require("./models/Users")

//=============================
// CONFIG
//=============================
// Connect to db
connectDb()

//=============================
// Seed DB
//=============================

const seedDb = async () => {
  await User.deleteMany({});

  // Create new users
  //-------------------
  const user1 = await new User({
    email: "russ@gmail.com",
    username: "russ",
    cash: 50000,
    transactions:[
      {
        symbol: "AAPL",
        numShares: 31,
        quotePrice: -206.1,
        transactionDateTime: 1596589501,
      }
    ]
  })
  const user2 = await new User({
    email: "gabi@gmail.com",
    username: "gabi",
    cash: 50000,
    transactions:[
      {
        symbol: "TSLA",
        numShares: 325,
        quotePrice: -1.1,
        transactionDateTime: 1596589520,
      },
      {
        symbol: "TSLA",
        numShares: 325,
        quotePrice: 362.1,
        transactionDateTime: 1617145438869,
      }
    ]
  })
  await User.register(user1, "password")
  await User.register(user2, "password")
}

;(async () => {
  await seedDb()
  mongoose.connection.close()
})()
