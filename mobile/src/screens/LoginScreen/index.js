import React, { useState, useEffect } from "react";
// import { Text, View, TouchableHighlight, StatusBar } from "react-native";
// import { Input } from "react-native-elements";
// import Icon from "react-native-vector-icons/AntDesign";
// import style from "./style";
import * as GoogleSignIn from "expo-google-sign-in";
import * as Facebook from "expo-facebook";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { Block, Checkbox, Text, theme, Toast } from "galio-framework";
import { gql, useMutation } from "@apollo/client";
import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signIn, signOut, getToken } from "../../Util";

import Spinner from "react-native-loading-spinner-overlay";
import { TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get("screen");
const LOGIN = gql`
  mutation login($username: String, $password: String, $facebookId: String) {
    login(username: $username, password: $password, facebookId: $facebookId) {
      token
      message
    }
  }
`;

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [facebookId, setFacebookId] = useState('')
  // const [login, { loading, error, data }] = useMutation(LOGIN);
  const [isShow, setIsShow] = useState(true);
  const [toastText, setToastText] = useState("");
  const [login, { loading, error }] = useMutation(LOGIN, {
    variables: {
      username,
      password,
      facebookId
    },
    onCompleted: ({ login }) => {
      console.log(facebookId)
      if (login.token) {
        signIn(login.token);
        navigation.navigate("Home");
      }
    },
  });
  const onClickLogin = () => {
    if (username.length == 0 || password.length == 0) {
      if (username.length == 0) {
        setToastText("Username cannot be empty");
        setIsShow(true);
        let timer1 = setTimeout(() => setIsShow(false), 2000);
        return;
      }
      if (password.length == 0) {
        setToastText("Password cannot be empty");
        setIsShow(true);
        let timer1 = setTimeout(() => setIsShow(false), 2000);
        return;
      }
      return;
    }

    login({ variables: { username, password, facebookId } });
  };
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      await initAsync();
    };
    init();
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     await initAsync()
  //   }
  //   fetchData();
  // }, []);

  async function fbLogIn() {
    try {
      await Facebook.initializeAsync({
        appId: "799520370645414",
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        const result = await response.json()
        setFacebookId(result.id)
        await login({ variables: { username: '', password: '', facebookId: result.id } });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
      console.log(message);
    }
  }
  const initAsync = async () => {
    await GoogleSignIn.initAsync({});
    await syncUserWithStateAsync();
  };

  const syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    setUser(user);
  };

  const signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    setUser(null);
  };

  const signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === "success") {
        syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert("login: Error:" + message);
    }
  };

  return (
    <Block flex middle>
      <StatusBar animated backgroundColor={argonTheme.COLORS.PRIMARY} />

      <Spinner
        visible={loading}
        textContent={"Login..."}
        textStyle={{ color: "#ffffff" }}
      />

      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block flex middle>
          {/* {loading && <Block style={styles.overlay}></Block>} */}
          <Block style={styles.loginContainer}>
            <Toast isShow={isShow} positionIndicator="top" color="warning">
              {toastText}
            </Toast>
            <Block flex={0.25} middle style={styles.socialConnect}>
              <Text color="#8898AA" size={12}>
                Sign in with
              </Text>
              <Block row style={{ marginTop: theme.SIZES.BASE }}>
                <Button
                  style={{ ...styles.socialButtons, marginRight: 30 }}
                  onPress={() => {
                    fbLogIn();
                  }}
                >
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
              <Block flex={0.17} middle>
                <Text color="#8898AA" size={12}>
                  Or sign in the classic way
                </Text>
              </Block>
              <Block flex center>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  enabled
                >
                  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder="Username"
                      autoCapitalize='none'
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="hat-3"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                      onChangeText={(username) => {
                        setUsername(username);
                        usernameError && setUsernameError(false);
                      }}
                    />
                  </Block>

                  <Block width={width * 0.8}>
                    <Input
                      password
                      borderless
                      placeholder="Password"
                      autoCapitalize='none'
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="padlock-unlocked"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                      onChangeText={(password) => {
                        setPassword(password);
                        passwordError && setPasswordError(false);
                      }}
                    />
                  </Block>
                  <Block middle>
                    <Button
                      color="primary"
                      style={styles.loginButton}
                      onPress={() => onClickLogin()}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        LOGIN
                      </Text>
                    </Button>
                  </Block>
                  {/* <Block middle>
                    <Button
                      style={{ width: 100 }}
                      color="transparent"
                      textStyle={{
                        color: argonTheme.COLORS.PRIMARY,
                        fontSize: 14,
                      }}
                      onPress={() => navigation.navigate("Register")}
                    >
                      Sign up
                    </Button>
                  </Block> */}
                <Block flex={0.17} middle>
                  <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text color={argonTheme.COLORS.PRIMARY} size={14}>
                    Or click here to sign up
                    </Text>
                  </TouchableOpacity>
              </Block>
                </KeyboardAvoidingView>
              </Block>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    width: width * 0.9,
    height: height * 0.7,
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
    paddingTop: 18,
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
  loginButton: {
    width: width * 0.5,
    marginTop: 25,
  },
  overlay: {},
});

export default LoginScreen;
