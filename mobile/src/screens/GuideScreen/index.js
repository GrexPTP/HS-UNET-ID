import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import { argonTheme, Images } from "../../constants";

//import AppIntroSlider to use it
import AppIntroSlider from "react-native-app-intro-slider";
const { width, height } = Dimensions.get("screen");

const GuideScreen = ({ navigation }) => {
  const [showRealApp, setShowRealApp] = useState(false);

  useEffect(() => {
    (async () => {
      AsyncStorage.getItem("first_time").then((value) => {
        if (!!value) {
          navigation.navigate("ScanScreen");
          setShowRealApp(true);
        }
      });
    })();
  }, []);

  const onDone = () => {
    setShowRealApp(true);
    AsyncStorage.setItem("first_time", "true").then(() => {
      navigation.navigate("ScanScreen");
    });
  };
  const onSkip = () => {
    setShowRealApp(true);
    AsyncStorage.setItem("first_time", "true").then(() => {
      navigation.navigate("ScanScreen");
    });
  };

  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: "center",
          justifyContent: "space-around",
          paddingBottom: 100,
        }}
      >
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        <Image style={styles.introImageStyle} source={item.image} />
        <Text style={styles.introTextStyle}>{item.text}</Text>
      </View>
    );
  };
  if (showRealApp) {
    return (
      <View>
        <Image
          resizeMode="contain"
          style={styles.gif}
          source={Images.spinnerGif}
        />
      </View>
    );
  } else
    return (
      <>
        <StatusBar animated hidden />
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          onSkip={onSkip}
        />
      </>
    );
};

export default GuideScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },
  titleStyle: {
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  paragraphStyle: {
    padding: 20,
    textAlign: "center",
    fontSize: 16,
  },
  introImageStyle: {
    width: 200,
    height: 200,
  },
  introTextStyle: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "bold",
  },
  gif: {
    flex: 2,
    width: width,
  },
});

const slides = [
  {
    key: "s1",
    text: "Place the camera to capture the center of lesion skin",
    title: "Focus On Disease",
    image: {
      uri:
        "https://cdn2.iconfinder.com/data/icons/cornavirus-covid-19/64/_scan_research_magnifier_virus_disease-512.png",
    },
    backgroundColor: "#20d2bb",
  },
  {
    key: "s2",
    title: "More Information",
    text: "Note some of description if need",
    image: {
      uri:
        "https://cdn4.iconfinder.com/data/icons/general-office/91/General_Office_05-512.png",
    },
    backgroundColor: "#febe29",
  },
  {
    key: "s3",
    title: "Detect Disease",
    text: "Wait for a little bit, and see the result",
    image: {
      uri:
        "https://cdn2.iconfinder.com/data/icons/virus-transmission-22/512/50_target_Bacteria_disease_virus-512.png",
    },
    backgroundColor: "#22bcb5",
  },
  {
    key: "s4",
    title: "Make Appointment",
    text:
      "Upon receipt of the findings, you can make an appointment with clinicians for specific assistance.",
    image: {
      uri:
        "https://cdn3.iconfinder.com/data/icons/virus-transmission-color/48/Nurse_-512.png",
    },
    backgroundColor: "#3395ff",
  },
];
