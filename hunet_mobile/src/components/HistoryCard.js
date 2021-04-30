import React from "react";
import { withNavigation } from "@react-navigation/compat";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator 
} from "react-native";
import { Image } from "react-native-elements";
import { Block, Text, theme } from "galio-framework";
import { ListItem, Avatar } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import moment from "moment";
import { argonTheme } from "../constants/Theme";
import { Button, Icon, Input } from ".";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = width / 6;
class HistoryCard extends React.Component {
  render() {
    const {
      navigation,
      item,
      id,
      route = "",
      nested = false,
      screen = "",
    } = this.props;

    return (
      <ListItem
        Component={TouchableScale}
        activeScale={0.95}
        containerStyle={{ borderRadius: 10, marginVertical: 2 }}
        onPress={() => {
          if (!nested)
            navigation.navigate(route, {
              id: id,
            });
          else {
            navigation.navigate(route, {
              screen: screen,
              params: { id: id },
            });
          }
        }}
      >
        {/* <Avatar rounded source={{ uri: item.image }} /> */}
        <Image
          source={{ uri: item?.image }}
          resizeMode="cover"
          style={styles.thumb}
          PlaceholderContent={<ActivityIndicator />}

        />
        <ListItem.Content>
          <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
            {item.disease.name}
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: "black" }}>
            {moment(item.createdAt).format("HH:mm DD/MM/YYYY")}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color="#ECECEC" />
      </ListItem>
    );
  }
}

HistoryCard.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16,
  },
  cardTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6,
  },
  cardTitleScan: {
    textAlign: "center",
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: "hidden",
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: "auto",
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 215,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  button: {
    width: width * 0.3,
    marginTop: 0,
  },
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: "grey",
  },
  thumb: {
    borderRadius: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
});

export default withNavigation(HistoryCard);
