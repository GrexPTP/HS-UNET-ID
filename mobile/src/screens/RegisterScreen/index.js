import React, { useState, setState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  Platform,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Block, Checkbox, Text, theme, Toast } from "galio-framework";
import moment from "moment";
import RadioGroup from "react-native-radio-button-group";
import { RadioButton } from "react-native-paper";
import { signIn, signOut, getToken } from "../../Util";
import ViewPager from "@react-native-community/viewpager";
import Spinner from "react-native-loading-spinner-overlay";
import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";
import DatePicker from "react-native-datepicker";
import { gql, useMutation, useQuery } from "@apollo/client";
import SearchableDropdown from "react-native-searchable-dropdown";
import StepIndicator from "react-native-step-indicator";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");
const cityPlaceholder = {
  label: "Select a city...",
  value: null,
  color: argonTheme.COLORS.MUTED,
};
const SIGNUP = gql`
  mutation signup($signUpInput: CreateUserDto!) {
    signup(signUpInput: $signUpInput) {
      token
      message
    }
  }
`;
const GET_CITY = gql`
  query {
    cities {
      id
      name
    }
  }
`;
function RegisterScreen({ navigation }) {
  const [date, setDate] = useState();
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cityId, setCityId] = useState("");
  const [cities, setCities] = useState([]);
  const [phone, setPhone] = useState("");
  const [password, setPassWord] = useState("");
  const [gender, setGender] = useState("Female");
  const [signUpInput, setSignUpInput] = useState(null);
  const [isShow, setIsShow] = useState(true);
  const [toastText, setToastText] = useState("");

  const {
    loading: citiesLoading,
    error: citiesError,
    data: citySrc,
  } = useQuery(GET_CITY);

  const [city, setCity] = useState(0);
  const [register, { loading, error }] = useMutation(SIGNUP, {
    variables: { signUpInput: signUpInput },
    onCompleted: ({ signup }) => {
      console.log(
        "🚀 ~ file: index.js ~ line 46 ~ RegisterScreen ~ signup",
        signup
      );
      if (signup.token) {
        signIn(signup.token);
        navigation.navigate("Home");
      }
    },
  });
  useEffect(() => {
    if (citySrc) {
      setCities(citySrc.cities);
    }
  }, [citySrc]);
  const onClickSignUp = () => {
    if (userName == "") {
      setToastText("Username cannot be empty");
      setIsShow(true);
      let timer1 = setTimeout(() => setIsShow(false), 2000);
      return;
    }
    if (name == "") {
      setToastText("Name cannot be empty");
      setIsShow(true);
      let timer1 = setTimeout(() => setIsShow(false), 2000);
      return;
    }
    if (email == "") {
      setToastText("Email cannot be empty");
      setIsShow(true);
      let timer1 = setTimeout(() => setIsShow(false), 2000);
      return;
    }
    if (password == "") {
      setToastText("Password cannot be empty");
      setIsShow(true);
      let timer1 = setTimeout(() => setIsShow(false), 2000);
      return;
    }
    if (phone == "") {
      setToastText("Phone cannot be empty");
      setIsShow(true);
      let timer1 = setTimeout(() => setIsShow(false), 2000);
      return;
    }
    if (date == "") {
      setToastText("BirthDate cannot be empty");
      setIsShow(true);
      let timer1 = setTimeout(() => setIsShow(false), 2000);
      return;
    }
    if (cityId == null) {
      setToastText("City cannot be empty");
      setIsShow(true);
      let timer1 = setTimeout(() => setIsShow(false), 2000);
      return;
    }

    var signUp = {
      birthDate: date,
      email: email,
      gender: gender,
      name: name,
      password: password,
      username: userName,
      roleId: 1,
      phone: phone,
      cityId: cityId,
    };
    setSignUpInput(signUp);
    register({ variables: { signUpInput: signUp } });
  };
  return (
    <Block flex middle>
      <StatusBar animated backgroundColor={argonTheme.COLORS.PRIMARY} />
      <Spinner
        visible={loading}
        textContent={"Register..."}
        textStyle={{ color: "#ffffff" }}
      />
      <Toast isShow={isShow} positionIndicator="top" color="warning">
        {toastText}
      </Toast>
      <ImageBackground
        source={Images.RegisterBackground}
        style={{
          width,
          height,
          zIndex: 1,
          paddingTop: height * 0.1,
        }}
      >
        <ScrollView contentContainerStyle={styles.articles}>
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.16} middle style={styles.socialConnect}>
                <Text color="#8898AA" size={12}>
                  Sign up with
                </Text>
                <Block row>
                  <Button style={{ ...styles.socialButtons, marginRight: 30 }}>
                    <Block row>
                      <Icon
                        name="logo-facebook"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>FACEBOOK</Text>
                    </Block>
                  </Button>
                  <Button style={styles.socialButtons}>
                    <Block row>
                      <Icon
                        name="logo-google"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GOOGLE</Text>
                    </Block>
                  </Button>
                </Block>
              </Block>
              <Block flex>
                <Block flex={0.05} middle>
                  <Text color="#8898AA" size={12}>
                    Or sign up the classic way
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 0 }}>
                      <Input
                        borderless
                        onChangeText={(text) => {
                          setUserName(text);
                        }}
                        placeholder="User Name"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 0 }}>
                      <Input
                        borderless
                        placeholder="Name"
                        onChangeText={(text) => {
                          setName(text);
                        }}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="person"
                            family="Ionicon"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 0 }}>
                      <Input
                        onChangeText={(text) => {
                          setEmail(text);
                        }}
                        borderless
                        type="email-address"
                        placeholder="Email"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 0 }}>
                      <Input
                        onChangeText={(text) => {
                          setPassWord(text);
                        }}
                        password
                        borderless
                        placeholder="Password"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 0 }}>
                      <Input
                        borderless
                        onChangeText={(text) => {
                          setPhone(text);
                        }}
                        placeholder="Phone"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ios-phone-portrait"
                            family="Ionicon"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block
                      width={width * 0.8}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "white",
                        borderRadius: 4,
                        height: 44,
                        shadowColor: argonTheme.COLORS.BLACK,
                        shadowOffset: { width: 0, height: 1 },
                        shadowRadius: 2,
                        shadowOpacity: 0.05,
                        elevation: 2,
                        marginVertical: 10,
                      }}
                    >
                      <Icon
                        size={16}
                        color={argonTheme.COLORS.ICON}
                        name="calendar"
                        family="Ionicon"
                        style={styles.dateIcons}
                      />
                      <DatePicker
                        style={{
                          width: "80%",
                          backgroundColor: "white",
                          alignItems: "flex-start",
                        }}
                        date={date}
                        onDateChange={(date) => {
                          setDate(date);
                        }}
                        mode="date"
                        placeholder="Date of birth"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        customStyles={{
                          dateInput: {
                            backgroundColor: "white",
                            width: "70%",
                            borderColor: "#FFFFFF",
                            alignItems: "flex-start",
                            paddingLeft: 10,
                          },
                          dateText: {
                            paddingLeft: 18,
                          },
                          placeholderText: {
                            color: argonTheme.COLORS.MUTED,
                            marginLeft: 2,
                          },
                        }}
                      />
                    </Block>
                    <Block
                      row
                      center
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "white",
                        borderRadius: 4,
                        height: 44,
                        shadowColor: argonTheme.COLORS.BLACK,
                        shadowOffset: { width: 0, height: 1 },
                        shadowRadius: 2,
                        shadowOpacity: 0.05,
                        elevation: 2,
                        marginVertical: 10,
                      }}
                      width={width * 0.8}
                    >
                      <Icon
                        size={16}
                        color={argonTheme.COLORS.ICON}
                        name="business"
                        family="Ionicon"
                        style={styles.dateIcons}
                      />
                      <RNPickerSelect
                        placeholder={{
                          label: "Select a city...",
                          value: null,
                          color: argonTheme.COLORS.MUTED,
                        }}
                        useNativeAndroidPickerStyle={false}
                        style={{
                          ...pickerSelectStyles,
                        }}
                        onValueChange={(value) => setCityId(value)}
                        items={cities?.map((item, index) => {
                          return {
                            label: item.name,
                            value: item.id,
                          };
                        })}
                      />
                    </Block>

                    <Block
                      row
                      width={width * 0.8}
                      middle
                      space="evenly"
                      style={{
                        paddingTop: 0,
                        flexDirection: "row",
                        marginBottom: 0,
                      }}
                    >
                      <Block
                        style={{
                          padding: 0,
                          flexDirection: "row",
                        }}
                        center
                      >
                        <Text>Female</Text>
                        <RadioButton
                          color={argonTheme.COLORS.PRIMARY}
                          status={gender === "Female" ? "checked" : "unchecked"}
                          value="Female"
                          onPress={() => setGender("Female")}
                        />
                      </Block>
                      <Block
                        center
                        style={{ padding: 0, flexDirection: "row" }}
                      >
                        <Text>Male</Text>
                        <RadioButton
                          color={argonTheme.COLORS.PRIMARY}
                          status={gender === "Male" ? "checked" : "unchecked"}
                          value="Male"
                          onPress={() => setGender("Male")}
                        />
                      </Block>
                    </Block>
                    <Block middle>
                      <Button
                        color="primary"
                        onPress={() => onClickSignUp()}
                        style={styles.createButton}
                      >
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          CREATE ACCOUNT
                        </Text>
                      </Button>
                    </Block>

                    <Block flex={0} middle>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("Auth")}
                      >
                        <Text color={argonTheme.COLORS.PRIMARY} size={14}>
                          Or click here to sign in
                        </Text>
                      </TouchableOpacity>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ScrollView>
      </ImageBackground>
    </Block>
  );
  // }
}

const styles = StyleSheet.create({
  datepickerstyle: {
    borderRadius: 4,
    borderColor: argonTheme.COLORS.BORDER,
    height: 44,
    width: width * 0.8,
    backgroundColor: "#FFFFFF",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
    marginTop: 7,
    marginBottom: 0,
  },
  articles: {
    width: width,
    paddingBottom: theme.SIZES.BASE,
    alignItems: "center",
  },
  registerContainer: {
    width: width * 0.9,
    height: height * 0.9,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA",
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
  },
  dateIcons: {
    marginLeft: 15,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 10,
  },
  calendarIcons: {
    marginLeft: 0,
  },
});

export default RegisterScreen;
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    borderWidth: 1,
    borderColor: argonTheme.COLORS.WHITE,
    borderRadius: 4,
    color: argonTheme.COLORS.HEADER,
    paddingLeft: 15,
    backgroundColor: "white", // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    borderWidth: 1,
    borderColor: argonTheme.COLORS.WHITE,
    borderRadius: 4,
    color: argonTheme.COLORS.HEADER,
    paddingLeft: 15,
    backgroundColor: "white", // to ensure the text is never behind the icon
  },
});
