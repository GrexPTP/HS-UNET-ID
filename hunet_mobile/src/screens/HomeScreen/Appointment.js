import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import { gql, useQuery } from "@apollo/client";
import Spinner from "react-native-loading-spinner-overlay";
import { Block, theme, NavBar, Text } from "galio-framework";
import { Header, Icon } from "../../components";
import { Images, argonTheme } from "../../constants";
import { ListItem, Avatar, Divider } from "react-native-elements";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { Button } from "react-native-elements";

const { width } = Dimensions.get("screen");

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
      }
      limit
      page
      totalCount
    }
  }
`;

const Appointment = ({ navigation }) => {
  const [dataSrc, setDataSrc] = useState([]);
  const [date, setDate] = useState(moment.utc().local().format());

  const {
    loading: apmLoading,
    data: appointments,
    error: apmErr,
    refetch,
    networkStatus,
  } = useQuery(GET_APPOINTMENTS, {
    variables: {
      pagination: {
        filter: JSON.stringify({
          date: date,
          status: 1,
        }),
        limit: 10,
        order: "DESC",
        page: 1,
      },
    },
  });

  useEffect(() => {
    if (appointments) {
      setDataSrc(appointments.appointments.data);
    }
  }, [appointments]);

  const renderItem = ({ item, index }) => {
    return (
      <ListItem
        containerStyle={{
          borderRadius: 10,
          marginVertical: 5,
          width: width,
          width: width * 0.9,
          borderWidth: 1,
          borderColor: argonTheme.COLORS.PRIMARY,
          shadowColor: argonTheme.COLORS.PRIMARY,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          shadowOpacity: 0.2,
          elevation: 2,
        }}
      >
        <ListItem.Content>
          <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
            {item.doctor.name}
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: argonTheme.COLORS.PRIMARY }}>
            {item.doctor.biography}
          </ListItem.Subtitle>
          <ListItem.Subtitle style={{ color: "black", marginVertical: 4 }}>
            {moment(item.meetingTime).format("HH:mm DD-MM-YYYY")}
          </ListItem.Subtitle>
          <ListItem.Subtitle style={{ color: argonTheme.COLORS.WARNING }}>
            {item.status ? item.status : "Waiting..."}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color="#ECECEC" />
      </ListItem>
    );
  };

  const datesWhitelist = [
    new Date(),
    {
      start: new Date(),
      end: new Date().setDate(new Date().getDate() + 6),
    },
  ];

  const EmptyListMessage = ({ item }) => {
    return (
      <Block>
        <Text style={styles.emptyListStyle}>You have no appointments</Text>
        <Button
          onPress={() => {
            navigation.navigate("Appointment");
          }}
          title="Recently Appoinment"
          type="clear"
        />
        <Button
          onPress={() => {
            navigation.navigate("Appointment", {
              screen: "DoctorList",
            });
          }}
          title="Make appointment"
          type="clear"
        />
      </Block>
    );
  };

  return (
    <Block flex>
      <Block flex>
        <CalendarStrip
          calendarAnimation={{ type: "sequence", duration: 30 }}
          daySelectionAnimation={{
            type: "border",
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: "white",
          }}
          style={{ paddingTop: 10, paddingBottom: 10, borderRadius: 5 }}
          calendarHeaderStyle={{ color: "white" }}
          calendarColor={"#7743CE"}
          dateNumberStyle={{ color: "white" }}
          dateNameStyle={{ color: "white" }}
          highlightDateNumberStyle={{ color: "yellow" }}
          highlightDateNameStyle={{ color: "yellow" }}
          disabledDateNameStyle={{ color: "grey" }}
          disabledDateNumberStyle={{ color: "grey" }}
          iconContainer={{ flex: 0.1 }}
          selectedDate={date}
          scrollable={true}
          datesWhitelist={datesWhitelist || []}
          onDateSelected={(date) => {
            setDate(date);
          }}
        />
      </Block>
      <Block flex style={{ marginTop: 5 }}>
        <Text h5 bold>
          Recently Appointment
        </Text>
        <Block>
          <Spinner
            visible={apmLoading}
            textContent={"Loading..."}
            textStyle={{ color: "#ffffff" }}
          />
          <Block>
            <FlatList
              data={dataSrc}
              extraData={dataSrc}
              renderItem={renderItem}
              contentContainerStyle={styles.articles}
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0.01}
              ListEmptyComponent={EmptyListMessage}
              maxToRenderPerBatch={10}
            />
          </Block>
        </Block>
      </Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  articles: {
    width: width - theme.SIZES.BASE,
    paddingBottom: 20,
    alignItems: "center",
  },
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: "center",
  },
});
export default Appointment;
