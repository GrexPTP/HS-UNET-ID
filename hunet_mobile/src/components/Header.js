import React, { Component, Fragment } from "react";
import { Button, Header } from "react-native-elements";
import { Images, argonTheme } from "../constants";

const HeaderComponent = ({
  title,
  navigation,
  leftComponent = null,
  rightComponent = {
    icon: "wallet-outline",
    color: argonTheme.COLORS.PRIMARY,
    type: "ionicon",
  },
}) => {
  return (
    <Header
      leftComponent={leftComponent}
      centerComponent={{
        text: title,
        style: { color: argonTheme.COLORS.PRIMARY, fontWeight: "bold" },
      }}
      barStyle="dark-content"
      statusBarProps={{
        backgroundColor: argonTheme.COLORS.WHITE,
      }}
      rightComponent={rightComponent}
      containerStyle={{ backgroundColor: argonTheme.COLORS.WHITE }}
    />
  );
};

export default HeaderComponent;
