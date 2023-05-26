import React, { useRef ,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal,
  Pressable,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../../theme/context";
import colors from "../../../config/colors";
import axios from "../../redux/apis/axiosDeclaration";
import { numberFormatter } from "../../components/common/NumberFormatter";
import ChatItem from "./ChatItem";
export default function ChatModal({
  party,
  currentUser,
  open,
  onClose,
  addComment,
  comment,
  setComment,
  commentCount,
  comments,
  setReply
}) {
  const { theme } = useTheme();
  const commentTextInputRef = useRef();
  useEffect(()=> {
    if(!comment) setReply(null)
  },[comment])

  const RenderChatItem = ({ item, index }) => {
    return (
      <View>
        <View>
          <ChatItem
            party={party}
            comment={item}
            index={index}
            replyOfReply={() => {}}
            onReplyPressed={(key) => {
              setReply({commentId: item?._id})
              setComment(`@${key?.user?.username} `);
              commentTextInputRef.current.focus();
            }}
          />
          {item?.comment_replies &&
            item?.comment_replies?.map((reply, kIndex) => (
              <View key={reply?._id} style={{ marginLeft: 40, marginTop: -10 }}>
                <ChatItem
                party={party}
                  comment={reply}
                  index={kIndex}
                  replyOfReply={() => {}}
                  parentComment={item}
                  onReplyPressed={(key) => {
                    setReply({commentId: item?._id , replyToCommentId: reply?._id})
                    setComment(`@${key?.user?.username} `);
                    commentTextInputRef.current.focus();
                  }}
                />
                {reply?.comment_replies &&
                  reply?.comment_replies.map((replyOfReply, jIndex) => (
                    <View
                      key={replyOfReply?._id}
                      style={{ marginLeft: 0, marginTop: -10 }}
                    >
                      <ChatItem
                      party={party}
                        comment={replyOfReply}
                        index={jIndex}
                        replyOfReply={() => {}}
                        isReplyOfReply={true}
                        parentComment={reply}
                      />
                    </View>
                  ))}
              </View>
            ))}
        </View>
      </View>
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={open}>
      <View style={styles.pressedModal}>
        <Pressable style={styles.pressedStyle} onPress={onClose} />
        <View style={styles.modal_content}>
          <View style={styles.countRow}>
            <Text
              style={
                theme == "light"
                  ? styles.postCountText_light
                  : styles.postCountText_dark
              }
            >
              Comment {numberFormatter(commentCount)}
            </Text>
          </View>
          <View style={styles.containerInput}>
            {!currentUser?.photo_url ? (
              <Image
                style={styles.avatar}
                source={require("../../../assets/userImage.png")}
                cache="only-if-cached"
              />
            ) : (
              <TouchableOpacity>
                <Image
                  style={styles.avatar}
                  source={{ uri: currentUser?.photo_url }}
                />
              </TouchableOpacity>
            )}
            <ScrollView>
              <TextInput
                selectionColor={colors.green}
                style={styles.input}
                placeholder="Add comment..."
                placeholderTextColor="gray"
                multiline
                value={comment}
                onChangeText={setComment}
                maxLength={150}
                ref={commentTextInputRef}
              />
              {comment !== "" && (
                <View style={styles.closeButton}>
                  <TouchableOpacity onPress={addComment}>
                    <FontAwesome
                      style={styles.circle}
                      name="circle"
                      size={23}
                    />
                    <Ionicons
                      name="arrow-up-circle"
                      size={27}
                      color={colors.green}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>
          <FlatList
            data={comments}
            renderItem={RenderChatItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </Modal>
  );
}

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
  modal_content: {
    height: "80%",
    backgroundColor: colors.settingsBlack,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  containerInput: {
    padding: 20,
    bottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: colors.commentInput,
    borderRadius: 20,
    flex: 1,
    paddingTop: 8,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    paddingRight: 30,
    paddingVertical: 7,
    paddingRight: 40,
    color: colors.secondary,
    maxHeight: 200,
  },
  closeButton: {
    top: Platform.OS === "android" ? 7 : 2,
    right: 10,
    position: "absolute",
  },
  avatar: {
    height: 30,
    width: 30,
    right: 5,
    borderRadius: 50,
  },
  countRow: {
    marginTop: 10,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  postCountText_light: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
    marginHorizontal: 15,
  },
  postCountText_dark: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.secondary,
    textAlign: "center",
    marginHorizontal: 15,
  },
  circle: {
    top: 3,
    right: 3.2,
    position: "absolute",
    color: colors.white,
  },
});
