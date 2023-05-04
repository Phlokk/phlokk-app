import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import React from "react";
import { useTheme } from "../../theme/context";
import colors from "../../../config/colors";
const RecentComments = ({ comments, visible, setIsVisible, setSelectedComment }) => {
  const { theme } = useTheme();
  const renderComment = ({ item }) => {
    return (
      <TouchableOpacity onPress={()=> {
        setSelectedComment(item);
        setIsVisible(false)
      }} style={styles.commentContainer}>
        <View style={styles.commentUser}>
          <Image
            source={
              item.user?.photo_thumb_url
                ? { uri: item.user?.photo_thumb_url }
                : require("../../../assets/userImage.png")
            }
            style={styles.avatar}
          />
          <View style={styles.comment}>
            <Text style={styles.commentUsername}>Reply to</Text>
            <Text style={styles.username} numberOfLines={1}
            > {item.user?.username}</Text>
          </View>
        </View>
          <Text style={styles.commentMessage}>{item.message}</Text> 
      </TouchableOpacity>
    );
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.pressedModal}>
        <Pressable style={styles.pressedStyle} onPress={setIsVisible} />
        <View
          style={
            theme == "light" ? styles.container_light : styles.container_dark
          }
        >
          <FlatList
            renderItem={renderComment}
            data={comments}
            keyExtractor={(item) => item._id}
            numColumns={2}
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
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
  container_light: {
    padding: 10,
    justifyContent: "flex-end",
    backgroundColor: colors.white,
    height: "70%",
  },
  container_dark: {
    padding: 10,
    justifyContent: "flex-end",
    backgroundColor: colors.primary,
    height: "70%",
  },
  commentContainer: {
    backgroundColor: colors.white,
    height: "auto",
    flex: 1,
    margin: 5,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 10,
  },
  commentUser: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  commentMessage: {
    color: colors.primary,
    fontSize: 12,
  },
  username: {
    fontWeight: "600",
    fontSize: 12,
    marginLeft: 7,
  },
  commentUsername: {
    fontSize: 12,
    marginLeft: 10,
  },
});
export default RecentComments;
