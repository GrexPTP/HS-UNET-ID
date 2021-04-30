//
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import { Block, theme, NavBar, Text, Icon, Button } from "galio-framework";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { Images, argonTheme } from "../../constants";
import { Header } from "../../components";
import HistoryCard from "../../components/HistoryCard";
import history from "../../constants/history";
const { width } = Dimensions.get("screen");
import Spinner from "react-native-loading-spinner-overlay";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { SearchBar, Divider } from "react-native-elements";
import AnimatedHideView from "react-native-animated-hide-view";

const GET_EXAMINATIONS = gql`
  query examinations($pagination: PaginationDto!) {
    examinations(pagination: $pagination) {
      data {
        createdAt
        customerDescription
        disease {
          name
        }
        doctorFeedback
        id
        image
        resultImage
        status
      }
      limit
      page
      totalCount
    }
  }
`;
const ExaminationsList = ({ navigation }) => {
  const [filter, setFilter] = useState("");
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("DESC");
  const [page, setPage] = useState(1);
  const [dataSrc, setDataSrc] = useState([]);
  const [showSearch, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showOption, setOption] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const { loading, data, error, fetchMore, refetch, networkStatus } = useQuery(
    GET_EXAMINATIONS,
    {
      variables: {
        pagination: { filter, limit, order, page },
      },
      pollInterval: 500,
    }
  );
  useEffect(() => {
    if (data) {
      setDataSrc(data?.examinations?.data);
    }
  }, [data]);

  const renderItem = ({ item, index }) => (
    <HistoryCard
      key={index}
      item={item}
      id={item.id}
      style={styles.card}
      route="ExaminationsDetail"
    />
  );
  const mySeparator = () => <Divider style={{ backgroundColor: "blue" }} />;

  const EmptyListMessage = ({ item }) => {
    return <Text style={styles.emptyListStyle}>You have no examinations</Text>;
  };

  return (
    <Block flex center style={styles.home}>
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "#ffffff" }}
      />
      <Header title="Examination List" />
      <AnimatedHideView
        visible={showSearch}
        style={{ height: showSearch ? "auto" : 0 }}
      >
        <SearchBar
          placeholder="Type Here..."
          onChangeText={(search) => {
            setSearchText(search);
          }}
          lightTheme
          round
          inputContainerStyle={{
            backgroundColor: "#ECECEC",

            borderRadius: 10,
          }}
          containerStyle={{
            backgroundColor: argonTheme.COLORS.PRIMARY,
            width: width,
            borderWidth: 0,
            borderColor: "transparent",
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
          }}
          placeholderTextColor={"#g5g5g5"}
          placeholder={"Seach here..."}
          value={searchText}
          showCancel
        />
      </AnimatedHideView>
      <FlatList
        data={dataSrc}
        extraData={dataSrc}
        renderItem={renderItem}
        ListEmptyComponent={EmptyListMessage}
        contentContainerStyle={styles.articles}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.01}
        ItemSeparatorComponent={mySeparator}
        maxToRenderPerBatch={10}
        refreshControl={
          <RefreshControl
            refreshing={networkStatus === 4}
            onRefresh={() => {
              setLimit(10);
              refetch();
            }}
          />
        }
        ListFooterComponent={() => (
          <Block center>
            {dataSrc.length < totalCount && (
              <ActivityIndicator size="large" color="#00ff00" />
            )}
          </Block>
        )}
        onEndReached={(distanceFromEnd) => {
          let pagination = {
            filter,
            limit: limit + 10,
            order,
            page,
          };
          setLimit(limit + 10);
          fetchMore({
            variables: { pagination: pagination },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              const newEdges = fetchMoreResult.examinations.data;
              const pageCrr = fetchMoreResult.examinations.page;
              setPage(fetchMoreResult.examinations.page);
              if (newEdges.length) {
                setDataSrc(newEdges);
              }
              return newEdges.length
                ? {
                    examinations: {
                      data: newEdges,
                    },
                  }
                : previousResult;
            },
          });
        }}
      />
    </Block>
  );
};
const styles = StyleSheet.create({
  home: {
    width: width,
    backgroundColor: argonTheme.COLORS.WHITE,
  },
  articles: {
    width: width - theme.SIZES.BASE * 1,
    paddingVertical: theme.SIZES.BASE,
  },
  card: {
    marginBottom: 10,
    // paddingVertical: 10
  },
});

export default ExaminationsList;
