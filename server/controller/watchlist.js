// =============================================
// REQUIRE
// =============================================
const User = require("../models/Users")
const Stock = require("../models/Stocks")

// =============================================
// Logic
// =============================================
// @ POST
// @ Add to watchlist
module.exports.addToWatchlist = async (req, res) => {
  try {
    // 1. extract user id from token in header
    const userId = req.userData._id

    //  2. get data from body
    const { symbol, currentPrice } = req.body

    //  3. Find user
    const user = await User.findById(userId)
    if (!user) {
      res.send({ message: "User Not Found" })
      return
    }

    // 4. Create stock
    const stock = new Stock({
      symbol,
      currentPrice,
    })

    // 5. Push stock to user's watchlist
    user.watchlist.push(stock)

    // 6. save user
    await user.save()

    res.send({
      message: `Successfully added ${stock.symbol} to your watchlist`,
    })
  } catch (e) {
    console.log(e)
  }
}
