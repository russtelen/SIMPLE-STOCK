// =============================================
// REQUIRE
// =============================================
const express = require("express")
const passport = require("passport")
const router = express.Router()
const { registerUser, loginUser } = require("../controller/users")

// =============================================
// ROUTES
// =============================================
router.route("/register").post(registerUser)
router.route("/login").post(passport.authenticate("local"), loginUser)

module.exports = router
