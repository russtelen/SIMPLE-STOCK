// =============================================
// REQUIRE
// =============================================
const User = require("../models/Users")
const Transaction = require("../models/Transactions")

// =============================================
// Logic
// =============================================
// @ POST
// @ Make a transaction
module.exports.makeTransaction = async (req, res) => {
  try {
    // 1. extract user id from token in header
    const userId = req.userData._id

    //  2. get data from body
    const { symbol, numShares, quotePrice } = req.body

    //  3. Find user
    const user = await User.findById(userId)
    if (!user) {
      res.send({ message: "User Not Found" })
      return
    }

    //   4. Check if user has money, if none, return
    if (user.initialCash < 0 || user.initialCash == 0) {
      res.send({ message: "Insufficient Funds" })
      return
    }

    //   5. create transaction
    const transaction = new Transaction({
      symbol,
      numShares,
      quotePrice,
      transactionDateTime: Date.now(),
    })

    //   6. Calculate transaction price
    const transactionPrice = transaction.numShares * transaction.quotePrice

    //   7. Check if transaction price exceeds user cash, if yes, return
    if (-transactionPrice > user.initialCash) {
      res.send({ message: "Insufficient Funds" })
      return
    }

    //   7.1 Check for purchase / sale
    if (numShares === 0) {
      res.send({ message: "Transaction must be a purchase or a sale" })
      return
    }

    //   7.2 For sales, check if there are enough shares to sell
    if (transactionPrice > 0) {
      let totalShares = 0
      user.transactions.map((t) => {
        // if (t.symbol===symbol) numShares += t.totalShares
        if (t.symbol === symbol) totalShares += t.numShares
      })

      if (totalShares < numShares) {
        res.send({ message: "Insufficient Shares" })
        return
      }
    }
    //   8. Push transaction in transactions array of user (user.transactions)
    user.transactions.push(transaction)

    //   9. Add / Subtract money from user depending on transaction
    user.initialCash += transactionPrice

    //   10. save transaction
    await transaction.save()

    //   11. update/save user in the database
    await user.save()

    //   12. Conditionally send message back to client
    if (transaction.quotePrice < 0) {
      res.send({
        message: `Transaction complete. Successfully bought ${
          transaction.numShares
        } shares of ${
          transaction.symbol
        } for $${-transaction.quotePrice}. Total of $${-transactionPrice}`,
      })
    } else {
      res.send({
        message: `Transaction complete. Successfully sold ${transaction.numShares} shares of ${transaction.symbol} for ${transaction.quotePrice}. Total of ${transactionPrice}`,
      })
    }
  } catch (e) {
    console.log(e)
  }
}
