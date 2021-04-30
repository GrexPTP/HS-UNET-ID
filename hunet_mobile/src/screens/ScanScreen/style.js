import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import { HeaderHeight } from "../../constants/utils";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useHeaderHeight } from "@react-navigation/stack";

import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";

const win = Dimensions.get("window");
const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItem: "center",
    justifyContent: "Center",
    width: width,
    height: height,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: "30%",
    alignSelf: "center",
  },
  rotateContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  container: {
    width: width,
    height: height,
  },
  cover: {
    flex: 1,
    aspectRatio: 1,
    width: width,
    resizeMode: "contain",
  },
  socialButtons: {
    margin: 5,
    height: 50,
    backgroundColor: argonTheme.COLORS.PRIMARY,
  },
  cancelButton: {
    height: 50,
    backgroundColor: "white",
    borderColor: argonTheme.COLORS.PRIMARY,
    borderWidth: 0.5,
  },

  confirmTextButtons: {
    color: "white",
    fontWeight: "800",
    fontSize: 20,
  },
  cancelTextButtons: {
    color: "white",
    fontWeight: "800",
    fontSize: 20,
  },
  takeButtons: {
    height: 50,
    backgroundColor: argonTheme.COLORS.PRIMARY,
    borderColor: argonTheme.COLORS.PRIMARY,
    borderWidth: 0.5,
    borderRadius: 10,
    shadowColor: argonTheme.COLORS.PRIMARY,
  },

  resultBox: {
    height: height * 0.3,
    width: width,
    borderRadius: 5,
    backgroundColor: "white",
  },
  diseaseText: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
  },
  diseaseDesText: {
    color: argonTheme.COLORS.DEFAULT,
    fontWeight: "300",
    fontSize: 12,
    textAlign: "center",
  },
});

export default styles;
