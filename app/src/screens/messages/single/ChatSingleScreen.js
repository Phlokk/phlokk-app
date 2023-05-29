import React, { useState, useEffect, useRef } from "react";
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
import { MaterialIcons } from "@expo/vector-icons";
import VerifiedIcon from "../../../components/common/VerifiedIcon";
import axios from "../../../redux/apis/axiosDeclaration";
import uuid from "uuid-random";
import { MenuProvider } from "react-native-popup-menu";
const ChatSingleScreen = ({ route }) => {
  const { chat, socket } = route.params;
  const messagesRef = useRef();
  const [currentUser] = useAtom(userAtom);
  const user = currentUser?._id === chat?.user?._id ? chat?.host : chat?.user;
  const [stats, setStats] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [pagination, settPagination] = useState({});
  const [replyToMessage, setReplyToMessage] = useState(null);
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
      `/api/instant-chat/user/stats/${user?._id || user?.id}`
    );
    setStats(response.data);
  };
  const renderItem = ({ item, index }) => (
    <ChatSingleItem
      item={item}
      chat={chat}
      user={currentUser}
      sender={user}
      index={index}
      setReplyToMessage={setReplyToMessage}
    />
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
      { ...msgObject, created_at: new Date(), user_id: msgObject.userId },
      ...e,
    ]);
    scrollToBottom();
  };
  const handleUpdateMessage = (msg) => {
    const idx = messages.map((e) => e._id);
    if (msg?._id && !idx.includes(msg?._id)) {
      setMessages((e) => [msg, ...e]);
      scrollToBottom();
    }
  };
  const FlatListHeader = () => (
    <View style={styles.userProfile}>
      <Image source={{ uri: user?.photo_url }} style={styles.avatar} />
      <View style={styles.user}>
        <Text style={styles.username}>{user?.username}</Text>
        <View style={styles.verifiedIcon}>
          {user?.is_verified ? <VerifiedIcon /> : null}
        </View>
      </View>
      <Text style={styles.followers}>
        Following this account - {stats?.numberOfFriends}
      </Text>
      <Text style={styles.posts}>Videos posted - {stats?.numnberOfPosts}</Text>
    </View>
  );
  const handleDeleteMessage = async (id) => {
    await axios.delete(`/api/instant-chat-message/${id}`);
    setMessages([...messages.filter((e) => e._id !== id)]);
  };
  const RenderReplyMessage = () => {
    return (
      <View style={ replyToMessage?.user_id === currentUser._id ? styles.replyContainer : styles.replyContainerOther }>
       <View style={replyToMessage?.user_id === currentUser._id ? styles.replyGreenBubble : styles.replyPurpleBubble }>
       <Text style={replyToMessage?.user_id === currentUser._id ? styles.replyText : styles.replyTextOther   } numberOfLines={3}>
          {replyToMessage?.message}
        </Text>
       </View>
        <TouchableOpacity
          onPress={() => setReplyToMessage(null)}
          style={styles.crossBtn}
        >
          <MaterialIcons name="send" size={25} style={styles.crossIconView} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <MessagesNavBar user={user} />
        {/* <FlatListHeader /> */}
        <MenuProvider>
          <FlatList
            ref={messagesRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
            style={styles.messages}
            initialNumToRender={1000}
            onEndReached={() => console.log("end reached a")}
            inverted
          />
        </MenuProvider>
      </View>
      <View style={styles.inputWrapper}>
        {replyToMessage && <RenderReplyMessage />}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.containerInput}>
            <TextInput
              style={styles.input}
              placeholder="Message..."
              placeholderTextColor={colors.secondary}
              multiline
              value={message}
              onChangeText={setMessage}
              maxLength={1200}
            />
            <View style={styles.sendMailIconView}>
              <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
                <MaterialIcons
                  name="send"
                  size={25}
                  style={styles.messageIconView}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={sendMessage}>
                <Ionicons
                  name="mic-outline"
                  size={26}
                  style={styles.messageIconView}
                />
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
    backgroundColor: colors.black,
  },
  containerInput: {
    backgroundColor: colors.settingsBlack,
    marginTop: 5,
    bottom: 20,
    padding: 7,
    flexDirection: "row",
    width: "100%",
  },
  containerInputView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  input: {
    backgroundColor: colors.black,
    borderRadius: 12,
    padding: 15,
    width: "82%",
    color: colors.secondary,
    alignItems: "center",
    fontSize: 16,
    lineHeight: 23,
    paddingRight: 10,
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
    top: 21,
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
    flex: 1,
    flexDirection: "row",
    right: 0,
    position: "absolute",
    bottom: 15,
  },
  messageIconView: {
    color: colors.green,
    paddingHorizontal: 7,
  },
  sendBtn: {
    backgroundColor: colors.settingsBlack,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 30,
    height: 30,
  },
  replyContainer: {
    backgroundColor: colors.darkGrey,
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
  },
  replyContainerOther:{
    backgroundColor: colors.purpleTabs,
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  replyGreenBubble:{
backgroundColor:colors.green,
padding:10,
borderBottomRightRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: "80%",
  },
  replyText: {
    width: "80%",
    // marginBottom: 30,
    color: colors.black,
  },
  replyTextOther:{
    marginBottom: 50,
    color: colors.white,
  },
  crossBtn: {
    // backgroundColor:colors.green
  },
  crossIconView: {
    color: colors.white,
  },
  inputWrapper: {
    backgroundColor: colors.settingsBlack,
  },
});

export default ChatSingleScreen;
