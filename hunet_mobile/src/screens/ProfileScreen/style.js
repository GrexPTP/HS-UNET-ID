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

import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";

const win = Dimensions.get("window");
const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

const style = StyleSheet.create({
  profile: {
    flex: 1,
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width: width,
    height: height,
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    borderRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  info: {
    paddingHorizontal: 40,
    marginTop: 5,
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: "10%",
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  button: {
    height: 40,
    width: width / 3,
    backgroundColor: argonTheme.COLORS.WARNING,
    borderColor: argonTheme.COLORS.WARNING,
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: argonTheme.COLORS.WARNING,
    shadowOpacity: .2,
  },
  text: {
    color: argonTheme.COLORS.WHITE,
    fontWeight: "500",
    fontSize: 20,
  },
});

export default style;
