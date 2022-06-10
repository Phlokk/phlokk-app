import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import colors from "../../../../config/colors";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../../../redux/actions/users";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import verifiedCheck from "../../../../assets/verified.png";
import CustomAlert from "../../../components/Alerts/customAlert";
import CustomImageModal from "../../../components/Image/customImage";

function UserProfile(user) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.user);

  const [topFavFive, setTopFavFive] = useState(false);
  const [popUpImage, setPopUpImage] = useState(false);

  useEffect(() => {
    dispatch(fetchUserData({username, photo_url, quote, is_verified, relationship_name, relationship_type}));
  }, [dispatch]);

  const [fontsLoaded] = useFonts({
    "Waterfall-Regular": require("../../../../assets/fonts/Waterfall-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      {users &&
        users.map((user, i) =>
          user.photo_url !== null || !undefined ? (
            <TouchableOpacity key={i} onPress={() => setPopUpImage(true)}>
              <CustomImageModal
                alertTitle="About me"
                customAlertMessage={<Text>User Bio</Text>}
                positiveBtn="Back"
                modalVisible={popUpImage}
                dismissAlert={setPopUpImage}
                animationType="fade"
              />
              <Image
                style={styles.avatar}
                // key={i}
                source={{ uri: user.photo_url }}
              />
            </TouchableOpacity>
          ) : (
            <Image
              style={styles.avatar}
              source={require("../../../../assets/userImage.png")}
              cache="only-if-cached"
            />
          )
        )}

      <View style={styles.usernameView}>
        {users.username !== null || !undefined ? (
          <Text>
            {users &&
              users.map((user, i) => (
                <Text style={styles.username} key={i}>
                  @{user.username}
                </Text>
              ))}
            <View>
              {users[0] && users[0].is_verified === 1 && (
                <Image style={styles.phlokkVerified} source={verifiedCheck} />
              )}
            </View>
          </Text>
        ) : (
          <Text style={styles.username}>@user</Text>
        )}
      </View>

      <View style={styles.quotesView}>
        {users.quote !== null || !undefined ? (
          <Text>
            {users &&
              users.map((user, i) => (
                <Text style={styles.quotes} key={i}>
                  {user.quote}
                </Text>
              ))}
          </Text>
        ) : (
          <></>
        )}
      </View>
      <>
        <View style={styles.relationshipContainer}>
          {users &&
            users.map((user, i) => (
              <Text style={styles.relationshipText} key={i}>
                {user.relationship_type}
              </Text>
            ))}
        </View>
      </>
      <>
        <View style={styles.relationshipNameContainer}>
          {users &&
            users.map((user, i) => (
              <Text style={styles.relationshipText} key={i}>
                {user.relationship_name}
              </Text>
            ))}
        </View>
        {users &&
          users.map((user, i) => (
            <TouchableOpacity key={i}>
              <CustomAlert
                alertTitle={
                  <Text>
                    <MaterialIcons name="info" size={24} color={colors.green} />
                  </Text>
                }
                customAlertMessage={
                  <Text>Top Favorite 5{"\n"}coming in beta 3</Text>
                }
                positiveBtn="Ok"
                modalVisible={topFavFive}
                dismissAlert={setTopFavFive}
                animationType="fade"
              />
              <MaterialCommunityIcons
                name="diamond-stone"
                size={25}
                color={colors.diamondBlue}
                onPress={() => setTopFavFive(true)}
              />
            </TouchableOpacity>
          ))}
         
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  relationshipNameContainer: {
    flexDirection: "row",
    paddingTop: 5,
    justifyContent: "space-between",
    bottom: 2,
  },
  verifiedRow: {
    flexDirection: "row",
    justifyContent: "center",
    // bottom: 2,
  },
  creatorText: {
    color: colors.white,
    fontSize: 15,
    marginBottom: 20,
  },
  relationshipText: {
    color: colors.white,
    marginBottom: 10,
    marginHorizontal: 2,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  username: {
    color: colors.white,
    marginTop: 10,
    marginBottom: 20,
  },
  quotes: {
    color: colors.white,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Waterfall-Regular",
    fontSize: 28,
  },
  users: {
    color: colors.white,
  },
  error: {
    color: colors.red,
  },
  phlokkVerified: {
    width: 12,
    height: 12,
    bottom: 1,
    marginHorizontal: 3,
  },
  usernameView: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
  },
  quotesView: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 25,
    paddingLeft: 25,
  },
  messageText: {
    color: colors.black,
    fontWeight: "700",
  },
  dividerBar: {
    backgroundColor: "#fff",
    width: 20,
  },
});

export default React.memo(UserProfile);
