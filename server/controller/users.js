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
    const user = new User({
      username,
      email,
      initialCash: 50000,
      transactions: [],
    })
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

// @ GET
// @ Get portfolio
module.exports.getPortfolio = async (req, res) => {
  try {
      // 1. extract user id from token in header
      const userId = req.userData._id
  
      //  2. Find user
      const user = await User.findById(userId)
      if (!user) {
          res.send({ message: "User Not Found" })
          return
      }

      //  3. Calculate portfolio positions
      //  - sum of the numShares for a given user and symbol, 
      //  - the average price per share, 
      //  - the current price per share, 
      //  - and the profit/loss which is the difference between the average price multiplied by shares held and current price multiplied by shares held

      // tQ: calculate sums for each individual transaction first
      const allTrades = user.transactions.map(t => ({
          symbol : t.symbol,
          numShares: t.numShares,
          totalPrice : t.numShares * t.quotePrice
      }));

      let tradesBySymbol = []
      allTrades.reduce(function(r, val) {
          if (!r[val.symbol]) {
              r[val.symbol] = { 
                  symbol: val.symbol, 
                  numSharesTotal: 0,
                  bottomLine: 0
              };
              tradesBySymbol.push(r[val.symbol])
          }
          
          r[val.symbol].numSharesTotal += val.numShares;
          r[val.symbol].bottomLine += val.totalPrice;

          return r;
      }, {});

      // tQ: get average price per share 
      const positions = tradesBySymbol.map(t => ({
          symbol : t.symbol,
          numSharesTotal: t.numSharesTotal,
          avgPricePerShare: t.bottomLine / t.numSharesTotal
      }));

      res.send({positions})
      return
  
    } catch (e) {
      console.log(e)
    }
}