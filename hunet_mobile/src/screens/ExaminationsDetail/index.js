import { useState, useEffect, useRef } from "react";
import * as React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  ScrollView,
  Switch,
  ImageBackground,
} from "react-native";
import { Header, Icon } from "../../components";

import { Images } from "../../constants";
import { Block, Text, theme, Toast } from "galio-framework";
import Spinner from "react-native-loading-spinner-overlay";
import { argonTheme } from "../../constants";
import { ListItem, Avatar, Divider } from "react-native-elements";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { SliderBox } from "react-native-image-slider-box";
import moment from "moment";

import Collapsible from "react-native-collapsible";

import ExaminationDetailRow from "../../components/ExaminationDetailRow";
import { capitalizeTheFirstLetterOfEachWord } from "../../Util/index";
const GET_EXAMINATION = gql`
  query examination($id: Int!) {
    examination(id: $id) {
      createdAt
      customerDescription
      doctorFeedback
      resultImage
      image
      status
      disease {
        name
      }
      createdAt
      examinationDetails {
        disease {
          name
        }
        percentage
      }
      doctor {
        name
        phone
        profileImage
      }
    }
  }
`;
const { width, height } = Dimensions.get("screen");
const ExaminationsDetail = ({ navigation, route }) => {
  const { id } = route.params;
  const [collapsed, setCollapsed] = useState(true);
  const [isImage, setIsImage] = useState(false); //Switch image show: True: real image, False: Segmented image
  const [images, setImages] = useState([]);
  const { loading, data, error } = useQuery(GET_EXAMINATION, {
    variables: { id },
  });
  const toggleSwitch = () => setIsImage(!isImage);

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (data) {
      var arr = [];
      arr.push(data?.examination?.image);
      arr.push(data?.examination?.resultImage);
      setImages(arr);
    }
  }, [data]);
  const toggleExpanded = () => {
    //Toggling the state of single Collapsible
    setCollapsed(!collapsed);
  };

  return (
    <ImageBackground
      source={Images.ProfileBackground}
      style={styles.profileContainer}
      imageStyle={styles.profileBackground}
    >
      <Header
        title="Examination"
        navigation={navigation}
        leftComponent={{
          icon: "caret-back",
          color: argonTheme.COLORS.PRIMARY,
          type: "ionicon",
          onPress: goBack,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width, marginTop: "5%", marginBottom: "30%" }}
        contentContainerStyle={{ paddingBottom: "30%" }}
      >
        <Block
          flex
          style={[
            styles.profileCard,
            {
              marginTop: "5%",
            },
          ]}
        >
          <Block>
            <Spinner
              visible={loading}
              textContent={"Loading..."}
              textStyle={{ color: "#ECECEC" }}
            />
            <SliderBox
              images={images}
              parentWidth={width - 2 * theme.SIZES.BASE}
              sliderBoxHeight={width * 0.7}
              circleLoop
              onCurrentImagePressed={(index) =>
                console.warn(`image ${index} pressed`)
              }
            />
          </Block>

          <Block flex={1} style={{ marginTop: "2%" }}>
            <ExaminationDetailRow
              press={toggleExpanded}
              title={"Disease:"}
              content={data?.examination?.disease?.name}
            />
            <Collapsible collapsed={collapsed} align="center">
              <ListItem
                bottomDivider
                containerStyle={{ borderRadius: 10, marginVertical: 2 }}
              >
                <ListItem.Content>
                  {data?.examination?.examinationDetails ? (
                    data?.examination?.examinationDetails.map((item, index) => {
                      return (
                        <Block
                          key={index}
                          row
                          space="between"
                          flex={1}
                          style={{
                            width: "100%",
                            paddingHorizontal: "5%",
                          }}
                        >
                          <Block>
                            <Text>{item.disease.name}:</Text>
                          </Block>
                          <Block
                            style={{
                              maxWidth: "60%",
                            }}
                          >
                            <Text>
                              {parseFloat(item.percentage * 100).toFixed(2) +
                                "%"}
                            </Text>
                          </Block>
                        </Block>
                      );
                    })
                  ) : (
                    <Block></Block>
                  )}
                </ListItem.Content>
              </ListItem>
            </Collapsible>

            <ExaminationDetailRow
              title={"Examination date:"}
              content={moment(data?.examination?.createdAt).format(
                "DD-MM-YYYY HH:mm"
              )}
            />
            <ExaminationDetailRow
              title={"Status:"}
              content={capitalizeTheFirstLetterOfEachWord(
                data?.examination?.status || ""
              )}
            />
            <ExaminationDetailRow
              title={"Description:"}
              content={data?.examination?.customerDescription}
            />
            <ExaminationDetailRow
              title={"Doctor feedback:"}
              content={data?.examination?.doctorFeedback || "Not yet"}
            />

            {/* <ScrollView
      
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 10 }}
    >
      
      <View>
        <View style={styles.resultBox}>
          <Divider style={{ backgroundColor: "#ECECEC" }} />
          <Block flex width={width} center space="between">
            <Block style={styles.block}>
              <Block flex={1}>
                <Text style={styles.titleBlock}>
                  Basic information:
                </Text>
              </Block>
              <Block flex={1}>
                <Text style={styles.diseaseText}>
                  {data?.examination?.disease?.name}
                </Text>
                <Text style={styles.diseaseDesText}>
                  {data?.examination?.createdAt}
                </Text>
              </Block>
            </Block>
            <Block style={styles.block}>
              <Text style={styles.diseaseText}>Predict result</Text>
              <Block row middle space="evenly">
                {data?.examination?.examinationDetails ? (
                  data?.examination?.examinationDetails.map((item, index) => {
                    return (
                      <Block key={index}>
                        <Text style={styles.diseasesText}>
                          {item.disease.name}
                        </Text>
                        <Text style={styles.diseaseDesText}>
                          {item.percentage}
                        </Text>
                      </Block>
                    );
                  })
                ) : (
                  <Block></Block>
                )}
              </Block>
            </Block>

            <Block style={styles.block}>
              <Text style={styles.diseaseText}>Description</Text>
              <Text style={styles.diseaseDesText}>
                {data?.examination?.customerDescription}
              </Text>
            </Block>
            <Block style={styles.block}>
              <Text style={styles.diseaseText}>Status</Text>
              <Text style={styles.diseaseDesText}>Pending</Text>
            </Block>
            <Block style={styles.block}>
              <Text style={styles.diseaseText}>Doctor Feedback</Text>
              {data?.examination?.doctorFeedback ? (
                <ListItem
                  containerStyle={{
                    borderRadius: 10,
                    marginVertical: 5,
                    width: width,
                  }}
                >
                  <Avatar
                    rounded
                    source={{
                      uri:
                        data?.examination?.doctor?.profileImage ||
                        "https://via.placeholder.com/150",
                    }}
                  />
                  <ListItem.Content>
                    <ListItem.Title
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      {data?.examination?.doctor?.name}
                    </ListItem.Title>
                    <ListItem.Subtitle style={{ color: "black" }}>
                      {data?.examination?.doctorFeedback}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron color="#ECECEC" />
                </ListItem>
              ) : (
                <Text style={styles.diseaseDesText}>Not yet</Text>
              )}
            </Block>
          </Block>
        </View>
      </View>
      
    </ScrollView> */}
          </Block>
        </Block>
      </ScrollView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: argonTheme.COLORS.WHITE,
  },
  cover: {
    width: width,
    aspectRatio: 1,
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  profileCard: {
    // position: "relative",
    // padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    borderRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  profileBackground: {
    width: width,
    height: height,
  },
  resultBox: {
    borderRadius: 5,
    backgroundColor: argonTheme.COLORS.WHITE,
    flex: 1,
  },
  titleBlock: {
    color: argonTheme.COLORS.BLACK,
    fontWeight: "600",
    fontSize: 18,
    textAlign: "left",
  },
  diseaseText: {
    color: argonTheme.COLORS.BLACK,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "left",
  },
  diseasesText: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  diseaseDesText: {
    color: argonTheme.COLORS.DEFAULT,
    fontWeight: "300",
    fontSize: 12,
    textAlign: "left",
    paddingLeft: 5,
  },
  block: {
    padding: 5,

    borderColor: argonTheme.COLORS.PRIMARY,
    borderWidth: 1,
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.PRIMARY,

    width: width - 10,
    backgroundColor: argonTheme.COLORS.WHITE,
    minHeight: width * 0.2,
    marginVertical: 2,
  },
});
export default ExaminationsDetail;
