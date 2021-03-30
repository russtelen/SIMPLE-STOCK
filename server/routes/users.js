// =============================================
// REQUIRE
// =============================================
const express = require("express")
const passport = require("passport")
const router = express.Router()
const { registerUser, loginUser, logoutUser } = require("../controller/users")

// =============================================
// ROUTES
// =============================================
router.route("/register").post(registerUser)
router.route("/login").post(passport.authenticate("local"), loginUser)
router.route("/logout").post(logoutUser)
module.exports = router
