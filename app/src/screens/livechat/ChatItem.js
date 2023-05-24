import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useTheme } from "../../theme/context";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../config/colors";
import VerifiedIcon from "../../components/common/VerifiedIcon";
import { HASHTAG_FORMATTER } from "../../utils/hashtagFormatter";
import { FontAwesome } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { userAtom } from "../../services/appStateAtoms";
import ViewMemberDetails from './ViewMemberDetails';
import { timeSince } from "../../services/posts";
const ChatItem = ({
  party,
  comment,
  parentComment,
  isReplyOfReply,
  onReplyPressed,
}) => {
  const [currentUser] = useAtom(userAtom);
  const [viewMemberDetails, setViewMemberDetails] = useState(false)
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={  
                currentUser?._id !== (comment?.user?._id || comment?.user?.id) ?
                () => setViewMemberDetails(true)
                  : () => {}
               }>
        <Image
          style={styles.avatar}
          source={
            comment?.user?.photo_url
              ? { uri: comment?.user?.photo_url }
              : require("../../../assets/userImage.png")
          }
        />
      </TouchableOpacity>

      <Pressable style={styles.containerText}>
        <View style={styles.userDetailsContainer}>
          <View style={styles.verifiedRow}>
            <TouchableOpacity>
              <Text
                style={
                  theme == "light"
                    ? styles.username_light
                    : styles.username_dark
                }
              >
                {comment?.user?.username || "phlokker"}
              </Text>
            </TouchableOpacity>
            {comment.user && comment?.user?.is_verified === 1 && (
              <VerifiedIcon />
            )}
          </View>
          {parentComment && (
            <View style={{ ...styles.verifiedRow, marginLeft: 4 }}>
              <TouchableOpacity style={styles.verifiedRow}>
                <FontAwesome
                  name="caret-right"
                  size={15}
                  color={colors.green}
                />
                <Text
                  style={
                    theme == "light"
                      ? { ...styles.username_light, marginLeft: 4 }
                      : { ...styles.username_dark, marginLeft: 4 }
                  }
                >
                  {parentComment?.user?.username || "phlokker"}
                </Text>
              </TouchableOpacity>
              {comment?.user && comment?.user.is_verified && <VerifiedIcon />}
            </View>
          )}
        </View>
        <Text
          style={
            theme == "light"
              ? styles.textComment_light
              : styles.textComment_dark
          }
        >
          {HASHTAG_FORMATTER(comment?.message || "", navigation)}
        </Text>
        <View style={styles.replyRow}>
          <Text style={theme == "light" ? styles.date_light : styles.date_dark}>
            {comment?.created_at ? timeSince(comment?.created_at) : "Now"}
          </Text>
          {!isReplyOfReply && (
            <TouchableOpacity
              onPress={
                currentUser?._id !== (comment?.user?._id || comment?.user?.id) ?
                   () => onReplyPressed(comment)
                  : () => {}
              }
            >
              <Text
                style={
                  theme == "light"
                    ? styles.textReplies_light
                    : styles.textReplies_dark
                }
              >
                Reply
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Pressable>
      <ViewMemberDetails open={viewMemberDetails} onClose={()=>setViewMemberDetails(false)} partyMember={comment?.user}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    bottom: 11,
    flexDirection: "row",
    flex: 1,
  },
  containerText: {
    flex: 1,
    marginHorizontal: 14,
  },
  userDetailsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  replyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  username_light: {
    flex: 1,
    color: colors.lightBlack,
    fontSize: 11,
  },
  username_dark: {
    flex: 1,
    color: colors.green,
    fontSize: 11,
  },
  textComment_light: {
    color: colors.lightBlack,
    paddingRight: 40,
    fontSize: 12,
    marginTop: 2,
    opacity: 0.8,
  },
  textComment_dark: {
    color: colors.secondary,
    paddingRight: 40,
    fontSize: 12,
    marginTop: 2,
    opacity: 0.9,
  },
  textReplies_light: {
    color: colors.lightBlack,
    paddingRight: 20,
    fontSize: 10,
    marginHorizontal: 5,
    opacity: 0.6,
  },
  textReplies_dark: {
    color: colors.secondary,
    paddingRight: 20,
    fontSize: 10,
    marginHorizontal: 5,
  },
  date_light: {
    color: colors.lightBlack,
    fontSize: 9,
    opacity: 0.6,
  },
  date_dark: {
    color: colors.secondary,
    fontSize: 9,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 50,
  },
  phlokkVerified: {
    width: 10,
    height: 10,
    marginHorizontal: 3,
  },
  starRow: {
    alignItems: "center",
  },
  starCount_light: {
    color: colors.black,
    fontSize: 10,
    paddingTop: 5,
  },
  starCount_dark: {
    color: colors.secondary,
    fontSize: 10,
    paddingTop: 5,
  },
  repliesUserName: {},
});

export default ChatItem;
