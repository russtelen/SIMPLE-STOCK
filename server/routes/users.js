// =============================================
// REQUIRE
// =============================================
const express = require("express")
const router = express.Router()
const { registerUser } = require("../controller/users")

// POST
// create a new user
router.route("/register").post(registerUser)

module.exports = router
