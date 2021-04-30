import { useState, useEffect, useRef } from "react";
import * as React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme, Toast } from "galio-framework";
import Spinner from "react-native-loading-spinner-overlay";
import { Images, argonTheme, appointment } from "../../constants";
import { HeaderHeight } from "../../constants/utils";
import { Header, Icon } from "../../components";

const { width, height } = Dimensions.get("screen");
console.log("🚀 ~ file: index.js ~ line 15 ~ appointment", appointment);
const AppointmentDetail = ({ navigation, route }) => {
  const {
    uri,
    disease,
    date,
    time,
    name,
    description,
    status,
    specialist,
    bio,
  } = route.params;
  const goBack = () => {
    navigation.goBack();
  };
  let statusArr = [
    {
      color: argonTheme.COLORS.ERROR,
      text: "Declined",
    },
    {
      color: argonTheme.COLORS.WARNING,
      text: "Pending...",
    },
    {
      color: argonTheme.COLORS.SUCCESS,
      text: "Accepted",
    },
  ];
  return (
    <Block flex style={styles.profile}>
      <Header
        title="Appointment Detail"
        navigation={navigation}
        leftComponent={{
          icon: "caret-back",
          color: argonTheme.COLORS.PRIMARY,
          type: "ionicon",
          onPress: goBack,
        }}
      />
      <Block flex>
        <Block style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: "1%" }}
            contentContainerStyle={{ paddingBottom: 60 }}
          >
            <Block flex style={styles.profileCard}>
              <Block flex>
                <Block row>
                  <Image
                    source={{ uri: uri }}
                    resizeMode="cover"
                    style={styles.thumb}
                  />
                  <Block flex>
                    <Text
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        marginTop: 15,
                      }}
                    >
                      {name}
                    </Text>
                    <Text style={{ color: argonTheme.COLORS.PRIMARY }}>
                      {specialist}
                    </Text>
                    <Text>{bio}</Text>
                  </Block>
                </Block>

                <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                  <Block style={styles.divider} />
                </Block>
                <Block row space="between">
                  <Text
                    bold
                    size={16}
                    color="#525F7F"
                    style={{ marginTop: 12 }}
                  >
                    Meeting time
                  </Text>
                </Block>
                <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                  <Text size={16} color="#525F7F" style={{ marginTop: 12 }}>
                    {date}
                  </Text>
                </Block>
                <Block row space="between">
                  <Text
                    bold
                    size={16}
                    color="#525F7F"
                    style={{ marginTop: 12 }}
                  >
                    Description
                  </Text>
                </Block>
                <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                  <Text size={16} color="#525F7F" style={{ marginTop: 12 }}>
                    {description}
                  </Text>
                </Block>
                <Block row space="between">
                  <Text
                    bold
                    size={16}
                    color="#525F7F"
                    style={{ marginTop: 12 }}
                  >
                    Status
                  </Text>
                </Block>
                <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                  <Text
                    size={16}
                    color={appointment[status + 1].color}
                    style={{
                      marginTop: 12,
                    }}
                  >
                    {appointment[status + 1].text}
                  </Text>
                </Block>
              </Block>
            </Block>
          </ScrollView>
        </Block>
      </Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  cover: {
    // flex: 1,
    height: height * 0.8,
    width: width,
  },
  container: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  resultBox: {
    borderRadius: 5,
    backgroundColor: "white",
    height: height * 0.2,
    width: width,
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
  profile: {
    marginTop: 1,
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
    height: height / 2,
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 10,
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
    borderRadius: 10,
    marginVertical: 4,
    alignSelf: "flex-start",
    width: (width - 48 - 32) / 3,
    height: (width - 48 - 32) / 3,
    marginRight: 10,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
export default AppointmentDetail;
