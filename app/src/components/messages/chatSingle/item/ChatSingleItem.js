import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { generalStyles } from "../../../../styles";
import colors from "../../../../../config/colors";
import { timeSince } from "../../../../services/posts";

const ChatSingleItem = ({ item, user  }) => {
  const isCurrentUser = item?.user_id === user?._id;
  

  return (
    <View
      style={isCurrentUser ? styles.containerCurrent : styles.containerOther}
    >
      {!isCurrentUser && (
        <Image
          style={{ ...styles.avatar, ...generalStyles.avatarSmall }}
          source={{ uri: user?.photo_url }}
        />
      )}
      <View
        style={
          isCurrentUser
            ? styles.containerTextCurrent
            : styles.containerTextOther
        }
      >
        <Text style={isCurrentUser ? styles.othertext : styles.text}>
          {item?.message}
        </Text>
      </View>
        <Text style={isCurrentUser ? styles.time :  styles.timeOther }>{timeSince(item?.created_at)} ago</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerOther: {
    padding: 10,
    flexDirection: "row",
    flex: 1,
  },
  avatar: {
    bottom: 30,
    position: "absolute",
  },
  containerTextOther: {
    marginHorizontal: 14,
    backgroundColor: colors.settingsBlack,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "60%",
    marginBottom: 20,
    marginLeft: 30,
  },

  containerCurrent: {
    padding: 10,
    flexDirection: "row-reverse",
    flex: 1,
  },
  containerTextCurrent: {
    color: colors.black,
    marginHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 10,
    marginStart: 50,
    backgroundColor: colors.green,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "60%",
    marginBottom: 10,
  },

  text: {
    color: colors.white,
  },
  othertext: {
    color: colors.black,
  },
  username: {
    color: "gray",
    fontSize: 13,
  },
  textComment: {
    color: colors.white,
    paddingRight: 20,
  },
  timeOther:{
    position:"absolute",
    color: colors.white,
    top: 45,
    left: 40,
    color: colors.secondary,
    fontSize: 10
  },
  time:{
    position:"absolute",
    color: colors.white,
    top: 50,
    left: 23,
    color: colors.secondary,
    fontSize: 10
  }
});

export default ChatSingleItem;
