//==========================================
// REQUIRE
//==========================================
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")

//==========================================
// SET UP SCHEMA
//==========================================
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

//==========================================
// CUSTOM HOOKS
//==========================================
// Custom Model class function
userSchema.statics.findAndValidate = async function (username, password) {
  const user = await this.findOne({ username })
  const isPwCorrect = await bcrypt.compare(password, user.password)

  return isPwCorrect ? user : false
}

// Mongoose hook to convert password to a hashed password
userSchema.pre("save", async function (next) {
  // only rehash PW if PW has been modified
  if (!this.isModified("password")) {
    return next()
  }

  // hash PW
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

//==========================================
// SET UP MODEL
//==========================================
const User = mongoose.model("User", userSchema)

// EXPORT
module.exports = User
