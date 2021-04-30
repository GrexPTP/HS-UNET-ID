import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/LoginScreen";
import { useRef } from "react";
import { Icon } from "../components";
import HomeScreen from "../screens/HomeScreen";
import AppointmentCreate from "../screens/AppointmentCreate";
import ChooseDate from "../screens/AppointmentCreate";
import DoctorList from "../screens/DoctorList";
import ProfileScreen from "../screens/ProfileScreen";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RegisterScreen from "../screens/RegisterScreen";
import ResultScreen from "../screens/ScanScreen/ResultScreen";
import ScanScreen from "../screens/ScanScreen";
import ExaminationsDetail from "../screens/ExaminationsDetail";
import ExaminationsList from "../screens/ExaminationsList";
import GuideScreen from "../screens/GuideScreen";
import SplashScreen from "../screens/SplashScreen";
import AppointmentDetail from "../screens/AppointmentDetail";
import AppointmentList from "../screens/AppointmentList";
import NewsScreen from "../screens/NewsScreen";
import SuccessScreen from "../screens/AppointmentCreate/SuccessScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { navigationRef } from "./RootNavigation";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const tabBarListeners = ({ navigation, route }) => ({
  tabPress: () => navigation.navigate(route.name),
});

function tableVisible(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  if (route.name === "ScanStack") {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "ScanScreen";
    if (routeName === "ScanScreen") {
      return false;
    }
  }
  return true;
}

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#694fad"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: "#f0edf6" }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let fontFamily;
          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
            fontFamily = "Ionicon";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
            fontFamily = "Ionicon";
          } else if (route.name === "Appointment") {
            iconName = focused ? "medical" : "medical-outline";
            fontFamily = "Ionicon";
          } else if (route.name === "Examination") {
            iconName = focused ? "medical" : "medical-outline";
            fontFamily = "Ionicon";
          } else if (route.name === "ScanScreen") {
            iconName = focused ? "scan-circle" : "scan-circle-outline";
            fontFamily = "Ionicon";
          } else if (route.name === "Screen") {
            iconName = focused ? "settings" : "settings-outline";
            fontFamily = "Ionicon";
          } else if (route.name === "ScanStack") {
            if (!focused) {
              return (
                <View
                  style={{
                    position: "relative",
                    bottom: 10,
                    alignItems: "center",
                    justifyContent: "space-around",
                    height: 85,
                  }}
                >
                  <Icon
                    name={"scan-circle"}
                    family={"Ionicon"}
                    color={color}
                    size={size * 2.5}
                  />
                </View>
              );
            }
          }
          return (
            <Icon
              name={iconName}
              family={fontFamily}
              size={size}
              color={color}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "#3e2465",
        inactiveTintColor: "#694fad",
        style: {
          elevation: 0, // for Android
          shadowOffset: {
            width: 0,
            height: 0, // for iOS
          },
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: "Home",
        }}
        component={HomeStack}
      />
      <Tab.Screen
        name="Examination"
        options={({ route }) => ({
          tabBarLabel: "Examination",
        })}
        unmountOnBlur={true}
        component={ExaminationStack}
      />

      <Tab.Screen
        name="ScanStack"
        options={({ route }) => ({
          tabBarLabel: "Scan skin",
          tabBarVisible: false,
        })}
        unmountOnBlur={true}
        component={ScanStack}
      />
      <Tab.Screen
        name="Appointment"
        options={{
          tabBarLabel: "Appoinment",
        }}
        unmountOnBlur={true}
        component={ApointmentStack}
        listeners={tabBarListeners}

      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
        }}
        unmountOnBlur={true}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName={"HomeScreen"}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          title: "News Screen",
        }}
        name="NewsScreen"
        component={NewsScreen}
      />
    </Stack.Navigator>
  );
};

const ApointmentStack = () => {
  return (
    <Stack.Navigator initialRouteName={"AppointmentList"}>
      <Stack.Screen
        name="DoctorList"
        options={{
          headerShown: false,
        }}
        component={DoctorList}
      />
      <Stack.Screen
        name="SuccessScreen"
        options={{
          headerShown: false,
        }}
        component={SuccessScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="AppointmentCreate"
        component={AppointmentCreate}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="AppointmentList"
        component={AppointmentList}
      />
      <Stack.Screen
        name="ChooseDate"
        options={{
          title: "Chọn Thời Điểm",
        }}
        component={ChooseDate}
      />
      <Stack.Screen
        options={{
          title: "Chi tiết lịch hẹn",
          headerShown: false,
        }}
        name="AppointmentDetail"
        component={AppointmentDetail}
      />
    </Stack.Navigator>
  );
};

const ScanStack = () => {
  return (
    <Stack.Navigator initialRouteName={"GuideScreen"}>
      <Stack.Screen
        options={{
          title: "Đặt lịch hẹn",
        }}
        name="AppointmentCreate"
        component={AppointmentCreate}
      />
      <Stack.Screen
        name="ChooseDate"
        options={{
          title: "Chọn Thời Điểm",
        }}
        component={ChooseDate}
      />
      <Stack.Screen
        name="DoctorList"
        options={{
          title: "Danh sách bác sĩ",
        }}
        component={DoctorList}
      />
      <Stack.Screen
        name="GuideScreen"
        options={{
          headerShown: false,
        }}
        component={GuideScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ScanScreen"
        component={ScanScreen}
      />
    </Stack.Navigator>
  );
};

const ExaminationStack = () => {
  return (
    <Stack.Navigator initialRouteName={"ExaminationsList"}>
      <Stack.Screen
        name="ExaminationsList"
        options={{
          headerShown: false,
        }}
        component={ExaminationsList}
      />
      <Stack.Screen
        options={{
          title: "Examination Detail",
          headerShown: false,
        }}
        name="ExaminationsDetail"
        component={ExaminationsDetail}
      />
    </Stack.Navigator>
  );
};
const Route = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={"Splash"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
        <Stack.Screen name="Home" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Route;
