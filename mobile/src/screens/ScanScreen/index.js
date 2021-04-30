import React, { useState, useEffect, useRef, Animated } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  Image,
  Dimensions,
  TextInput,
  StatusBar,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import { Block, Button, Icon } from "galio-framework";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Spinner from "react-native-loading-spinner-overlay";
import { PinchGestureHandler } from "react-native-gesture-handler";
import { Slider } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import { Input, Header } from "../../components";
import { Images, argonTheme } from "../../constants";
import { useHeaderHeight } from "@react-navigation/stack";
import styles from "./style";
import { CommonActions } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("screen");
let tempUri;
let tempWidth;
let tempHeight;
let tempImage;

export default function ScanScreen({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [loading, setLoading] = useState(false);
  const [zoom, setZoom] = useState(0);
  const camereRef = useRef(null);
  const isFocused = useIsFocused();
  const [review, setReview] = useState(false);
  const [value, onChangeText] = React.useState("");
  const [photo, setPhoto] = useState(null);
  useEffect(() => {
  (async () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    return function cleanup() {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const handleBackButton = () => {
    navigation.reset({
      routes: [{ name: "Home" }],
    });
    return true;
  };

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.cancelled) {
      tempImage = result;
      tempUri = result.uri;
      tempWidth = result.width;
      tempHeight = result.width;
      setLoading(false);
      console.log(result);
      setReview(true);
      setPhoto(result);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const goBack = () => {
    navigation.reset({
      routes: [{ name: "Home" }],
    });
  };
  return (
    <View style={styles.container}>
      <Spinner
        visible={loading}
        textContent={"Processing result..."}
        textStyle={{ color: "#ffffff" }}
      />
      <Header
        title="Skin Scanner"
        navigation={navigation}
        leftComponent={{
          icon: "caret-back",
          color: argonTheme.COLORS.PRIMARY,
          type: "ionicon",
          onPress: goBack,
        }}
      />
      <Block flex>
        <Block center flex style={{ backgroundColor: argonTheme.COLORS.WHITE }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              setReview(false);
              openCamera();
            }}
          >
            {photo ? (
              <Image style={styles.cover} source={{ uri: photo?.uri }} />
            ) : (
              <Image style={styles.cover} source={Images.cameraHolder} />
            )}
          </TouchableOpacity>
        </Block>

        <Block flex style={styles.resultBox}>
          <Block
            middle
            width={width * 0.9}
            style={{ paddingTop: 20, marginLeft: width * 0.05 }}
          >
            <TextInput
              style={{
                textAlign: "left",
                width: "100%",
                height: 50,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: argonTheme.COLORS.PRIMARY,
                paddingLeft: 5,
              }}
              placeholder="Description"
              placeholderTextColor={argonTheme.COLORS.MUTED}
              onChangeText={(text) => onChangeText(text)}
              value={value}
            />
          </Block>
          <Block row width={width} middle style={{ paddingTop: 10 }}>
            <Button
              style={{ ...styles.takeButtons }}
              onPress={() => {
                setReview(false);
                openCamera();
              }}
            >
              {review ? (
                <Text style={styles.cancelTextButtons}>Retake</Text>
              ) : (
                <Text style={styles.cancelTextButtons}>Take Image</Text>
              )}
            </Button>
            {photo && (
              <Button
                style={{ ...styles.confirmButton }}
                onPress={() => {
                  navigation.navigate("ResultScreen", {
                    uri: photo?.uri,
                    height: photo?.tempHeight,
                    width: photo?.tempWidth,
                    image: photo?.tempImage,
                  });
                }}
              >
                <Text style={styles.confirmTextButtons}>Scan Disease</Text>
              </Button>
            )}
          </Block>
        </Block>
      </Block>
    </View>
  );
}
