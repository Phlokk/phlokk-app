import React, { useState, useEffect } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import MessageListItem from "../../../components/messages/list/item/MessageListItem";
import MessagesNavBar from "../../../components/general/messagesNav/MessagesNavBar";
import colors from "../../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../services/appStateAtoms";
import axios from "../../../redux/apis/axiosDeclaration";
import io from "socket.io-client";
import { apiUrlsNode } from "../../../globals";
const MessageScreen = () => {
  const socket = io.connect(apiUrlsNode.BASE_URL2, {}, { autoConnect: false });
  const [currentUser] = useAtom(userAtom);
  const [chats, setChats] = useState([]);
  useEffect(() => {
    socket.emit("INSTANT_CHAT", { user: currentUser,}); 

    return () => {
      socket.disconnect(); 
    };
  }, []);
  useEffect(() => {
    getUserChats();
  }, []); 
  const getUserChats = async () => {
    const response = await axios.get(
      `/api/instant-chat/${currentUser._id || currentUser.id}`
    );
    setChats(response.data);
  };
  const handleDeleteChat = async(chatId) => {
    await axios.delete(`/api/instant-chat/${chatId}`)
    setChats([...chats.filter((e)=> e._id !== chatId)])
  }; 
  const renderItem = ({ item, index }) => (
    <MessageListItem
      chat={item}
      index={index}
      currentUser={currentUser}
      handleDeleteChat={handleDeleteChat}
      socket={socket}
    />
  ); 

  return (
    <View style={styles.container}>
      <MessagesNavBar title={"Instant messages"} socket={socket} />
      <FlatList
        data={chats}
        removeClippedSubviews
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />
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
