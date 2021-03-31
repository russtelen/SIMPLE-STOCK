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
  console.log("seeding users")

  // Create new users
  //-------------------
  const user1 = new User({
    email: "mahboiruss@gmail.com",
    username: "russ",
    initialCash: 50000,
    transactions:[]
  })
  const user2 = new User({
    email: "mahsistagabi@gmail.com",
    username: "gabi",
    initialCash: 50000,
    transactions:[]
  })

  await User.register(user1, "password")
  await User.updateOne(
    { _id: user1 },
    { $push: { transactions: 
    {
      symbol: "AAPL",
      numShares: 31,
      quotePrice: -206.1,
      transactionDateTime: 1596589501,
    } }
  })

  await User.register(user2, "password")
  
  await User.updateOne(
    { _id: user2 },
    { $push: { transactions: 
    
      { $each: [{
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
      }]
    }
  }}
  )

  console.log("users seeded; user1 cash: " + user1.cash)
}

;(async () => {
  await seedDb()
  mongoose.connection.close()
})()
