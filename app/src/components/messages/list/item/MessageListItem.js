import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import routes from "../../../../navigation/routes";
import colors from "../../../../../config/colors";
import VerifiedIcon from "../../../common/VerifiedIcon";
import CustomAlert from "../../../Alerts/CustomAlert";
import { timeSince } from "../../../../services/posts";
const MessageListItem = ({ chat, handleDeleteChat, socket }) => {
  const navigation = useNavigation();
  const [deleteChat, setDeleteChat] = useState(false);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(routes.CHAT_SINGLE, { chat, socket })}
      onLongPress={() => setDeleteChat(true)}
    >
      <Image style={styles.image} source={{ uri: chat?.user?.photo_url }} />
      <View style={{ flex: 1 }}>
        <View style={styles.verifiedRow}>
          <Text style={styles.usernameText}>{chat?.user?.username}</Text>
          {chat?.user?.is_verified ? <VerifiedIcon /> : null}
        </View>
        <Text style={styles.lastMessage}>{chat?.last_message?.[0]?.message}</Text>
      </View>
      <Text style={styles.date}>
        {chat?.last_message?.[0]?.created_at
          ?  `${timeSince(chat?.last_message?.[0]?.created_at)} ago`
          : "Now"}
      </Text>
      <CustomAlert
        alertTitle={"Confirm"}
        customAlertMessage={"Are you sure you want to delete this thread?"}
        positiveBtn={"OK"}
        negativeBtn={"Cancel"}
        modalVisible={deleteChat}
        setModalVisible ={()=> setDeleteChat(false)}
        dismissAlert ={()=> setDeleteChat(false)}
        onPositivePressed={()=> handleDeleteChat(chat._id)}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
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
    fontSize: 14,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 14,
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
