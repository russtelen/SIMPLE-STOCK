import React, { Component } from "react"
import { Footer, FooterTab, Icon, Button, Text } from "native-base"
import { Link, useHistory } from "react-router-native"

const FooterTabs = () => {
  const history = useHistory()
  return (
    <Footer>
      <FooterTab style={{ backgroundColor: "#F26F20", padding: "3%" }}>
        <Button onPress={() => history.push("/dashboard")}>
          <Icon style={{ color: "#FFFF" }} name="home" />
          <Text style={{ color: "#FFFF" }}>Home</Text>
        </Button>
        <Button onPress={() => history.push("/dashboard")}>
          <Icon style={{ color: "#FFFF" }} name="search" />
          <Text style={{ color: "#FFFF" }}> Search</Text>
        </Button>
        <Button onPress={() => history.push("/account")}>
          <Icon style={{ color: "#FFFF" }} active name="person" />
          <Text style={{ color: "#FFFF" }}>Account</Text>
        </Button>
      </FooterTab>
    </Footer>
  )
}

export default FooterTabs
