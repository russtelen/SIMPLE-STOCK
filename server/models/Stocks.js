//==========================================
// REQUIRE
//==========================================
const mongoose = require("mongoose")
const Schema = mongoose.Schema

//==========================================
// SET UP SCHEMA
//==========================================
const stockSchema = new Schema({
  symbol: {
    type: String,
    required: true,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
})

//==========================================
// SET UP MODEL
//==========================================
const Stock = mongoose.model("Stock", stockSchema)

// EXPORT
module.exports = Stock
