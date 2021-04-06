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
    await stock.save()
    await user.save()

    res.send({
      message: `Successfully added ${stock.symbol} to your watchlist`,
    })
  } catch (e) {
    console.log(e)
  }
}

// @ DELETE
// @ Remove from watchlist
module.exports.removeFromWatchlist = async (req, res) => {
  try {
    // 1. extract user id from token in header
    const userId = req.userData._id

    //  2. get stockId from params and find Stock
    const { stockId } = req.params
    const stock = await Stock.findById(stockId)

    // 3. Remove stock from Users.watchlist array
    await User.findByIdAndUpdate(userId, {
      $pull: { watchlist: stock },
    })

    // 4. Delete stock from DB
    await Stock.findByIdAndDelete(stockId)

    res.send({ message: `Successfully removed stock from watchlist` })
  } catch (e) {
    console.log(e)
  }
}
