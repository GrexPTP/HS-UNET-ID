import React, { useState, useEffect } from "react";
import {
  StyleSheet, Dimensions, ScrollView, Alert, Modal, View, TouchableHighlight
} from "react-native";
import { Block, theme, NavBar, Text, Button } from "galio-framework";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./style";
import { Avatar } from "react-native-elements";
import { Card } from "../../components";
import articles from "../../constants/articles";
import { argonTheme } from "../../constants";
import { Icon, Input } from "../../components";
import DatePicker from "react-native-datepicker";
const { width } = Dimensions.get("screen");

const ChooseDate = ({navigation, route }) => {
  const { name, specialty, image, description } = route.params;
  return (
    <Block flex center style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={styles.articles}
      >
        <Block style={styles.container}>
          <Block row>
            <Avatar size="large" rounded source={{ uri: image }} />
            <Block>
              <Text h6 style={{ marginLeft: 5, marginTop: 10 }}>{name}</Text>
              <Text h7 style={{ marginLeft: 5 }}>{specialty}</Text>
            </Block>
          </Block>
        </Block>
        <Block style={styles.container}>
          <Text h4>Chọn Ngày</Text>
          <Text muted>
            {description}
          </Text>
        </Block>
        <Block style={styles.container}>
          <Text h4>Chọn Khung Giờ</Text>
          <Text muted>Chưa có</Text>
          <Button color="#8898AA" shadowless
            onPress={() => {
              
            }}
          >
            Đặt lịch hẹn
          </Button>
        </Block>
      </ScrollView>
    </Block>
  );
};

export default ChooseDate;
