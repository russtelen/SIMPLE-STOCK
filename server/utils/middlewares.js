// =============================================
// REQUIRE
// =============================================
const jwt = require("jsonwebtoken")

// Middleware to AUTHENTICATE user (collections)
module.exports.requireLogin = (req, res, next) => {
  const { authorization } = req.headers

  //   Extract authorization from headeres
  const token = authorization ? authorization.split(" ")[1] : null

  // Check if theres token in headers
  if (!token) {
    res.status(401).send({ error: "no token sent to server" })
    return
  }

  // Decode token
  let decoded
  const secret = process.env.ACCESS_TOKEN_SECRET || "my secret"

  try {
    decoded = jwt.verify(token, secret)
  } catch (error) {
    console.error(error)
    res.status(403).send({ error: "Invalid Token" })
    return
  }

  req.userData = decoded
  next()
}
