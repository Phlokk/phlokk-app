import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ChatSingleItem from "../../../components/messages/chatSingle/item/ChatSingleItem";
import colors from "../../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../services/appStateAtoms";
import MessagesNavBar from "./MessageNavbar";
import { MaterialIcons } from '@expo/vector-icons';
import VerifiedIcon from "../../../components/common/VerifiedIcon";
import axios from "../../../redux/apis/axiosDeclaration";
import uuid from "uuid-random";
const ChatSingleScreen = ({ route }) => {
  const { chat, socket } = route.params;
  const [currentUser] = useAtom(userAtom);
  const [stats, setStats] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [pagination, settPagination] = useState({});
  // TODOS:
  // 1: by default page should be at the bottom scrolled
  // 2: on scroll up fetch old messages (api already set page = 2)
  // 3: when new msg is sent make the scroll to that msg (REF)
  // 4: delete msg
  // 5: reply msg (reply_id)
  // 6: when new msg is sent make sure to update the last msg on the chats list screen
  // 7: mute and archive chats
  //

  useEffect(() => {
    socket.emit("INSTANT_CHAT_JOIN", { user: currentUser, chat });
    socket.on("INSTANT_CHAT_JOINED", () => {});
    getUserStats();
  }, []);
  useEffect(() => {
    socket.on("INSTANT_MESSAGE_RECIEVED", (msg) => handleUpdateMessage(msg));
    getMessages();
  }, []);

  const getMessages = async () => {
    const response = await axios.get(`/api/instant-chat-message/${chat._id}`);
    setMessages(response.data.data);
    settPagination(response.data.pagination);
  };
  const getUserStats = async () => {
    const response = await axios.get(
      `/api/instant-chat/user/stats/${chat?.user?._id || chat?.user?.id}`
    );
    setStats(response.data);
  };
  const renderItem = ({ item, index }) => (
    <ChatSingleItem item={item} chat={chat} user={currentUser} index={index} />
  );
  const sendMessage = async () => {
    if (message == "") return;
    const msgObject = {
      _id: uuid().toString(),
      replyId: null,
      userId: currentUser._id,
      chatId: chat._id,
      message,
    };
    socket.emit("INSTANT_MESSAGE_SENT", msgObject);
    setMessage("");
    setMessages((e) => [
      ...e,
      { ...msgObject, created_at: new Date(), user_id: msgObject.userId },
    ]);
  };
  const handleUpdateMessage = (msg) => {
    console.log("msg rec");
    setMessages((e) => [...e, msg]);
  };
  const FlatListHeader = (
    <View style={styles.userProfile}>
      <Image source={{ uri: chat?.user?.photo_url }} style={styles.avatar} />
      <View style={styles.user}>
        <Text style={styles.username}>{chat?.user?.username}</Text>
        <View style={styles.verifiedIcon}>
          {chat?.user?.is_verified ? <VerifiedIcon /> : null}
        </View>
      </View>
      <Text style={styles.followers}>
        Following this account - {stats?.numberOfFriends}
      </Text>
      <Text style={styles.posts}>Videos posted - {stats?.numnberOfPosts}</Text>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <MessagesNavBar user={chat?.user} />

        <FlatList
          ListHeaderComponent={FlatListHeader}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          style={styles.messages}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.containerInput}>
            <View style={styles.containerInputView}>
            <TextInput
              style={styles.input}
              placeholder="Message..."
              placeholderTextColor={colors.secondary}
              multiline
              value={message}
              onChangeText={setMessage}
              maxLength={1200}
            />
            
            </View>
            <View style={styles.sendMailIconView}>
              <TouchableOpacity onPress={sendMessage}>
              <MaterialIcons name="send" size={30} color={colors.green} />
              </TouchableOpacity>
            </View>
            
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    flex: 1,
    backgroundColor: colors.primary,
    
  },
  containerInput: {
    marginTop: 5,
    bottom: 30,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  containerInputView: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: colors.settingsBlack,
    borderRadius: 50,
    flex: 1,
    padding: 15,
    width: "100%",
    color: colors.secondary,
    alignItems: "center",
    fontSize: 16,
    lineHeight: 23,
  },
  textComment: {
    color: colors.white,
  },
  userProfile: {
    alignItems: "center",
    marginBottom: 45,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  user: {
    flexDirection: "row",
  },
  username: {
    marginTop: 15,
    fontSize: 16,
    color: colors.white,
  },
  verifiedIcon: {
    top: 24,
  },
  followers: {
    marginTop: 10,
    color: colors.white,
  },
  posts: {
    marginTop: 10,
    color: colors.white,
  },
  messages: {
    marginBottom: 20,
  },
  sendMailIconView: {
    right: 55,
  },
});

export default ChatSingleScreen;
