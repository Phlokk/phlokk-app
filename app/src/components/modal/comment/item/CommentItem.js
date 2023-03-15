import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../services/appStateAtoms";
import CustomAlert from "../../../Alerts/CustomAlert";
import {
  deleteComment,
  deleteCommentReply,
  timeSince,
} from "../../../../services/posts";
import { likeComment, likeCommentReply } from "../../../../redux/actions/likes";
import VerifiedIcon from "../../../common/VerifiedIcon";
import { useTheme } from "../../../../theme/context";
import { likeCountFormatter } from "../../../common/NumberFormatter";


const CommentItem = ({
  comment,
  post,
  setCommentList,
  onReplyPressed,
  isReply,
}) => {
  const { theme } = useTheme();

  const navigation = useNavigation();
  const [ user ] = useAtom(userAtom);


  const [isLiked, setIsLiked] = useState(comment.is_liked);
  const [likeCount, setLikeCount] = useState(comment.like_count);

  const isActiveAccount = comment.user !== null;

  const [isDeleteCommentModalOpen, setIsDeleteCommentModalOpen] =
    useState(false);

  const likeButtonHandler = async () => {
    const type = isLiked ? "unlike" : "like";
    try {
      if (!isReply) {
        await likeComment(post._id, comment._id, type);
      } else {
        await likeCommentReply(post._id, comment.comment_id, comment._id, type);
      }

      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch {
      Alert.alert("Could not like this comment!");
    }
  };

  const onDeleteCommentConfirmed = async () => {
    try {
      if (!isReply) {
        await deleteComment(post._id, comment._id);

        setCommentList((prev) => {
          const newCommentList = prev.filter((c) => c._id !== comment._id);

          return newCommentList;
        });
      } else {
        await deleteCommentReply(post._id, comment.comment_id, comment._id);

        setCommentList((prev) => {
          const newCommentList = prev.map((c) => {
            const filteredReplies = c.comment_replies.filter((reply) => {
              return reply._id !== comment._id;
            });

            c.comment_replies = filteredReplies;
            return c;
          });

          return newCommentList;
        });
      }
    } catch (e) {
      Alert.alert("Could not delete comment.");
    }
  };

  const isCommentCurrentUser = user._id === comment.user_id;
  const isPostFromCurrentUser = user._id === post.user._id;


  return (
    <View style={styles.container}>
      
    <TouchableOpacity
        disabled={isActiveAccount ? user._id == comment.user._id : null}
        onPress={() => {
          isActiveAccount
            ? navigation.navigate("feedProfile", {
                initialUser: comment.user,
              })
            : null;
        }}
      >
        <Image
          style={styles.avatar}
          source={
            isActiveAccount && comment.user?.photo_thumb_url
              ? { uri: comment.user?.photo_thumb_url }
              : require("../../../../../assets/userImage.png")
          }
        />
      </TouchableOpacity>
      
      

      <Pressable
        style={styles.containerText}
        onLongPress={() => {
          if (isPostFromCurrentUser) {
            setIsDeleteCommentModalOpen(true);
            return;
          }
          if (isCommentCurrentUser) {
            setIsDeleteCommentModalOpen(true);
            return;
          }
        }}
      >
        <View style={styles.verifiedRow}>
          <TouchableOpacity
            disabled={isActiveAccount ? user._id == comment.user._id : null}
            onPress={() => {
              isActiveAccount
                ? navigation.navigate("feedProfile", {
                    initialUser: comment.user,
                  })
                : null;
            }}
          >
            <Text
              style={
                theme == "light" ? styles.username_light : styles.username_dark
              }
            >
              @{isActiveAccount ? comment.user.username : "phlokker"}
            </Text>
          </TouchableOpacity>
          {comment.user && comment.user.is_verified === 1 && <VerifiedIcon />}
        </View>
        <Text
          style={
            theme == "light"
              ? styles.textComment_light
              : styles.textComment_dark
          }
        >
          {comment.message}
        </Text>
        <View style={styles.replyRow}>
          <Text style={theme == "light" ? styles.date_light : styles.date_dark}>
            {comment.created_at
              ? timeSince(new Date(comment.created_at))
              : "Now"}
          </Text>

          {isActiveAccount && (
            <TouchableOpacity
              onPress={() => {
                onReplyPressed(comment);
              }}
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
      {comment._id.indexOf("-temp") === -1 && isActiveAccount && (
        <View style={styles.starRow}>
          <TouchableOpacity onPress={likeButtonHandler}>
            <MaterialCommunityIcons
              color={colors.green}
              size={20}
              name={isLiked ? "star" : "star-outline"}
            />
          </TouchableOpacity>
          <Text
            style={
              theme == "light" ? styles.starCount_light : styles.starCount_dark
            }
          >
            {likeCountFormatter(likeCount)}
          </Text>
       
        </View>
        
      )}
      

      <CustomAlert
        customAlertMessage="Delete this comment?"
        negativeBtn="Cancel"
        positiveBtn="Delete"
        modalVisible={isDeleteCommentModalOpen}
        dismissAlert={setIsDeleteCommentModalOpen}
        onPositivePressed={onDeleteCommentConfirmed}
      />
      
  
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
});

export default CommentItem;
