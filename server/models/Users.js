//==========================================
// REQUIRE
//==========================================
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const passportLocalMongoose = require("passport-local-mongoose")

//==========================================
// SET UP SCHEMA
//==========================================
const transactionSchema = new Schema({
  symbol: { type: String },
  numShares: { type: Number },
  quotePrice: { type: Number },
  transactionDateTime: { type : Date, default : Date.now },
})
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // tQ: cash to make purchases
  initialCash: { type: Number },
  // tQ: this would hold all the user's transactions; 
  //     calculating the sum by symbol would give the current portfolio/
  //     portfolio positions can also be calculated
  transactions: [transactionSchema]
})

userSchema.virtual('cash')
.get(() => {
  let moneyBucks = this.initialCash
  if (this.transactions) {
    let i
    for (i = 0; i < this.transactions.length; ++i) {
      moneyBucks += this.transactions[i].numShares * this.transactions[i].quotePrice
    }
  }
  return moneyBucks
});

// this plugin adds a username, hash and salt field to store the username, the hashed password and the salt value.
userSchema.plugin(passportLocalMongoose)

//==========================================
// SET UP MODEL
//==========================================
const User = mongoose.model("User", userSchema)

// EXPORT
module.exports = User
