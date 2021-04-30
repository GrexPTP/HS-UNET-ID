import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApolloClient } from "@apollo/client";

const AUTH_TOKEN = "AUTH_TOKEN";
const USER = "USER";

let token;
let user;

export const getToken = async () => {
  token = await AsyncStorage.getItem(AUTH_TOKEN);
  return token;
};

export const signIn = (newToken) => {
  token = newToken;
  return AsyncStorage.setItem(AUTH_TOKEN, newToken);
};

export const signOut = () => {
  token = undefined;
  return AsyncStorage.clear();
};

export const signUser = (newUser) => {
  user = JSON.stringify(newUser);
  return AsyncStorage.setItem(USER, JSON.stringify(newUser));
};

export const getUser = async () => {
  if (user) {
    let val = JSON.parse(user);
    return Promise.resolve(val);
  }
  user = await AsyncStorage.getItem(USER);
  let val = JSON.parse(user);
  return val;
};
export const capitalizeTheFirstLetterOfEachWord = (words) => {
  var separateWord = words.toLowerCase().split(' ');
  for (var i = 0; i < separateWord.length; i++) {
     separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
     separateWord[i].substring(1);
  }
  return separateWord.join(' ');
}