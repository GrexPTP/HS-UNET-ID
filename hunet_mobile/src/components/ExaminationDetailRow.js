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

import { argonTheme } from "../constants/Theme";
import { Button, Icon, Input } from ".";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = width / 6;
class ExaminationDetailRow extends React.Component {
  render() {
    const {
      navigation,
      item,
      horizontal,
      full,
      style,
      imageStyle,
      route = "",
      title,
      content,
      press

    } = this.props;
    return (
      <ListItem
        bottomDivider
        Component={TouchableScale}
        activeScale={0.99}
        onPress={() => {
          if(press) press()
        }}
        containerStyle={{ borderRadius: 10, marginVertical: 2 }}
      >
      
        <ListItem.Content>
          <Block row space="between"flex={1} style={{
            width: '100%'
            }}>
            <Block>
              <Text>{title}</Text>
            </Block>
            <Block style={{
              maxWidth: '60%'
            }}>
              <Text>{content}</Text>
            </Block>
          </Block>
          
        </ListItem.Content>
        {/* <ListItem.Chevron color="white" /> */}
      </ListItem>
    );
  }
}

ExaminationDetailRow.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
};

const styles = StyleSheet.create({});

export default withNavigation(ExaminationDetailRow);
