// =============================================
// REQUIRE
// =============================================
const express = require("express")
const router = express.Router()
const { requireLogin } = require("../utils/middlewares")
const { makeTransaction } = require("../controller/transactions")

// =============================================
// ROUTES
// =============================================
router.route("/").post(requireLogin, makeTransaction)

module.exports = router
