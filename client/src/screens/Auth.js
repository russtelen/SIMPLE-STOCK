import React, { useState, useEffect } from "react"
import {
  Container,
  Tab,
  Tabs,
  TabHeading,
  Text,
  DefaultTabBar,
  Content,
} from "native-base"
import Login from "../components/Login"
import Register from "../components/Register"
import axios from "axios"

const renderTabBar = (props) => {
  props.tabStyle = Object.create(props.tabStyle)
  return <DefaultTabBar {...props} />
}

const submitLogin = (data) => {
  console.log(data)
}

const Auth = () => {
  return (
    <Container>
      <Content>
        {/* <Header hasTabs style={{ backgroundColor: "#F26F20" }} /> */}
        <Tabs renderTabBar={renderTabBar}>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#F26F20" }}>
                <Text>Login</Text>
              </TabHeading>
            }
          >
            <Login submitLogin={submitLogin} />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#F26F20" }}>
                <Text>Register</Text>
              </TabHeading>
            }
          >
            <Register />
          </Tab>
        </Tabs>
      </Content>
    </Container>
  )
}

export default Auth
