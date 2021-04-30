import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  BackHandler,
  Alert,
} from "react-native";
import Toast from 'react-native-simple-toast';

import { Block, theme, NavBar, Text, Button } from "galio-framework";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
// import { Button, } from "react-native-elements";
import * as Sentry from "sentry-expo";
import { Card, Header } from "../../components";
import articles from "../../constants/articles";
import { useApolloClient } from "@apollo/client";
import { useLazyQuery, gql, useQuery } from "@apollo/client";
import { CommonActions } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import { ListItem, Avatar, Divider } from "react-native-elements";
import { signUser, signOut, getUser } from "../../Util";
import { argonTheme } from "../../constants";
import Icon from "react-native-vector-icons/Ionicons";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import NewsCarousel from "./NewsCarousel";
import Appointment from "./Appointment";
const GET_NEWS = gql`
  query allNews($pagination: PaginationDto!) {
    allNews(pagination: $pagination) {
      data {
        id
        description
        descriptionImage
        title
      }
      limit
      page
      totalCount
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
      birthDate
    }
  }
`;

const { width, height } = Dimensions.get("screen");

const HomeScreen = ({ navigation, route }) => {
  const [newsSrc, setNewsSrc] = useState([]);
  const [apmSrc, setApmSrc] = useState([]);
  const [queryUser, { loading, data, error }] = useLazyQuery(GET_USER);
  const [clickCount, setClickCount] = useState(0);
  const {
    loading: newsLoading,
    data: newsData,
    error: newsError,
    fetchMore,
  } = useQuery(GET_NEWS, {
    variables: {
      pagination: { filter: "", limit: 10, order: "DESC", page: 1 },
    },
  });

  const client = useApolloClient();

  useEffect(() => {
    if (newsData) {
      setNewsSrc(newsData.allNews.data);
    }
  }, [newsData]);

  useEffect(() => {
    try {
      const { user } = client.readQuery({
        query: GET_USER,
      });
    } catch (e) {
      queryUser({});
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", useDoubleBackPressExit);
    });
    const unsubscribes = navigation.addListener("blur", () => {
      console.log("here");
      BackHandler.removeEventListener(
        "hardwareBackPress",
        useDoubleBackPressExit
      );
    });

    return unsubscribe, unsubscribes;
  }, [navigation]);

  let clickCounts = 0;
  const useDoubleBackPressExit = () => {
    if (Platform.OS === "ios") return;
    if (clickCounts < 1) {
      setClickCount(clickCounts + 1);
      clickCounts += 1;
      Toast.showWithGravity(
        "Press again to exit!",
        Toast.SHORT,
        Toast.TOP
      );
    } else if (clickCounts === 1) {
      BackHandler.exitApp();
      return true;
    }
    setTimeout(() => {
      setClickCount(0);
      clickCounts = 0;
    }, 2000);
    return true;
  };

  return (
    <Block safe flex center style={styles.home}>
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "#ffffff" }}
      />
      <Header title="HUNET" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex space="between">
          <Block flex style={{ marginBottom: 10 }}>
            <NewsCarousel
              data={newsSrc}
              width={width}
              height={height}
              navigation={navigation}
              styles={styles}
            />
          </Block>
          <Appointment navigation={navigation} />
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  home: {
    width: width,
    backgroundColor: "white",
  },
  articles: {
    width: width,
    paddingBottom: theme.SIZES.BASE,
    alignItems: "center",
  },
  button: {
    height: 40,
    width: width / 3,
    backgroundColor: argonTheme.COLORS.WHITE,
    borderColor: argonTheme.COLORS.WARNING,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: argonTheme.COLORS.WARNING,
    shadowOpacity: 0.2,
  },
  text: {
    color: argonTheme.COLORS.WARNING,
    fontWeight: "500",
    fontSize: 20,
  },
  item: {
    width: width - 60,
    height: width - 60,
  },
  imageContainer: {
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: argonTheme.COLORS.WHITE,
    borderRadius: 8,
    height: height * 0.2,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
});

export default HomeScreen;
