const axios = require("axios")
const dotenv = require("dotenv")

const finnhub = axios.create({
    baseURL: `https://finnhub.io/api/v1/`
})

module.exports.getCurrentPrice = async (symbol) => {
    dotenv.config()
    
    const response = await finnhub.get(`quote?symbol=${symbol}&token=${process.env.API_KEY}`)   
    
    return response.data.c
}


