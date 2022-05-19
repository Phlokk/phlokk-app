import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useUser } from "../../../../hooks/useUser";
import { generalStyles } from "../../../../styles";

import colors from "../../../../../config/colors";

const ChatSingleItem = ({ item }) => {
  const { data: user, isLoading } = useUser(item.creator);

  if (isLoading) {
    return <></>;
  }
  // const isCurrentUser = item.creator === user.id;
  const isCurrentUser = item.creator === user;

  return (
    <View
      style={isCurrentUser ? styles.containerCurrent : styles.containerOther}
    >
      <Image
        style={generalStyles.avatarSmall}
        source={{ uri: user.photo_url }}
      />

      <View
        style={
          isCurrentUser
            ? styles.containerTextCurrent
            : styles.containerTextOther
        }
      >
        <Text style={styles.text}>{item.message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerOther: {
    padding: 10,
    flexDirection: "row",
    flex: 1,
  },
  containerTextOther: {
    marginHorizontal: 14,
    marginEnd: 50,
    backgroundColor: colors.purpleTabs,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  containerCurrent: {
    padding: 10,
    flexDirection: "row-reverse",
    flex: 1,
  },
  containerTextCurrent: {
    marginHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 10,
    marginStart: 50,
    backgroundColor: "#1C1C1C",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: colors.white,
  },
  username: {
    color: "gray",
    fontSize: 13,
  },
  textComment: {
    color: colors.white,
    paddingRight: 20,
  },
});

export default ChatSingleItem;
