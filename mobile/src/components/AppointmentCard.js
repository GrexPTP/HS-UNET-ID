import React from "react";
import { withNavigation } from "@react-navigation/compat";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { ListItem, Avatar } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import moment from "moment";
import { argonTheme, appointment } from "../constants";
import { Button, Icon, Input } from ".";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = width / 6;
class AppointmentCard extends React.Component {
  render() {
    const {
      navigation,
      item,
      horizontal,
      full,
      style,
      imageStyle,
      route = "",
    } = this.props;

    return (
      <ListItem
        Component={TouchableScale}
        activeScale={0.99}
        onPress={() =>
          navigation.navigate("AppointmentDetail", {
            uri: item?.doctor.profileImage,
            disease: item.disease,
            date: moment(item.meetingTime).format("HH:mm:ss DD-MM-YYYY"),
            name: item.doctor.name,
            description: item.description,
            status: item.status,
            bio: item?.doctor?.biography,
            specialist: item?.doctor?.specialist,
          })
        }
        containerStyle={{ borderRadius: 10, marginVertical: 2 }}
      >
        <Avatar
          size="large"
          rounded
          source={{ uri: item?.doctor.profileImage }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
            {item.doctor?.name}
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: argonTheme.COLORS.PRIMARY }}>
            {item.doctor?.specialist}
          </ListItem.Subtitle>
          <ListItem.Subtitle style={{ color: "black" }}>
            {moment(item.meetingTime).format("HH:mm DD-MM-YYYY")}
          </ListItem.Subtitle>
          <ListItem.Subtitle
            style={{ color: appointment[item.status + 1].color }}
          >
            {appointment[item.status + 1].text}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color="white" />
      </ListItem>
    );
  }
}

AppointmentCard.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
};

const styles = StyleSheet.create({});

export default withNavigation(AppointmentCard);
