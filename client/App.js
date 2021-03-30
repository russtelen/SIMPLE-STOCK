import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text } from "react-native"
import Auth from "../client/src/screens/Auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import jwtDecode from "jwt-decode"
import { NativeRouter, Route } from "react-router-native"
import Dashboard from "./src/screens/Dashboard"

export default function App() {
  const [user, setUser] = useState({})
  const [token, setToken] = useState("")

  //store token to async storage
  useEffect(() => {
    const storeToken = async () => {
      try {
        const jsonToken = JSON.stringify(token)
        AsyncStorage.setItem("token", jsonToken)
      } catch (e) {
        console.log(e)
      }
    }
    storeToken()
    console.log(token)
  }, [token])

  //getting user info
  useEffect(() => {
    const user = token ? jwtDecode(token) : null
    setUser(user)
    console.log(user)
  }, [token])

  return (
    <NativeRouter>
      <View style={styles.container}>
        <Route exact path="/">
          <Auth setToken={setToken} name="Auth"></Auth>
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
      </View>
    </NativeRouter>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
