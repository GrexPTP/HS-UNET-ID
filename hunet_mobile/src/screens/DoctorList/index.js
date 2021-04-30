import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Block, theme, NavBar, Text, Button } from "galio-framework";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Images, argonTheme } from "../../constants";
import { CommonActions } from "@react-navigation/native";
import { Header, Icon } from "../../components";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import DoctorCard from "./DoctorCard";
const { width } = Dimensions.get("screen");
const GET_DOCTORS = gql`
  query doctors($pagination: PaginationDto!) {
    doctors(pagination: $pagination) {
      data {
        # birthDate,
        email
        name
        id
        biography
        specialist
        profileImage
        schedules {
          startDate
          startTime
          endTime
        }
      }
      limit
      page
      totalCount
    }
  }
`;
const DoctorList = ({ navigation }) => {
  const [filter, setFilter] = useState("");
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("ASC");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [dataSrc, setDataSrc] = useState([]);
  const { loading, data, error, fetchMore, refetch, networkStatus } = useQuery(
    GET_DOCTORS,
    {
      variables: {
        pagination: { filter, limit, order, page },
      },
      pollInterval: 500,
    }
  );

  const renderItem = ({ item, index }) => (
    <DoctorCard
      item={item}
      horizontal
      style={styles.card}
      navigation={navigation}
    />
  );

  useEffect(() => {
    if (data) {
      console.log("🚀 ~ file: index.js ~ line 72 ~ useEffect ~ data", data);
      setDataSrc(data?.doctors?.data);
    }
  }, [data]);
  const goBack = () => {
    navigation.goBack();
  };

  const EmptyListMessage = ({ item }) => {
    return (
      <Text style={styles.emptyListStyle}>
        There are no doctors available right now
      </Text>
    );
  };

  if (loading) {
    return (
      <Block style={{ marginTop: 70, marginLeft: 20 }}>
        {Array.from({ length: 2 }).map((_, index) => (
          <Block key={index} style={{ marginBottom: 12 }}>
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item flexDirection="row">
                <SkeletonPlaceholder.Item
                  width={60}
                  height={60}
                  borderRadius={50}
                />
                <SkeletonPlaceholder.Item
                  flex={1}
                  justifyContent={"space-between"}
                  marginLeft={12}
                >
                  <SkeletonPlaceholder.Item
                    width="40%"
                    height={20}
                    borderRadius={6}
                  />
                  <SkeletonPlaceholder.Item
                    width="30%"
                    height={20}
                    borderRadius={6}
                  />
                  <SkeletonPlaceholder.Item
                    width="80%"
                    height={20}
                    borderRadius={6}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </Block>
        ))}
      </Block>
    );
  } else
    return (
      <Block flex center style={styles.home}>
        <Header
          title="Doctor List"
          navigation={navigation}
          leftComponent={{
            icon: "caret-back",
            color: argonTheme.COLORS.PRIMARY,
            type: "ionicon",
            onPress: goBack,
          }}
        />
        <FlatList
          data={dataSrc}
          ListEmptyComponent={EmptyListMessage}
          renderItem={renderItem}
          contentContainerStyle={styles.articles}
          keyExtractor={(item) => item.id}
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
            if (dataSrc.length >= totalCount) {
              return;
            }
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
                const newEdges = fetchMoreResult.appointments.data;
                const pageCrr = fetchMoreResult.appointments.page;
                setPage(fetchMoreResult.appointments.page);
                if (newEdges.length) {
                  setDataSrc(newEdges);
                }
                return newEdges.length
                  ? {
                      appointments: {
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
    backgroundColor: theme.COLORS.WHITE,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  card: {
    marginBottom: 10,
  },
});

export default DoctorList;
