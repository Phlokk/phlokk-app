import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { useUser } from "../../../../hooks/useUser";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

import routes from "../../../../navigation/routes";
import colors from "../../../../../config/colors";

const MessageListItem = ({ chat, user }) => {
  const navigation = useNavigation();
  const { data: userData } = useUser(
    chat.members[0] === firebase.auth().currentUser.uid
      ? chat.members[1]
      : chat.members[0]
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate(routes.CHAT_SINGLE, { chatId: chat.id })
      }
    >
      <Image style={styles.image} source={{ uri: userData?.photoURL }} />
      <View style={{ flex: 1 }}>
        <View style={styles.verifiedRow}>
          <Text style={styles.usernameText}>{userData?.username}</Text>
          {userData?.verified === true ? (
            <Image
              style={styles.verifiedBadge}
              source={require("../../../../../assets/verified.png")}
            />
          ) : (
            <TouchableOpacity></TouchableOpacity>
          )}
        </View>
        <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
      </View>
      <Text style={styles.date}>
        {chat.lastUpdate
          ? new Date(chat.lastUpdate.seconds * 1000).toISOString().slice(0, 10)
          : "Now"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    backgroundColor: "gray",
    height: 40,
    aspectRatio: 1,
    borderRadius: 30,
    marginRight: 16,
  },
  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  usernameText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 12,
    color: "gray",
  },
  date: {
    color: colors.secondary,
    fontSize: 8,
  },
  time: {
    color: colors.secondary,
    fontSize: 12,
    top: 10,
  },
  verifiedBadge: {
    width: 10,
    height: 10,
    top: 1,
    marginHorizontal: 2,
  },
});

export default MessageListItem;
