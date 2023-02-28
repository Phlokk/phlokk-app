import React, { useState } from "react";
import { FlatList, View, Text, StyleSheet, Alert } from "react-native";
import MessageListItem from "../../../components/messages/list/item/MessageListItem";
import MessagesNavBar from "../../../components/general/messagesNav/MessagesNavBar";
import { useSelector } from "react-redux";
import { deleteMessageById } from "../../../services/posts";
import { useQueryClient } from "react-query";

import colors from "../../../../config/colors";

const MessageScreen = () => {
  const chats = useSelector((state) => state.chat.list);

  const renderItem = ({ item }) => {
    return <MessageListItem chat={item} />;
  };

  return (
    <View style={styles.container}>
      <MessagesNavBar title={"Instant messages"} />
      <FlatList
        data={chats}
        removeClippedSubviews
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.white,
    marginTop: 30,
    padding: 20,
  },

  rightArrow: {
    position: "absolute",
    backgroundColor: "#0078fe",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -10,
  },

  rightArrowOverlap: {
    position: "absolute",
    backgroundColor: "#eeeeee",
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20,
  },

  /*Arrow head for recevied messages*/
  leftArrow: {
    position: "absolute",
    backgroundColor: "#dedede",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomRightRadius: 25,
    left: -10,
  },

  leftArrowOverlap: {
    position: "absolute",
    backgroundColor: "#eeeeee",
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomRightRadius: 18,
    left: -20,
  },
});
export default MessageScreen;
