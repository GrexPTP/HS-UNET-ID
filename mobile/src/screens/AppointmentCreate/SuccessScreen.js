import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  Modal,
  View,
  TouchableHighlight,
} from "react-native";
import { Block, theme, NavBar, Text, Button, Input } from "galio-framework";
import Spinner from "react-native-loading-spinner-overlay";
import styles from "./style";
import { Avatar, Divider, Icon } from "react-native-elements";
import { argonTheme } from "../../constants";
const { width, height } = Dimensions.get("screen");
import { Header } from "../../components";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { gql, useMutation } from "@apollo/client";
import { render } from "react-dom";

const SuccessScreen = ({ navigation, route }) => {
  const { appointment } = route.params;

  const goBack = () => {
    navigation.navigate("AppointmentList");
  };

  return (
    <Block flex center style={styles.home}>
      <Header title="Appointment Information" navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={styles.articles}
      >
        <Block center style={styles.container}>
          <Icon
            name="check-circle-outline"
            color={argonTheme.COLORS.SUCCESS}
            size={60}
          />
          <Text h5 color={argonTheme.COLORS.SUCCESS}>
            Make appointment success
          </Text>
        </Block>
        <Block flex style={styles.container}>
          <Block style={{ marginTop: 5 }}>
            <Text p>Meeting time</Text>
            <Text h5 style={{ fontWeight: "bold" }}>
              {moment.utc(appointment.meetingTime).format("HH:mm:ss DD-MM-YYYY")}
            </Text>
            <Divider style={{ backgroundColor: "blue" }} />
          </Block>
          <Block style={{ marginTop: 5 }}>
            <Text p>Doctor</Text>
            <Text h5 style={{ fontWeight: "bold" }}>
              {appointment.doctor?.name}
            </Text>
            <Divider style={{ backgroundColor: "blue" }} />
          </Block>
          <Block style={{ marginTop: 5 }}>
            <Text p>Description</Text>
            <Text h5 style={{ fontWeight: "bold" }}>
              {appointment.description}
            </Text>
            <Divider style={{ backgroundColor: "blue" }} />
          </Block>
          <Block style={{ marginTop: 5 }}>
            <Text p>Date create</Text>
            <Text h5 style={{ fontWeight: "bold" }}>
              {moment(appointment.createdAt).format("HH:mm:ss DD-MM-YYYY")}
            </Text>
            <Divider style={{ backgroundColor: "blue" }} />
          </Block>
        </Block>
        <Block flex center style={{ marginTop: 5 }}>
          <Button
            onPress={() => {
              goBack();
            }}
            size="large"
            color="success"
          >
            DONE
          </Button>
        </Block>
      </ScrollView>
    </Block>
  );
};

export default SuccessScreen;
