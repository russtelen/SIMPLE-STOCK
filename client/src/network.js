import axios from "axios"

export const loginUser = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: "https://stealth-simple.herokuapp.com/api/users/login",
      data,
    })

    return res.data
  } catch (e) {
    console.log(e)
  }
}

export const registerUser = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: "https://stealth-simple.herokuapp.com/api/users/register",
      data,
    })

    return res.data
  } catch (e) {
    console.log(e)
  }
}
