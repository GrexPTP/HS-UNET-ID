import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  Modal,
  View,
  ActivityIndicator,
} from "react-native";
import {
  Block,
  theme,
  NavBar,
  Text,
  Button,
  Input,
  Toast,
} from "galio-framework";
import Spinner from "react-native-loading-spinner-overlay";
import styles from "./style";
import { Avatar, Overlay, Divider } from "react-native-elements";
import { argonTheme } from "../../constants";
const { width, height } = Dimensions.get("screen");
import { Header } from "../../components";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { gql, useMutation } from "@apollo/client";

const CREATE_APPOINTMENT = gql`
  mutation createAppointment($createAppointmentInput: CreateAppointmentInput!) {
    createAppointment(createAppointmentInput: $createAppointmentInput) {
      createdAt
      description
      doctor {
        name
      }
      id
      meetingTime
      patient {
        name
      }
    }
  }
`;

const AppointmentCreate = ({ navigation, route }) => {
  const { item } = route.params;
  const [date, setDate] = useState(moment.utc().local().format());
  const [time, setTime] = useState();
  const [buttonTimeState, setTimeDateState] = useState([]);
  const [buttonTimeSelectedState, setButtonTimeSelectedState] = useState([]);
  const [morningList, setMorningList] = useState([]);
  const [afternoonList, setAfternoonList] = useState([]);
  const [eveningList, setEveningList] = useState([]);
  const [dateLoading, setDateLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [isToast, setToast] = useState(false);
  const [
    createAppointment,
    { data: appointmentData, error: mutationError, loading: mutationLoading },
  ] = useMutation(CREATE_APPOINTMENT);

  useEffect(() => {}, [mutationError]);

  useEffect(() => {
    if (appointmentData) {
      navigation.navigate("SuccessScreen", {
        appointment: appointmentData.createAppointment,
      });
    }
  }, [appointmentData]);
  useEffect(() => {
    if (isToast) {
      setTimeout(function () {
        setToast(false);
      }, 1000);
    }
  }, [isToast]);

  useEffect(() => {
    if (item) {
      const { schedules } = item;
      var buttonTimeState = [];
      var buttonTimeSelectedState = [];
      var morningArr = [];
      var eveningArr = [];
      var afternoonArr = [];
      for (var i = 0; i < schedules.length; i++) {
        var startDate = schedules[i].startDate;
        var isSameDay = moment
          .utc(startDate, "YYYY-MM-DD")
          .local()
          .isSame(moment.utc(date, "YYYY-MM-DD").local(), "day"); // true

        if (isSameDay) {
          var obj = {
            id: i,
            startTime: schedules[i].startTime,
            endTime: schedules[i].endTime,
            startDate: schedules[i].startDate,
          };
          switch (getGreetingTime(schedules[i].startTime)) {
            case 0:
              afternoonArr.push(obj);
              break;
            case 1:
              eveningArr.push(obj);
              break;

            case 2:
              morningArr.push(obj);
              break;
          }
        }
        buttonTimeState.push(false);
        buttonTimeSelectedState.push(false);
      }
      setTimeDateState(buttonTimeState);
      setButtonTimeSelectedState(buttonTimeSelectedState);
      console.log(
        "🚀 ~ file: index.js ~ line 88 ~ useEffect ~ morningArr",
        morningArr
      );
      setMorningList(morningArr);
      setAfternoonList(afternoonArr);
      setEveningList(eveningArr);
      setTimeout(() => {
        setDateLoading(false);
      }, 500);
    }
  }, [item, date]);

  const setSelectTime = (index) => {
    const currentState = [...buttonTimeSelectedState];

    for (var i = 0; i < currentState.length; i++) {
      currentState[i] = i == index;
    }
    setButtonTimeSelectedState(currentState);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const datesWhitelist = [
    new Date(),
    {
      start: new Date(),
      end: new Date().setDate(new Date().getDate() + 6),
    },
  ];

  const getGreetingTime = (m) => {
    var g = null; //return g
    var split_afternoon = 12; //24hr time to split the afternoon
    var split_evening = 17; //24hr time to split the evening
    var startTime = m;
    var currentHour = moment.utc(startTime).format("HH");
    if (currentHour >= split_afternoon && currentHour <= split_evening) {
      //afternoon
      g = 0;
    } else if (currentHour >= split_evening) {
      //evening
      g = 1;
    } else {
      //morning
      g = 2;
    }
    return g;
  };

  const onCreateAppointment = () => {
    setVisible(false);
    var meetingTime = moment(
      moment(date).format("DD-MM-YYYY") + " " + moment(time).format("HH:mm:ss"),
      "DD-MM-YYYY HH:mm:ss"
    );
    var appointment = {
      description: description,
      doctorId: item.id,
      meetingTime: meetingTime,
    };

    createAppointment({
      variables: { createAppointmentInput: appointment },
    });
  };

  return (
    <Block flex center style={styles.home}>
      <Toast isShow={isToast} positionIndicator="top" color="warning">
        Please select Date and Time.
      </Toast>
      <Spinner
        visible={mutationLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#ffffff" }}
      />
      <Header
        title="Create Appointment"
        navigation={navigation}
        leftComponent={{
          icon: "caret-back",
          color: argonTheme.COLORS.PRIMARY,
          type: "ionicon",
          onPress: goBack,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={styles.articels}
      >
        <Block style={styles.container}>
          <Block row>
            <Avatar
              size="large"
              rounded
              source={{
                uri: item.profileImage
                  ? item.profileImage
                  : "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
              }}
            />
            <Block>
              <Text h6 style={{ marginLeft: 5, marginTop: 10 }}>
                {item.name}
              </Text>
              <Text h7 style={{ marginLeft: 5 }}>
                {item.specialist}
              </Text>
            </Block>
          </Block>
        </Block>
        <Block style={styles.container}>
          <Text h4>About me</Text>
          <Text muted>
            {item.specialist ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
          </Text>
        </Block>
        <Block style={styles.container}>
          <Text h4>Đặt Hẹn</Text>
          <CalendarStrip
            calendarAnimation={{ type: "sequence", duration: 30 }}
            daySelectionAnimation={{
              type: "background",
              duration: 200,
              borderWidth: 1,
              borderHighlightColor: argonTheme.COLORS.PRIMARY,
              highlightColor: argonTheme.COLORS.PRIMARY,
            }}
            style={{ paddingTop: 10, paddingBottom: 10, borderRadius: 5 }}
            calendarHeaderStyle={{ color: argonTheme.COLORS.PRIMARY }}
            dateNumberStyle={{ color: argonTheme.COLORS.PRIMARY_BACKGROUND }}
            dateNameStyle={{ color: argonTheme.COLORS.PRIMARY_BACKGROUND }}
            highlightDateNumberStyle={{ color: argonTheme.COLORS.WHITE }}
            highlightDateNameStyle={{ color: argonTheme.COLORS.WHITE }}
            disabledDateNameStyle={{ color: "grey" }}
            disabledDateNumberStyle={{ color: "grey" }}
            iconContainer={{ flex: 0.1 }}
            selectedDate={date}
            scrollable={true}
            datesWhitelist={datesWhitelist || []}
            minDate={moment().startOf("isoWeeks")}
            maxDate={moment().add("days", 7)}
            onDateSelected={(date) => {
              setDateLoading(true);
              setDate(date);
            }}
          />
          {dateLoading ? (
            <ActivityIndicator size="large" color={argonTheme.COLORS.PRIMARY} />
          ) : (
            <Block>
              {morningList.length > 0 ? (
                <Block>
                  <Text h5 style={{}}>
                    Sáng
                  </Text>
                  <Block  row flex safe>
                    {morningList.map((item, index) => {
                      return (
                        <Button
                          key={index}
                          style={
                            !buttonTimeState[item.id]
                              ? buttonTimeSelectedState[item.id]
                                ? { ...styles.timeSelectedButtons }
                                : { ...styles.timeButtons }
                              : { ...styles.timeDisabledButtons }
                          }
                          disabled={buttonTimeState[item.id]}
                          onPress={() => {
                            setSelectTime(item.id);
                            setTime(item.startTime);
                          }}
                        >
                          <Block>
                            <Text style={styles.timeText}>
                              {moment.utc(item.startTime).format("HH:mm")} -
                              {moment.utc(item.endTime).format("HH:mm")}
                            </Text>
                          </Block>
                        </Button>
                      );
                    })}
                  </Block>
                </Block>
              ) : (
                <></>
              )}

              {afternoonList.length > 0 ? (
                <Block>
                  <Text h5 style={{}}>
                    Chiều
                  </Text>
                  <Block  row flex safe style={{ flexWrap: "wrap" }}>
                    {afternoonList.map((item, index) => {
                      return (
                        <Button
                          key={index}
                          style={
                            !buttonTimeState[item.id]
                              ? buttonTimeSelectedState[item.id]
                                ? { ...styles.timeSelectedButtons }
                                : { ...styles.timeButtons }
                              : { ...styles.timeDisabledButtons }
                          }
                          disabled={buttonTimeState[item.id]}
                          onPress={() => {
                            setSelectTime(item.id);
                            setTime(item.startTime);
                          }}
                        >
                          <Block>
                            <Text style={styles.timeText}>
                              {moment.utc(item.startTime).format("HH:mm")} -
                              {moment.utc(item.endTime).format("HH:mm")}
                            </Text>
                          </Block>
                        </Button>
                      );
                    })}
                  </Block>
                </Block>
              ) : (
                <></>
              )}
              {eveningList.length > 0 ? (
                <Block>
                  <Text h5 style={{}}>
                    Tối
                  </Text>
                  <Block row flex safe>
                    {eveningList.map((item, index) => {
                      return (
                        <Button
                          key={index}
                          style={
                            !buttonTimeState[item.id]
                              ? buttonTimeSelectedState[item.id]
                                ? { ...styles.timeSelectedButtons }
                                : { ...styles.timeButtons }
                              : { ...styles.timeDisabledButtons }
                          }
                          disabled={buttonTimeState[item.id]}
                          onPress={() => {
                            setSelectTime(item.id);
                            setTime(item.startTime);
                          }}
                        >
                          <Block>
                            <Text style={styles.timeText}>
                              {moment.utc(item.startTime).format("HH:mm")} -
                              {moment.utc(item.endTime).format("HH:mm")}
                            </Text>
                          </Block>
                        </Button>
                      );
                    })}
                  </Block>
                </Block>
              ) : (
                <></>
              )}
            </Block>
          )}
          <Divider style={{ marginVertical: 10 }} />

          <Block center>
            <Button
              style={styles.appontmentButton}
              onPress={() => {
                if (!time || !date) {
                  setToast(true);
                  return;
                }
                setVisible(!visible);
              }}
            >
              <Block>
                <Text style={styles.socialTextButtons}>Make appointment</Text>
              </Block>
            </Button>
          </Block>
          <Overlay
            isVisible={visible}
            onBackdropPress={() => {
              setVisible(!visible);
            }}
          >
            <Text h5 style={{ textAlign: "center" }}>
              Appointment Confirm
            </Text>
            <Input
              label="Description"
              placeholder="(Optional)"
              style={{ height: width * 0.2 }}
              placeholderTextColor="#ececec"
              onChangeText={(text) => {
                setDescription(text);
              }}
            />
            <Block row center>
              <Button
                style={styles.confirmButton}
                onPress={() => {
                  onCreateAppointment();
                }}
              >
                <Block>
                  <Text style={styles.confirmTextButtons}>Send</Text>
                </Block>
              </Button>
              <Button
                style={styles.cancleButton}
                onPress={() => {
                  setVisible(false);
                }}
              >
                <Block>
                  <Text style={styles.confirmTextButtons}>Cancel</Text>
                </Block>
              </Button>
            </Block>
          </Overlay>
        </Block>
      </ScrollView>
    </Block>
  );
};

export default AppointmentCreate;
