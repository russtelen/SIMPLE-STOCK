// =============================================
// REQUIRE
// =============================================
const User = require("../models/Users")
const { generateToken } = require("../utils/jwt")

// =============================================
// Logic
// =============================================
// @ GET
// @ User Financial Data
module.exports.getUserData = async (req, res) => {
  const userId = req.userData._id
  const user = await User.findById(userId)

  res.send({ user })
}

// @ POST
// @ Create (register) user
module.exports.registerUser = async (req, res) => {
  try {
    // get body from form
    const { email, username, password } = req.body
    // create new User (only username and email)
    // tQ: add $50k in cash and initialize empty transactions array
    const user = new User({ username, email, cash: 50000, transactions: [] })
    // "register" user using .register()
    const registeredUser = await User.register(user, password)

    // login user
    req.login(registeredUser, (err) => {
      if (err) return next(err)

      const user = req.user

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
    })
  } catch (e) {
    console.log(e)
    res.send({ error: e.message })
  }
}

// @ POST
// @ Login user
module.exports.loginUser = async (req, res) => {
  try {
    const user = req.user
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
    res.send({ error: "Incorrect username or password" })
  }
}

// @ POST
// @ Logout user
module.exports.logoutUser = (req, res) => {
  req.logout()
  req.session.destroy()
  res.send({ message: "Successfully logged out" })
}
