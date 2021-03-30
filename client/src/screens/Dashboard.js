import React from "react"
import { Text, View, Image } from "react-native"
import { Link } from "react-router-native"

const Dashboard = () => {
  return (
    <View>
      <Text style={{ textAlign: "center", paddingBottom: 20, fontSize: 30 }}>
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
      <Link to="/">
        <Text>Logout</Text>
      </Link>
    </View>
  )
}

export default Dashboard
