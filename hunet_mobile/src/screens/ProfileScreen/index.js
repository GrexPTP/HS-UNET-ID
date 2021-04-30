import React, { useState, useEffect, useRef } from "react";
import { ReactNativeFile } from "apollo-upload-client";

import {
  FlatList,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme, Toast } from "galio-framework";
import styles from "./style";
import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";
import { Images, argonTheme } from "../../constants";
import { HeaderHeight } from "../../constants/utils";
import { Button, Icon, Input } from "../../components";
import history from "../../constants/history";
import HistoryCard from "../../components/HistoryCard";
import Spinner from "react-native-loading-spinner-overlay";
import * as ImagePicker from "expo-image-picker";
import ActionSheet from "react-native-actionsheet";
import * as mime from "react-native-mime-types";
import moment from "moment";
import { useApolloClient } from "@apollo/client";
import { titleCase } from "title-case";
import Constants from "expo-constants";
import { signOut } from "../../Util";
const { width, height } = Dimensions.get("screen");
import ApolloCacheUpdater from "apollo-cache-updater";

const GET_USER = gql`
  query {
    user {
      name
      gender
      phone
      username
      email
      profileImage
      birthDate
      id
    }
  }
`;

const UPLOAD_AVATAR = gql`
  mutation UploadProfileImage($image: Upload!) {
    uploadProfileImage(image: $image) {
      path
      message
    }
  }
`;

const GET_EXAMINATION_HISTORY = gql`
  query examinations($pagination: PaginationDto!) {
    examinations(pagination: $pagination) {
      data {
        createdAt
        customerDescription
        doctorFeedback
        id
        image
        resultImage
        status
        disease {
          name
        }
      }
      limit
      page
      totalCount
    }
  }
`;
const ProfileScreen = ({ navigation }) => {
  const client = useApolloClient();
  const { data: user, loading, error, refetch } = useQuery(GET_USER, {
    fetchPolicy: "no-cache",
    pollInterval: 500,
  });

  const examinationList = useQuery(GET_EXAMINATION_HISTORY, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    variables: {
      pagination: {
        filter: "",
        limit: 3,
        order: "DESC",
        page: 1,
      },
    },
    onCompleted: (e) => {
      console.log(1);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const [
    uploadAvatar,
    { error: uploadError, data: uploadAvatarData, loading: uploadLoading },
  ] = useMutation(UPLOAD_AVATAR, {
    onCompleted: (data) => refetch(),
  });

  const [userData, setUserData] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const actionSheet = useRef(null);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  useEffect(() => {
    if (uploadError) {
      console.log(uploadError);
    }
  }, [uploadError]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    // getUser();
  }, []);

  function generateRNFile(uri, name) {
    return uri
      ? new ReactNativeFile({
          uri,
          type: mime.lookup(uri) || "image",
          name,
        })
      : null;
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setAvatar(result.uri);
      const file = generateRNFile(result.uri, `picture-${Date.now()}.jpg`);
      await uploadAvatar({ variables: { image: file } });
    }
  };
  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.cancelled) {
      setAvatar(result.uri);
      const file = generateRNFile(result.uri, `picture-${Date.now()}.jpg`);
      await uploadAvatar({ variables: { image: file } });
    }
  };

  const showActionSheet = () => {
    actionSheet.current.show();
  };
  const renderItem = ({ item, index }) => (
    <HistoryCard
      key={index}
      item={item}
      id={item.id}
      style={styles.card}
      screen="ExaminationsDetail"
      route="Examination"
      nested={true}
    />
  );
  return (
    <Block flex style={styles.profile}>
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
      <Spinner
        visible={uploadLoading}
        textContent={"Update avatar..."}
        textStyle={styles.spinnerTextStyle}
      />
      <Block flex>
        <ImageBackground
          source={Images.ProfileBackground}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width, marginTop: "5%" }}
            contentContainerStyle={{ paddingBottom: "30%" }}
          >
            <Block
              flex
              style={[
                styles.profileCard,
                {
                  marginTop: Constants.statusBarHeight + 60,
                },
              ]}
            >
              <TouchableOpacity onPress={() => showActionSheet()}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={
                      userData?.user?.profileImage
                        ? {
                            uri: userData?.user?.profileImage,
                          }
                        : require("../../assets/placeholder/150.png")
                    }
                    style={styles.avatar}
                  />
                </Block>
              </TouchableOpacity>
              <Block flex>
                <Block middle style={styles.nameInfo}>
                  <Text bold size={28} color="#32325D">
                    {userData?.user.name}
                  </Text>
                </Block>
                <Block style={styles.info}>
                  <Block row space="evenly">
                    <Block middle>
                      <Text
                        bold
                        size={18}
                        color="#525F7F"
                        style={{ marginBottom: 4 }}
                      >
                        {moment(userData?.user.birthDate).format("DD/MM/YYYY")}
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>
                        Birthdate
                      </Text>
                    </Block>
                    <Block middle>
                      <Text
                        bold
                        color="#525F7F"
                        size={18}
                        style={{ marginBottom: 4 }}
                      >
                        {userData ? titleCase(userData.user.gender) : "No data"}
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>
                        Gender
                      </Text>
                    </Block>
                  </Block>
                </Block>
                <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                  <Block style={styles.divider} />
                </Block>
                <Block
                  row
                  space="between"
                  style={{
                    paddingHorizontal: 10,
                  }}
                >
                  <Block row>
                    <Icon
                      name="mail"
                      family="Ionicon"
                      size={14}
                      color={"black"}
                      style={{ marginLeft: "5%" }}
                    />
                    <Text
                      bold
                      color="#525F7F"
                      size={12}
                      style={{ marginBottom: 4, paddingLeft: 5 }}
                    >
                      {userData?.user?.email}
                    </Text>
                  </Block>
                  <Block row>
                    <Icon
                      name="ios-phone-portrait"
                      family="Ionicon"
                      size={14}
                      color={"black"}
                    />
                    <Text
                      bold
                      color="#525F7F"
                      size={12}
                      style={{ marginBottom: 4 }}
                    >
                      {userData?.user?.phone}
                    </Text>
                  </Block>
                </Block>

                <Block row space="between">
                  <Text
                    bold
                    size={16}
                    color="#525F7F"
                    style={{ marginTop: 12, paddingHorizontal: 15 }}
                  >
                    Examination History
                  </Text>
                  <TouchableOpacity
                    style={{ paddingTop: 15, paddingEnd: 15 }}
                    onPress={() => {
                      navigation.navigate("Examination");
                    }}
                  >
                    <Text
                      style={{
                        color: "#5E72E4",
                        fontSize: 13,
                      }}
                    >
                      View all
                    </Text>
                  </TouchableOpacity>
                </Block>
                <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                  <Block>
                    {!examinationList?.loading && (
                      <FlatList
                        data={examinationList?.data?.examinations.data}
                        renderItem={renderItem}
                        contentContainerStyle={styles.articles}
                        keyExtractor={(item) => item.id}
                      />
                    )}
                  </Block>
                </Block>
              </Block>
              <Block middle>
                <Button
                  style={styles.button}
                  onPress={async () => {
                    await signOut();
                    client.resetStore();
                    navigation.reset({
                      routes: [{ name: "Splash" }],
                    });
                  }}
                >
                  <Text style={styles.text}>Log out</Text>
                </Button>
              </Block>
            </Block>
          </ScrollView>
        </ImageBackground>
      </Block>
      <ActionSheet
        ref={actionSheet}
        title={"Select Image From Gallery or Camera ?"}
        options={["Open Gallery", "Open Camera", "Cancel"]}
        cancelButtonIndex={2}
        onPress={(index) => {
          switch (index) {
            case 0:
              pickImage();
              return;
            case 1:
              openCamera();
              return;
          }
        }}
      />
    </Block>
  );
};

export default ProfileScreen;
