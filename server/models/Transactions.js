//==========================================
// REQUIRE
//==========================================
const mongoose = require("mongoose")
const Schema = mongoose.Schema

//==========================================
// SET UP SCHEMA
//==========================================
const transactionSchema = new Schema({
  symbol: {
    type: String,
    required: true,
  },
  numShares: {
    type: Number,
    required: true,
  },
  quotePrice: {
    type: Number,
    required: true,
  },
  transactionDateTime: {
    type: Date,
    default: Date.now,
  },
})

//==========================================
// SET UP MODEL
//==========================================
const Transaction = mongoose.model("Transaction", transactionSchema)

// EXPORT
module.exports = Transaction