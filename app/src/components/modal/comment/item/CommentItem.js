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
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../services/appStateAtoms";
import CustomAlert from "../../../Alerts/CustomAlert";
import {
  deleteComment,
  deleteCommentReply,
  deleteReplyOfReply,
  timeSince,
} from "../../../../services/posts";
import { likeComment, likeCommentReply, likeCommentReplyToReply } from "../../../../redux/actions/likes";
import VerifiedIcon from "../../../common/VerifiedIcon";
import { useTheme } from "../../../../theme/context";
import { likeCountFormatter } from "../../../common/NumberFormatter";

const CommentItem = ({
  comment, 
  post,
  setCommentList,
  onReplyPressed,
  isReply,
  replyOfReply,
  setRefech,
  commentList,
  index
}) => {
  const { theme } = useTheme();

  const navigation = useNavigation();
  const [user] = useAtom(userAtom);

  const [isLiked, setIsLiked] = useState(comment.is_liked );
  const [likeCount, setLikeCount] = useState(comment.like_count);

  const isActiveAccount = comment.user !== null;

  const [isDeleteCommentModalOpen, setIsDeleteCommentModalOpen] =
    useState(false);

  const likeButtonHandler = async () => {
    const type = isLiked ? "unlike" : "like"; 
    try {
      if (!isReply) {
        await likeComment(post._id, comment._id, type, user._id, (post.user.id ?? post.user._id));
      } else {
        if(replyOfReply){
          await likeCommentReplyToReply(post._id, comment._id, type, user._id,  (comment.user._id ?? comment.user.id));
        }else{
          await likeCommentReply(post._id, comment._id, type, user._id, (comment.user._id ?? comment.user.id));
        }
      }
      // setRefech(e=> !e)
      setLikeCount((prev) => (comment.is_liked ? prev - 1 : prev + 1));
      comment.like_count = comment.is_liked ? comment.like_count - 1 :  comment.like_count + 1;
      comment.is_liked = comment.is_liked ? 0 : 1;
      setCommentList([...commentList])
      setIsLiked(!isLiked);
    } catch (err) {
      console.log("Error", err)
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
        setCommentList(prev => filterCommentReplies(prev, comment._id) );
        if(replyOfReply){
          await deleteReplyOfReply(post._id, comment._id);
        }else{
          await deleteCommentReply(post._id, comment._id);
        }         
      }
    } catch (e) {
      Alert.alert("Could not delete comment.");
    }
  
  };
  const filterCommentReplies = (commentList, commentId) => { 
    for (const comment of commentList) {
      if(comment.comment_replies) {
        for (const [replyIndex, reply] of comment.comment_replies.entries()){
          if(reply._id === commentId) comment.comment_replies.splice(replyIndex, 1); 
          if(reply.comment_replies){
            for (const [replyOfReplyIndex, replyOfReply] of reply.comment_replies.entries()){
              if(replyOfReply._id === commentId) reply.comment_replies.splice(replyOfReplyIndex, 1); 
            } 
          } 
        } 
      } 
    } 
    return [...commentList]
  };

  const isCommentCurrentUser =
    user._id === (comment.user?._id ?? comment.user?.id);
  const isPostFromCurrentUser = post.user
    ? user._id === (post.user._id ?? post.user.id)
    : true;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={isActiveAccount ? user._id == comment.user_id : null}
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
            isActiveAccount &&
            (comment.user?.photo_thumb_url || comment?.user?.photo_url)
              ? {
                  uri:
                    comment.user?.photo_thumb_url || comment?.user?.photo_url,
                }
              : require("../../../../../assets/userImage.png")
          }
        />
      </TouchableOpacity>

      <Pressable
        style={styles.containerText}
        onLongPress={() => {
          if (isPostFromCurrentUser || isCommentCurrentUser) {
            return setIsDeleteCommentModalOpen(true);
          }
        }}
      >
        <View style={styles.userDetailsContainer}>
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
              {isActiveAccount ? comment.user.username : "phlokker"}
            </Text>
          </TouchableOpacity>
          {comment.user && comment.user.is_verified === 1 && <VerifiedIcon />} 
        </View>
        {/* TODO => fix verified icon for reply of reply  */}
        {replyOfReply && (
            <View style={{...styles.verifiedRow, marginLeft :4}}> 
              <TouchableOpacity
                disabled={
                  isActiveAccount ? user._id == replyOfReply?.user._id : null
                }
                onPress={() => {
                  isActiveAccount
                    ? navigation.navigate("feedProfile", {
                        initialUser: replyOfReply?.user,
                      })
                    : null;
                }}
                style={styles.verifiedRow}
              > 
               <FontAwesome name="caret-right" size={15} color={colors.green} />
                <Text
                  style={
                    theme == "light"
                      ? {...styles.username_light, marginLeft:4}
                      : {...styles.username_dark, marginLeft:4}
                  }
                >
                  {isActiveAccount ? replyOfReply?.user.username : "phlokker"}
                </Text> 
              </TouchableOpacity>
              {comment?.user && comment?.user.is_verified && ( 
                <VerifiedIcon />
              )}
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
          {comment.message}
        </Text>
        <View style={styles.replyRow}>
          <Text style={theme == "light" ? styles.date_light : styles.date_dark}>
            {comment.created_at ? timeSince(comment.created_at) : "Now"}
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
              name={comment.is_liked ? "star" : "star-outline"}
            />
          </TouchableOpacity>
          <Text
            style={
              theme == "light" ? styles.starCount_light : styles.starCount_dark
            }
          >
            {likeCountFormatter(comment.like_count)}
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
  userDetailsContainer: {
    flex: 1,
    flexDirection:"row",
    alignItems: "center"
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
  repliesUserName:{

  },
});

export default CommentItem;
