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

function UserProfile() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.user);
  // const loading = useSelector(state => state.userReducer.user);
  // const navigation = useNavigation();
  useEffect(() => {
    dispatch(fetchUserData({}));
  }, []);

  const [fontsLoaded] = useFonts({
    "Tangerine-Regular": require("../../../../assets/fonts/Tangerine-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      {users.photo_url !== null ? (
        <Text>
          {users &&
            users.map((user, i) => (
              <Image
                style={styles.avatar}
                key={i}
                source={{ uri: user.photo_url }}
              />
            ))}{" "}
        </Text>
      ) : (
        <Image
          style={styles.avatar}
          source={require("../../../../assets/userImage.png")}
        />
      )}

      <View style={styles.usernameView}>
        {users.username !== null ? (
          <Text>
            {users &&
              users.map((user, i) => (
                <Text style={styles.username} key={i}>
                  @{user.username}
                </Text>
              ))}
          </Text>
        ) : (
          <Text style={styles.username}>@user</Text>
        )}

        {users.is_verified !== null ? (
          <Text style={styles.phlokkVerified}>
            {users &&
              users.map((user, i) => (
                <Image
                  style={styles.phlokkVerified}
                  key={i}
                  source={{ uri: user.is_verified }}
                />
              ))}
          </Text>
        ) : (
          <TouchableOpacity></TouchableOpacity>
        )}
      </View>

      <>
        <View style={styles.linkRow}>
          {users &&
            users.map((user, i) => (
              <TouchableOpacity style={styles.linkText} key={i}>
                <Feather
                  onPress={() => Linking.openURL(user.youtubeLink)}
                  name="youtube"
                  size={20}
                  color={colors.green}
                />
              </TouchableOpacity>
            ))}

          {users &&
            users.map((user, i) => (
              <TouchableOpacity style={styles.linkText} key={i}>
                <MaterialCommunityIcons
                  onPress={() => Linking.openURL(user.link)}
                  name="link"
                  size={25}
                  color={colors.green}
                />
              </TouchableOpacity>
            ))}
          {users &&
            users.map((user, i) => (
              <TouchableOpacity style={styles.linkText} key={i}>
                <Feather
                  onPress={() => Linking.openURL(user.instagramLink)}
                  name="instagram"
                  size={18}
                  color={colors.green}
                />
              </TouchableOpacity>
            ))}
        </View>
      </>
      <View style={styles.quotesView}>
        {users.quote !== null ? (
          <Text>
            {users &&
              users.map((user, i) => (
                <Text style={styles.quotes} key={i}>
                  {user.quote}
                </Text>
              ))}
          </Text>
        ) : (
          <TouchableOpacity></TouchableOpacity>
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
    fontFamily: "Tangerine-Regular",
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
    top: 3,
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
