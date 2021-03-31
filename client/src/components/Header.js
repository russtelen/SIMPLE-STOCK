import React from "react"
import { Header, Left, Body, Right, Text } from "native-base"
import { StyleSheet } from "react-native"

export default function Head() {
  return (
    <Header style={{ backgroundColor: "#F26F20" }}>
      <Left />
      <Body>
        <Text style={styles.headerText}>Simple Stock</Text>
      </Body>
      <Right />
    </Header>
  )
}

const styles = StyleSheet.create({
  headerText: {
    color: "#FFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
})
