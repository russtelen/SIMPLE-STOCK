import React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { Container, Content, Text } from "native-base"
import { useHistory } from "react-router-native"

const Account = ({ user, setToken }) => {
  const history = useHistory()

  async function handleLogOut() {
    setToken(null)
    history.push("/")
  }
  return (
    <Container style={styles.container}>
      <Content
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.text}>Name: {user.username}</Text>
        <Text style={styles.text}>Email: {user.email}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleLogOut()
          }}
        >
          <Text style={styles.buttonText}>LogOut</Text>
        </TouchableOpacity>
      </Content>
    </Container>
  )
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#F26F20",
    padding: 10,
    margin: "10%",
    width: 200,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFF",
  },
  text: {
    textAlign: "center",
    paddingBottom: 20,
    fontSize: 30,
  },
})
export default Account
