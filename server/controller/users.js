// =============================================
// REQUIRE
// =============================================
const User = require("../models/Users")
const { generateToken } = require("../utils/jwt")

// =============================================
// Logic
// =============================================
// @ POST
// @ Create (register) user
module.exports.registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body

    const user = new User({ email, username, password })

    if (user) {
      // save user
      await user.save()

      // generate token
      const accessToken = generateToken({
        _id: user._id,
        email: user.email,
        username: user.username,
      })

      //   send back token
      res.send({ accessToken })
      return
    }
  } catch (e) {
    console.log(e)
    res.send({ error: "email / username already exists" })
  }
}

// @ POST
// @ Login user
module.exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findAndValidate(username, password)

    if (user) {
      // generate token
      const accessToken = generateToken({
        _id: user._id,
        email: user.email,
        username: user.username,
      })

      // send back token
      res.send({ accessToken })
      return
    }

    res.send({ error: "Incorrect username or password" })
  } catch (e) {
    console.log(e)
  }
}
