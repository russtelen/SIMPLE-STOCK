const axios = require("axios")
const dotenv = require("dotenv")
dotenv.config()

const finnhub = axios.create({
  baseURL: `https://finnhub.io/api/v1/`,
})

module.exports.getCurrentPrice = async (symbol) => {
  try {
    const response = await finnhub.get(
      `quote?symbol=${symbol}&token=${process.env.API_KEY}`
    )

    return response.data.c
  } catch (e) {
    console.log(e)
  }
}
