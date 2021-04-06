// =============================================
// REQUIRE
// =============================================
const express = require("express")
const router = express.Router()
const { requireLogin } = require("../utils/middlewares")
const {
  addToWatchlist,
  removeFromWatchlist,
} = require("../controller/watchlist")
// =============================================
// ROUTES
// =============================================
router.route("/").post(requireLogin, addToWatchlist)
router.route("/:stockId").delete(requireLogin, removeFromWatchlist)
module.exports = router
