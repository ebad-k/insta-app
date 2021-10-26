import React from "react";
import { View, Text, StyleSheet, Linking, Image } from "react-native";
import Button from "@ant-design/react-native/lib/button";
import Card from "@ant-design/react-native/lib/card";
export const Login = ({ history }) => {
  return (
    <View style={styles.container}>
      <Card style={styles.cardStyle}>
        <View>
          <Text style={styles.textStyle}>Instagram</Text>
          <Image
            style={styles.logo}
            source={{
              uri: "https://www.freepnglogos.com/uploads/logo-ig-png/logo-ig-stunning-instagram-logo-vector-download-for-new-7.png",
            }}
          ></Image>
        </View>
        <Button
          title="Login With Instagram"
          style={styles.buttonStyle}
          type="primary"
          onPress={() =>
            Linking.openURL(
              "https://api.instagram.com/oauth/authorize?client_id=402482767984493&redirect_uri=https://ekinsta.herokuapp.com/home&scope=user_profile,user_media&response_type=code"
            )
          }
        >
          Login with Instagram
        </Button>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardStyle: {
    backgroundColor: "#d9d9d9",
    border: "1px solid black",
    width: "400px",
    height: "500px",
    marginTop: "78px",
    marginBottom: "79px",
  },
  textStyle: {
    textAlign: "center",
    fontSize: "45px",
    marginTop: 100,
    fontWeight: "bold",
  },
  logo: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignContent: "center",
    marginLeft: "37%",
    marginTop: "20px",
  },
  buttonStyle: {
    color: "blue",
    width: "300px",
    marginLeft: "13%",
    marginTop: "30%",
  },
});

