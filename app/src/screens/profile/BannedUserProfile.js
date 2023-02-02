import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../../../config/colors";
import BannedStatsContainer from "../../components/profile/profileStats/BannedStatsContainer";
import BannedProfileNavBar from "../../components/general/profileNavBar/BannedProfileNavBar";
import BannedDisplayMenuScreen from "./BannedDisplayMenuScreen";
import { useAtom } from "jotai";
import { userAtom } from "../../services/appStateAtoms";

function BannedUserProfile() {
  const [user] = useAtom(userAtom);
  return (
    <View style={styles.container}>
      <View style={styles.divider}></View>
      <BannedProfileNavBar />
      <BannedStatsContainer />
      <View>
        <Image
          style={styles.avatar}
          source={require("../../../assets/userImage.png")}
        />
      </View>

      <View style={styles.usernameView}>
        <Text style={styles.username}>@{user.username}</Text>
      </View>
      <View style={styles.messageView}>
        <Text style={styles.message}>
          This account was permanently banned{"\n"} due to multiple Community
          Guidelines violations.
        </Text>
      </View>
      <BannedDisplayMenuScreen user={user} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.primary,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 0.5,
  },

  username: {
    fontSize: 12,
    color: colors.white,
    marginTop: 5,
    marginBottom: 20,
  },
  usernameView: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
  },
  pressedStyle: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  pressedModal: {
    flex: 1,
    justifyContent: "flex-end",
  },
  divider: {
    marginTop: 50,
  },
  message: {
    textAlign: "center",
    opacity: 0.5,
    color: colors.secondary,
  },
  messageView: {
    backgroundColor: colors.lightBlack,
    borderRadius: 5,
    padding: 20,
    flexDirection: "row",
  },
});

export default BannedUserProfile;
