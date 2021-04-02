// =============================================
// REQUIRE
// =============================================
const express = require("express")
const passport = require("passport")
const router = express.Router()
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserData,
  getPortfolio,
} = require("../controller/users")
const { requireLogin } = require("../utils/middlewares")

// =============================================
// ROUTES
// =============================================
router.route("/register").post(registerUser)
router.route("/login").post(passport.authenticate("local"), loginUser)
router.route("/logout").post(logoutUser)
router.route("/financials").get(requireLogin, getUserData)
router.route("/portfolio").get(requireLogin, getPortfolio)

module.exports = router
