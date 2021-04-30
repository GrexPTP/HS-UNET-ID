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

import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";

const win = Dimensions.get("window");
const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#FAFAFA',
    marginTop: '15%',
    width: win.width,
    padding: '1%',
    justifyContent: 'center',
    textAlign: 'left',
  },
  homeContainer: {
    flex: 3,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#FAFAFA',
  },
  header: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: win.height / 2,
  },
  body: {
    flex: 1,
  },
  img: {
    height: null,
    width: 100,
    aspectRatio: 1,
    borderRadius: 100 / 2,
    borderColor: '#fff',
  },
  Navheader: {
    backgroundColor: '#ff0000',
    justifyContent: 'space-around',
    paddingTop: 0,
    height: Platform.select({
      android: 50 + StatusBar.currentHeight,
      default: 50 + StatusBar.currentHeight,
    }),
  },
  floatView: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    width: '95%',
    marginTop: '25%',
    zIndex: 2,
    height: '20%',
    borderRadius: win.width * 0.01,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  title: {
    color: '#666666',
    fontSize: 16,
    margin: 8,
  },
  divider: {
    borderBottomWidth: 1,
    width: '95%',
    borderBottomColor: '#ECECEC',
  },
  scrollView: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FAFAFA',
  },
  titleContainer: {
    alignSelf: 'flex-start',
    width: '100%',
  },
});
export default styles;
