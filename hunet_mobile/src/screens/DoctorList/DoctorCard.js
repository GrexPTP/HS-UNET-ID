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
import TouchableScale from "react-native-touchable-scale";
import { argonTheme } from "../../constants";

const { width, height } = Dimensions.get("screen");
const DoctorCard = ({
  navigation,
  item,
  horizontal,
  full,
  style,
  ctaColor,
  imageStyle,
  route = "",
}) => {
  return (
    <ListItem
      Component={TouchableScale}
      activeScale={0.95}
      style={styles.card}
      bottomDivider
      onPress={() =>
        navigation.navigate("AppointmentCreate", {
          item: item,
        })
      }
    >
      {item.profileImage ? (
        <Avatar rounded source={{ uri: item.profileImage }} />
      ) : (
        <Avatar rounded title="BS" />
      )}
      <ListItem.Content>
        <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
          {item.name}
        </ListItem.Title>
        <ListItem.Subtitle style={{ color: argonTheme.COLORS.PRIMARY }}>
          {item.specialist}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron color="#bcbcbc" />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: argonTheme.COLORS.WHITE,
    marginVertical: 2,
    // borderColor: argonTheme.COLORS.WHITE,
    borderRadius: 5,
  },
});

export default DoctorCard;
