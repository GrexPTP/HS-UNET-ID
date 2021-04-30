import React, { useState, useEffect } from "react";
import { signIn, signOut, getToken } from "../../Util";
import { View, Text } from "react-native";
import AnimatedSplash from "react-native-animated-splash-screen";

const SplashScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function init() {
      const token = await getToken();
      setLoading(false);
      setTimeout(function () {
        if (token != undefined) {
          navigation.navigate("Home");
        } else {
          navigation.navigate("Auth");
        }
      }, 1000);
    }
    init();
  });

  const viewStyles = [
    {
      backgroundColor: "orange",
      flex: 1,
      justifyContent: "center",
      alignItem: "center",
    },
  ];
  const textStyles = {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  };
  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={loading}
      logoImage={require("../../assets/imgs/hunet-logo.png")}
      backgroundColor={"#ffffff"}
      logoHeight={300}
      logoWidth={300}
    />
  );
};
export default SplashScreen;
