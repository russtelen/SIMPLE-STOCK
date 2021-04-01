//=============================
// REQUIRE
//=============================
const dotenv = require("dotenv")
dotenv.config()
const { connectDb } = require("./models/db")
const mongoose = require("mongoose")
const User = require("./models/Users")
const Transaction = require("./models/Transactions")

//=============================
// CONFIG
//=============================
// Connect to db
connectDb()

//=============================
// Seed DB
//=============================

const seedDb = async () => {
  await User.deleteMany({})
  await Transaction.deleteMany({})
  console.log("seeding users")

  // Create new users
  //-------------------
  let user1 = new User({
    email: "mahboiruss@gmail.com",
    username: "russ",
    initialCash: 50000,
    transactions: [],
  })
  let user2 = new User({
    email: "mahsistagabi@gmail.com",
    username: "gabi",
    initialCash: 50000,
    transactions: [],
  })

  // Save/Register Users
  //-------------------
  await User.register(user1, "password")
  await User.register(user2, "password")

  // Create transactions
  //-------------------
  let transaction1 = new Transaction({
    symbol: "AAPL",
    numShares: 31,
    quotePrice: -206.1,
    transactionDateTime: 1596589501,
  })

  let transaction2 = new Transaction({
    symbol: "TSLA",
    numShares: 325,
    quotePrice: -1.1,
    transactionDateTime: 1596589520,
  })

  let transaction3 = new Transaction({
    symbol: "TSLA",
    numShares: 325,
    quotePrice: 362.1,
    transactionDateTime: 1617145438869,
  })

  // Save transactions
  //-------------------
  await transaction1.save()
  await transaction2.save()
  await transaction3.save()

  // Push transactions to users
  //-------------------
  await User.updateOne(
    { _id: user1 },
    {
      $push: {
        transactions: transaction1,
      },
    }
  )

  await User.updateOne(
    { _id: user2 },
    {
      $push: {
        transactions: {
          $each: [transaction2, transaction3],
        },
      },
    }
  )

  // Update Money of each user
  //-------------------
  user1.initialCash += transaction1.numShares * transaction1.quotePrice
  user2.initialCash += transaction2.numShares * transaction2.quotePrice
  user2.initialCash += transaction3.numShares * transaction3.quotePrice
  await user1.save()
  await user2.save()

  const user1Updated = await User.findOne({ username: "russ" })
  console.log("users seeded; user1 cash: " + user1Updated.email)
}

;(async () => {
  await seedDb()
  mongoose.connection.close()
})()