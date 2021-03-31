import React from "react"
import { Text, Image } from "react-native"
import { Container, Content } from "native-base"

const Dashboard = () => {
  return (
    <Container style={{ width: "100%" }}>
      <Content contentContainerStyle={{ flex: 1 }}>
        <Text
          style={{
            textAlign: "center",
            paddingBottom: 20,
            fontSize: 30,
          }}
        >
          HOME PAGE GOES HERE
        </Text>
        <Image
          source={{
            uri:
              "https://ahseeit.com//king-include/uploads/2021/01/131361232_212624293657437_6119095336913972420_n-5194714820.jpg",
          }}
          style={{
            width: 400,
            height: 400,
          }}
        />
      </Content>
    </Container>
  )
}

export default Dashboard
