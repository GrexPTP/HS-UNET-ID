import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import { Block, theme, NavBar, Text, Button } from "galio-framework";
import ActionButton from "react-native-action-button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import doctor from "../../constants/doctor";
import AppointmentCard from "../../components/AppointmentCard";
import appointment from "../../constants/appointment";
const { width } = Dimensions.get("screen");
import Spinner from "react-native-loading-spinner-overlay";
import { getStatusBarHeight } from "react-native-status-bar-height";
import AnimatedHideView from "react-native-animated-hide-view";
import { FloatingAction } from "react-native-floating-action";
import { SearchBar, Divider } from "react-native-elements";
import { Images, argonTheme } from "../../constants";
import { Header, Icon } from "../../components";
import { NetworkStatus } from "@apollo/client";

const actions = [
  {
    text: "Make an appointment",
    color: argonTheme.COLORS.PRIMARY,
    icon: <Icon size={16} color={"#fff"} name="pen-tool" family="Feather" />,
    name: "bt_app",
    position: 1,
  },
  {
    text: "View doctors list",
    color: argonTheme.COLORS.PRIMARY,
    icon: (
      <Icon
        size={16}
        color={"#fff"}
        name="list"
        family="Foundation"
        // style={styles.inputIcons}
      />
    ),
    name: "bt_doctors",

    position: 2,
  },
];
const GET_APPOINTMENTS = gql`
  query appointments($pagination: PaginationDto!) {
    appointments(pagination: $pagination) {
      data {
        createdAt
        description
        doctor {
          profileImage
          name
          biography
          specialist
        }
        meetingTime
        patient {
          name
        }
        createdAt
        description
        status
      }
      limit
      page
      totalCount
    }
  }
`;
const AppointmentList = ({ navigation }) => {
  const [filter, setFilter] = useState("");
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("DESC");
  const [page, setPage] = useState(1);
  const [showSearch, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [dataSrc, setDataSrc] = useState([]);
  const {
    loading,
    data: appointments,
    error,
    fetchMore,
    refetch,
    networkStatus,
  } = useQuery(GET_APPOINTMENTS, {
    variables: { pagination: { filter, limit, order, page } },
    pollInterval: 500,
  });

  useEffect(() => {
    if (appointments) {
      setDataSrc(appointments?.appointments?.data);
      setTotalCount(appointments.appointments.totalCount);
    }
  }, [appointments]);

  const renderItem = ({ item, index }) => (
    <AppointmentCard item={item} key={index} horizontal style={styles.card} />
  );

  const EmptyListMessage = ({ item }) => {
    return (
      <Text style={styles.emptyListStyle}>
        You have no appointments for this day
      </Text>
    );
  };

  const mySeparator = () => <Divider style={{ backgroundColor: "blue" }} />;
  return (
    <Block flex center style={styles.home}>
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "#ffffff" }}
      />
      <Header title="Appointment List" />
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
      <Block flex>
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
      <ActionButton
        buttonColor={argonTheme.COLORS.PRIMARY}
        onPress={() => {
          navigation.navigate("DoctorList");
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
    width: width - theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE,
    paddingBottom: 20,
  },
});

export default AppointmentList;
