import { useState, useEffect, useRef } from "react";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  BackHandler,
} from "react-native";
import Toast from "react-native-simple-toast";
import { Camera } from "expo-camera";
import { Block, Button } from "galio-framework";
import Spinner from "react-native-loading-spinner-overlay";
import { argonTheme, Images } from "../../constants";
import { gql, useMutation } from "@apollo/client";
import { block } from "react-native-reanimated";
import axios from "axios";
import FormData from "form-data";
import { getToken, getUser } from "../../Util";
import { useApolloClient } from "@apollo/client";
import { CommonActions } from "@react-navigation/native";
import { SliderBox } from "react-native-image-slider-box";

const CREATEEXAMINATION = gql`
  mutation createExamination($createExaminationInput: CreateExaminationInput!) {
    createExamination(createExaminationInput: $createExaminationInput) {
      id
      createdAt
      customerDescription
      doctor {
        name
      }
      doctorFeedback
    }
  }
`;
const GET_USER = gql`
  query {
    user {
      name
      gender
      phone
      username
      email
      profileImage
      id
    }
  }
`;
const { width, height } = Dimensions.get("screen");

function ResultScreen({ navigation, route }) {
  const { uri, image } = route.params;
  const [
    createExamination,
    { data, error: mutationError, loading: mutationLoading },
  ] = useMutation(CREATEEXAMINATION);

  const client = useApolloClient();
  const [result, setResult] = useState(null);
  const [segmentImage, setSegmentImage] = useState("");
  const [originImage, setOriginImage] = useState("");
  const [predict, setPredict] = useState(null);
  const [loading, setLoading] = useState(false);
  const [process, setProcess] = useState(0);
  const [images, setImages] = useState([]);
  const [isDisease, setIsDisease] = useState(false);
  useEffect(() => {
    if (mutationError) {
      console.log(mutationError);
    }
  }, [mutationError]);

  useEffect(() => {
    const init = async () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);
      setLoading(true);
      const { user } = client.readQuery({
        query: GET_USER,
      });
      const token = await getToken();
      const formData = new FormData();
      formData.append("image", {
        uri: uri, //Your Image File Path
        type: "image/jpeg",
        name: "imagename.jpg",
      });
      axios({
        url: "http://118.69.53.27:5000/predict",
        method: "POST",
        data: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: function (progressEvent) {
          const total = progressEvent.total;
          const current = progressEvent.loaded;
          let percentCompleted = Math.floor((current / total) * 100);
          setProcess(percentCompleted);
        },
      })
        .then(function (response) {
          setPredict(response?.data?.predict);
          setResult(response?.data?.result);
          setSegmentImage(response?.data?.segment);
          var arr = [];
          arr.push(response?.data?.segment);
          arr.push(response?.data?.origin);
          setImages(arr);
          let ExaminationInput = {
            diseaseName: response?.data?.result,
            patientId: user?.id,
            status: "pending",
            predict: JSON.stringify(response?.data?.predict),
            resultImage: response?.data?.segment,
            image: response?.data?.origin,
            customerDescription: "",
          };
          createExamination({
            variables: { createExaminationInput: ExaminationInput },
          });
          if (response?.data?.result == "normal") {
            setIsDisease(true);
          } else {
            setIsDisease(false);
          }
          setLoading(false);
        })
        .catch(function (error) {
          setLoading(false);
          console.log("error from image :", error);
        });
    };
    init();
    return function cleanup() {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);
  const handleBackButton = () => {
    Toast.show("Please keep this the screen on", Toast.SHORT);
    return true;
  };

  return (
    <Block flex style={styles.container}>
      <Spinner
        visible={loading}
        textContent={`Processing ${process} %...`}
        textStyle={{ color: "#ffffff" }}
      />
      <Spinner
        visible={mutationLoading}
        textContent={`Saving result...`}
        textStyle={{ color: "#ffffff" }}
      />
      {segmentImage ? (
        // <Image
        //   resizeMode="cover"
        //   style={styles.cover}
        //   source={{
        //     uri: segmentImage,
        //   }}
        // />
        <SliderBox
          images={images}
          sliderBoxHeight={width}
          circleLoop
          onCurrentImagePressed={(index) =>
            console.warn(`image ${index} pressed`)
          }
        />
      ) : (
        <Block flex>
          <Image
            resizeMode="contain"
            style={styles.gif}
            source={Images.spinnerGif}
          />
        </Block>
      )}

      <View style={styles.resultBox}>
        <Block
          row
          width={width}
          middle
          space="evenly"
          style={{ paddingTop: 10 }}
        >
          {predict ? (
            Object.keys(predict).map((key, index) => {
              var percent = predict[key] * 100;
              return (
                <Block key={index}>
                  <Text style={styles.diseaseText}>{key}</Text>
                  <Text style={styles.diseaseDesText}>
                    {percent.toFixed(2)} %
                  </Text>
                </Block>
              );
            })
          ) : (
            <Block></Block>
          )}
        </Block>
        {predict && (
          <Block style={{ paddingTop: 10 }}>
            <Text style={styles.diseaseText}>Result</Text>
            <Text
              style={
                isDisease
                  ? styles.diseaseTextNormal
                  : styles.diseaseTextNotNormal
              }
            >
              {result}
            </Text>
          </Block>
        )}
        <Block flex row style={{ paddingTop: 10 }}>
          <Button
            style={{ ...styles.cancelButton }}
            onPress={() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{ name: "Home" }],
                })
              );
            }}
          >
            <Block>
              <Text style={styles.cancelTextButtons}>Go to Home</Text>
            </Block>
          </Button>
          <Button
            style={{ ...styles.confirmButton }}
            onPress={() => navigation.navigate("DoctorList")}
          >
            <Block>
              <Text style={styles.confirmTextButtons}>Send to doctor</Text>
            </Block>
          </Button>
        </Block>
      </View>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: argonTheme.COLORS.WHITE,
  },
  cover: {
    // flex: 2,
    height: height * 0.75,
  },
  gif: {
    flex: 2,
    width: width,
  },
  socialButtons: {
    margin: 5,
    height: 50,
    backgroundColor: "transparent",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: argonTheme.COLORS.PRIMARY,
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 20,
  },
  resultBox: {
    // flex: 1,
    height: height * 0.25,
    borderRadius: 5,
    backgroundColor: "white",
    alignItems: "center",
  },
  diseaseText: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
    textTransform: "capitalize",
  },
  diseaseDesText: {
    color: argonTheme.COLORS.DEFAULT,
    fontWeight: "300",
    fontSize: 12,
    textAlign: "center",
  },
  diseaseTextNormal: {
    color: "#60f542",
    fontWeight: "300",
    fontSize: 20,
    textAlign: "center",
    textTransform: "capitalize",
  },
  diseaseTextNotNormal: {
    color: argonTheme.COLORS.WARNING,
    fontWeight: "300",
    fontSize: 20,
    textAlign: "center",
    textTransform: "capitalize",
  },
  confirmButton: {
    height: 50,
    backgroundColor: argonTheme.COLORS.PRIMARY,
    borderColor: argonTheme.COLORS.PRIMARY,
    borderWidth: 0.5,
    borderRadius: 10,
    shadowColor: argonTheme.COLORS.PRIMARY,
  },
  cancelButton: {
    height: 50,
    backgroundColor: argonTheme.COLORS.PRIMARY,
    borderColor: argonTheme.COLORS.PRIMARY,
    borderWidth: 0.5,
    borderRadius: 10,
    shadowColor: argonTheme.COLORS.PRIMARY,
  },

  confirmTextButtons: {
    color: argonTheme.COLORS.WHITE,
    fontWeight: "800",
    fontSize: 20,
  },
  cancelTextButtons: {
    color: argonTheme.COLORS.WHITE,
    fontWeight: "800",
    fontSize: 20,
  },
});

export default ResultScreen;
