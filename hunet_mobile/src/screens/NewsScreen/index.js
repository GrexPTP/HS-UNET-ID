import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import Spinner from "react-native-loading-spinner-overlay";
import { Block, theme, NavBar, Text, Button } from "galio-framework";
import { Header, Icon } from "../../components";
import { Images, argonTheme } from "../../constants";
import { Image, Divider } from "react-native-elements";
import moment from "moment";
const { width, height } = Dimensions.get("screen");

const GET_NEWS = gql`
  query news($id: Int!) {
    news(id: $id) {
      createdAt
      content
      creator {
        name
      }
      description
      descriptionImage
      title
    }
  }
`;

const NewsScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [news, setNews] = useState(null);
  const { loading: newsLoading, data: newsData, error: newsError } = useQuery(
    GET_NEWS,
    {
      variables: {
        id: id,
      },
    }
  );
  const goBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    if (newsData) {
      console.log(
        "🚀 ~ file: index.js ~ line 39 ~ useEffect ~ newsData",
        newsData
      );
      setNews(newsData.news);
      console.log(moment(newsData.news.createdAt).format("LLLL"));
    }
  }, [newsData]);
  return (
    <Block safe flex center style={styles.home}>
      <Header
        title={news?.title}
        navigation={navigation}
        leftComponent={{
          icon: "caret-back",
          color: argonTheme.COLORS.PRIMARY,
          type: "ionicon",
          onPress: goBack,
        }}
      />
      <Spinner
        visible={newsLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#ffffff" }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>
          <Block flex>
            <Image
              style={styles.image}
              source={{ uri: news?.descriptionImage }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </Block>
          <Block style={styles.content} flex>
            <Text h3 bold>
              {news?.title}
            </Text>
            <Divider style={{ marginTop: 10 }} />
            <Text bold p>
              {news?.creator?.name}
            </Text>
            <Text muted>{moment(newsData.news.createdAt).format("LLLL")}</Text>
            <Divider style={{ marginBottom: 10 }} />
            <Text p>{news?.content}</Text>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    aspectRatio: 1.5,
    width: width,
    resizeMode: "contain",
  },
  articles: {
    width: width,
    paddingBottom: theme.SIZES.BASE,
  },
  home: {
    width: width,
    backgroundColor: "white",
  },
  content: {
    paddingLeft: 10,
  },
});
export default NewsScreen;
