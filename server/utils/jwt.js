// =============================================
// REQUIRE
// =============================================
const jwt = require("jsonwebtoken")

const secret = process.env.ACCESS_TOKEN_SECRET || "my secret"

module.exports.generateToken = (data) => {
  const token = jwt.sign(data, secret, {
    expiresIn: "100000000000000000000000s",
  })
  return token
}
