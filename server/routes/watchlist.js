// =============================================
// REQUIRE
// =============================================
const express = require("express")
const router = express.Router()
const { requireLogin } = require("../utils/middlewares")
const { addToWatchlist } = require("../controller/watchlist")
// =============================================
// ROUTES
// =============================================
router.route("/").post(requireLogin, addToWatchlist)
module.exports = router
