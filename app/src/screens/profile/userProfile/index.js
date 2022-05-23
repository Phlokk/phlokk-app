import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import colors from "../../../../config/colors";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../../../redux/actions/users";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import verifiedCheck from "../../../../assets/verified.png";

function UserProfile() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.user);

  // const loading = useSelector(state => state.userReducer.user);
  // const navigation = useNavigation();
  useEffect(() => {
    dispatch(fetchUserData({}));
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
            <Image
              style={styles.avatar}
              key={i}
              source={{ uri: user.photo_url }}
            />
          ) : (
            <Image
              style={styles.avatar}
              source={require("../../../../assets/userImage.png")}
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

      <View style={styles.linkRow}>
        <View style={styles.linkText}>
          <Feather
            onPress={
              users[0] && users[0].youtubeLink
                ? () => Linking.openURL(users[0].youtubeLink)
                : null
            }
            name="youtube"
            size={18}
            color={
              users[0] && users[0].youtubeLink ? colors.green : colors.gray
            }
          />
        </View>
        <View style={styles.linkText}>
          <MaterialCommunityIcons
            onPress={
              users[0] && users[0].link
                ? () => Linking.openURL(users[0].link)
                : null
            }
            name="link"
            size={23}
            color={users[0] && users[0].link ? colors.green : colors.gray}
          />
        </View>
        <View style={styles.linkText}>
          <Feather
            onPress={
              users[0] && users[0].instagramLink
                ? () => Linking.openURL(users[0].instagramLink)
                : null
            }
            name="instagram"
            size={16}
            color={
              users[0] && users[0].instagramLink ? colors.green : colors.gray
            }
          />
        </View>
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
                &#x1F48D; {user.relationship_name}
              </Text>
            ))}
        </View>
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
  link: {
    alignItems: "center",
    marginVertical: 5,
  },
  linkRow: {
    flexDirection: "row",
  },
  linkText: {
    color: colors.secondary,
    marginBottom: 20,
    padding: 2,
    justifyContent: "center",
    margin: 15,
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
    top: 1,
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

export default UserProfile;
