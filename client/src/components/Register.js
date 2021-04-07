import React, { useState } from "react"
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
  View,
} from "react-native"
import { Toast } from "native-base"

export default function Register({ navigation, submitRegister }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")

  const handleRegister = () => {
    if (confirmPassword != password) {
      Toast.show({
        text: `Passwords don't match`,
        position: "bottom",
        type: "danger",
        duration: 1500,
      })
      return
    }

    submitRegister({ email, username, password })
    setUsername("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../images/logo.png")} />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholder=" Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholder=" Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholder=" Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholder=" Confirm Password"
        secureTextEntry={true}
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleRegister()
        }}
      >
        <Text style={styles.bottonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#F26F20",
    padding: 10,
    margin: 10,
    width: 200,
    borderRadius: 5,
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 10,
  },
  logo: {
    height: 150,
    width: 150,
    marginBottom: 10,
  },
  text: {
    margin: 10,
  },
  bottonText: {
    color: "#FFFF",
  },
})
