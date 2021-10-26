import React from "react";
import { View, Text, StyleSheet, Linking, Image } from "react-native";
import Button from "@ant-design/react-native/lib/button";
import Card from "@ant-design/react-native/lib/card";
export const Login = ({ history }) => {
  return (
    <Card
      style={{
        backgroundColor: "#fafafa",
        border: "1px solid black",
        width: "400px",
        height: "500px",
        marginTop: "70px",
      }}>
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            fontSize: "45px",
            marginTop: 100,
            fontWeight: "bold",
          }}>
          Instagram
        </Text>
        <Image
          style={{
            width: 100,
            height: 100,
            justifyContent: "center",
            alignContent: "center",
            marginLeft: "37%",
            marginTop: "20px",
          }}
          source={{
            uri: "https://www.freepnglogos.com/uploads/logo-ig-png/logo-ig-stunning-instagram-logo-vector-download-for-new-7.png",
          }}></Image>
      </View>
      <Button
        title="Login With Instagram"
        style={{
          color: "blue",
          width: "300px",
          marginLeft: "13%",
          marginTop: "30%",
        }}
        type="primary"
        onPress={() =>
          Linking.openURL(
            "https://api.instagram.com/oauth/authorize?client_id=402482767984493&redirect_uri=https://ekinsta.herokuapp.com/home&scope=user_profile,user_media&response_type=code"
          )
        }>
        Login with Instagram
      </Button>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingLeft: "10rem",
    // paddingTop: " 20%",
    // fontSize: "30px",
    // borderBottomColor: "black",
  },
});
