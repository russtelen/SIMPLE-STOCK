// ==========
// REQUIRE
// ==========
const express = require("express")
const dotenv = require("dotenv")
const session = require("express-session")
const ExpressError = require("./utils/ExpressError")
const { connectDb } = require("./models/db")
// REQUIRE-AUTH
//---------------
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/Users")
//REQUIRE ROUTERS
//------------
const userRoutes = require("./routes/users")
const transactionRoutes = require("./routes/transactions")

// ==========
// CONFIG
// ==========
// Read .env file
dotenv.config()

// init express
const app = express()

// Parsing Middlewares
app.use(express.urlencoded({ extended: true })) // application/x-www-form-urlencoded
app.use(express.json()) // JSON

// Express Session
const sessionConfig = {
  secret: process.env.SESSION,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // expires in 1 week
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}
app.use(session(sessionConfig))

// Passport/Auth
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Connect to db
connectDb()

// ==========
// ROUTES
// ==========

// User ROUTES
//-------------
app.use("/api/users", userRoutes)
app.use("/api/transactions", transactionRoutes)

//==============================================
// Error Handlers
// =============================================
app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err
  if (!err.message) {
    err.message = "Oh no, Something went wrong"
  }
  res.status(statusCode).send({ error: err.message, status: statusCode })
})

// ==========
// LISTEN
// ==========
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Connected to port ${port}`)
})
