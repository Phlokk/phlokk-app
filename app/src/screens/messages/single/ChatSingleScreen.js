import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ChatSingleItem from "../../../components/messages/chatSingle/item";
import { useMessages } from "../../../hooks/useMessages";
import { sendMessage } from "../../../services/chats";

import MessagesNavBar from "../../../components/general/messagesNav";

import colors from "../../../../config/colors"


const ChatSingleScreen = ({ route }) => {
  const { chatId, contactId } = route.params
  const [message, setMessage] = useState('')
 
 
  const {messages, chatIdInst} = useMessages(chatId, contactId)
  const handleCommentSend = () => {
    if (message.length == 0) {
      return;
    }
    setMessage('')
    sendMessage(chatIdInst, message)
  }

  const renderItem = ({ item }) => {
    return <ChatSingleItem item={item} />;
  }

  return (
    <>
    
    <View style={styles.container}>
      <MessagesNavBar title={'Inbox'} />
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder='Send message...'
          placeholderTextColor={"gray"}
          multiline
          value={message}
          onChangeText={setMessage}
          maxLength={1200}
        />
        <TouchableOpacity onPress={() => handleCommentSend()}>
          <Ionicons name="paper-plane" size={30} color={"gray"} />
          
        </TouchableOpacity>
        
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
    padding: 25,
    flexDirection: "row",
    alignItems: 'center',
  },
  input: {
    backgroundColor: "#1C1C1C",
    borderRadius: 8,
    flex: 1,
    padding: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    color: colors.secondary,
    justifyContent: "center",
    alignItems: 'center',
  },

  textComment: {
    color: colors.white,
  },
});


export default ChatSingleScreen;
