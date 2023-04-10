import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Text,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import CommentItem from "./item/CommentItem";
import {
  addComment,
  addCommentReply,
  addReplyToReply,
} from "../../../services/posts";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../services/appStateAtoms";
import uuid from "uuid-random";
import { useTheme } from "../../../theme/context";
import CustomAlert from "../../Alerts/CustomAlert";
import { numberFormatter } from "../../common/NumberFormatter";

function CommentModal({
  post,
  onNewCommentSubmitted,
  commentList,
  setCommentList,
  commentCount,
  setCommentCount,
  setRefech,
}) {
  const { theme } = useTheme();
  const commentTextInputRef = useRef();

  const [comment, setComment] = useState("");
  const [repliedToComment, setRepliedToComment] = useState();

  const [isLinked, setIsLinked] = useState(false);

  const [user] = useAtom(userAtom);
  const submitReply = async () => {
    if (comment.length == 0) {
      return;
    }
    let commentTextToSubmit = comment;
    const newComment = {
      _id: uuid().toString(),
      message: commentTextToSubmit,
      comment_replies: [],
      user: user,
      post: post,
      user_id: user._id,
      is_reply: !!repliedToComment,
      like_count: 0,
    };

    if (repliedToComment) {
      newComment.message = newComment.message.replace(
        `@${repliedToComment.user.username} `,
        ""
      );
      for (const singleComment of commentList) {
        if (singleComment._id === repliedToComment._id) {
          if (
            singleComment.comment_replies &&
            Array.isArray(singleComment.comment_replies)
          ) {
            singleComment.comment_replies.push(newComment);
            setCommentList([...commentList]);
            await postCommentReply(repliedToComment, newComment);
          } else {
            singleComment.comment_replies = [newComment];
            setCommentList([...commentList]);
            await postCommentReply(repliedToComment, newComment);
          }
        } else {
          if (singleComment?.comment_replies) {
            for (const commentReply of singleComment?.comment_replies) {
              if (commentReply._id === repliedToComment._id) {
                await postReplyOfReply(commentReply, newComment, singleComment);
              }
            }
          }
        }
      }
    } else {
      await postComment(newComment);
    }
  };
  const postReplyOfReply = async (repliedToComment, comment, singleComment) => {
    setCommentList((e) => {
      const commentLists = [...e];
      for (const singleComment of commentLists) {
        if (singleComment.comment_replies) {
          for (const reply of singleComment.comment_replies) {
            if (reply._id === repliedToComment._id) {
              if (reply.comment_replies) {
                reply.comment_replies.push(comment);
              } else {
                reply.comment_replies = [comment];
              }
            }
          }
        }
      }
      return commentLists;
    });
    await addReplyToReply(repliedToComment, comment, singleComment);
    setComment("");
    setCommentCount((prev) => prev + 1);
    onNewCommentSubmitted();
  };
  const postCommentReply = async (repliedToComment, comment) => {
    await addCommentReply(repliedToComment, comment);
    setComment("");
    setCommentCount((prev) => prev + 1);
    onNewCommentSubmitted();
  };
  const postComment = async (comment) => {
    await addComment(comment);
    setCommentList((e) => [comment, ...e]);
    setComment("");
    setCommentCount((prev) => prev + 1);
    onNewCommentSubmitted();
  };

  const HASHTAG_FORMATTER = (string) => {
    if (string === null) {
      return;
    }

    return string
      .split(/((?:^|\s)(?:#[a-z\d-] || @[a-z\d-]+))/gi)
      .filter(Boolean)
      .map((tag, i) => {
        if (tag.includes("#") || tag.includes("@")) {
          return (
            <Text
              key={i}
              onPress={() => {
                setIsLinked(true);
              }}
              style={styles.tags}
            >
              {JSON.stringify(tag).slice(1, -1)}
            </Text>
          );
        } else {
          return <Text key={i}>{tag}</Text>;
        }
      });
  };

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <View style={item.is_reply && { marginLeft: 40, marginTop: -10 }}>
          <CommentItem
            setCommentList={setCommentList}
            setComment={setComment}
            index={index}
            comment={item}
            post={post}
            isReply={item.is_reply}
            setRefech={setRefech}
            onReplyPressed={(comment) => {
              setRepliedToComment(comment);
              setComment(`@${comment.user.username} `);
              commentTextInputRef.current.focus();
            }}
          />
        </View>
        {item.comment_replies &&
          item.comment_replies.map((reply) => (
            <View key={reply._id} style={{ marginLeft: 40, marginTop: -10 }}>
              <CommentItem
                setCommentList={setCommentList}
                setRefech={setRefech}
                setComment={setComment}
                comment={reply}
                key={reply._id}
                post={post}
                isReply={true}
                onReplyPressed={(comment) => {
                  setRepliedToComment(reply);
                  setComment(`@${comment.user.username} `);
                  commentTextInputRef.current.focus();
                }}
              />
              {reply.comment_replies &&
                reply.comment_replies.map((replyOfReply) => (
                  <View
                    key={replyOfReply._id}
                    style={{ marginLeft: 0, marginTop: -10 }}
                  >
                    <CommentItem
                      replyOfReply={reply}
                      setRefech={setRefech}
                      setCommentList={setCommentList}
                      setComment={setComment}
                      comment={replyOfReply}
                      key={replyOfReply._id}
                      post={post}
                      isReply={true}
                      onReplyPressed={(comment) => {
                        setRepliedToComment(replyOfReply);
                        setComment(`@${comment.user.username} `);
                        commentTextInputRef.current.focus();
                      }}
                    />
                  </View>
                ))}
            </View>
          ))}
      </View>
    );
  };

  if (post.user.disable_comments) {
    return (
      <View
        style={
          theme == "light"
            ? styles.disabledCommentWrapper_light
            : styles.disabledCommentWrapper_dark
        }
      >
        <Text
          style={
            theme == "light"
              ? styles.warningText_light
              : styles.warningText_dark
          }
        >
          This user has disabled comments
        </Text>
      </View>
    );
  }
  const handleOnChange = useCallback(
    (newCommentText) => {
      if (!repliedToComment) {
        setComment(newCommentText);
        return;
      } 
      const authorNameLength = repliedToComment?.user.username.length || 0;

      // If the username has a character deleted, we are no longer responding, just delete the user name too
      if (newCommentText.length - 1 <= authorNameLength) {
        setComment("");
        setRepliedToComment();
        return;
      }

      // If the user tries to insert text before the username, do not insert the text
      if (repliedToComment) {
        if (!newCommentText.startsWith(`@${repliedToComment.user.username} `)) {
          return;
        }
      }

      setComment(newCommentText);
    },
    [comment]
  );

  return (
    <View
      style={theme == "light" ? styles.container_light : styles.container_dark}
    >
      {/* {user.disable_comments === 0 ? ( */}
      <View style={styles.countRow}>
        <Text
          style={
            theme == "light"
              ? styles.postCountText_light
              : styles.postCountText_dark
          }
        >
          Comments {numberFormatter(commentCount)}
        </Text>
        {/* TODO: show like count on comment modal to user who owns the post */}
        {user?._id === post.user?._id && (
          <Text
            style={
              theme == "light"
                ? styles.postCountText_light
                : styles.postCountText_dark
            }
          >
            Stars {numberFormatter(post.like_count)}
          </Text>
        )}
      </View>

      {/* {user.disable_comments === 0 && ( */}
      <View style={styles.containerInput}>
        {!user?.photo_url ? (
          <Image
            style={styles.avatar}
            source={require("../../../../assets/userImage.png")}
            cache="only-if-cached"
          />
        ) : (
          <TouchableOpacity>
            <Image style={styles.avatar} source={{ uri: user.photo_url }} />
          </TouchableOpacity>
        )}
        <ScrollView>
          <TextInput
            ref={commentTextInputRef}
            selectionColor={colors.green}
            style={styles.input}
            placeholder="Add comment..."
            placeholderTextColor="gray"
            multiline
            value={comment}
            onChangeText={handleOnChange}
            maxLength={150}
          />

          {comment !== "" && (
            <View style={styles.closeButton}>
              <TouchableOpacity onPress={() => submitReply()}>
                <FontAwesome style={styles.circle} name="circle" size={23} />
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
      {/* )} */}
      <FlatList
        data={commentList}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Tags & Mentions coming soon!</Text>}
        positiveBtn="Ok"
        modalVisible={isLinked}
        dismissAlert={setIsLinked}
        animationType="fade"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container_light: {
    padding: 10,
    justifyContent: "flex-end",
    backgroundColor: colors.white,
    height: "60%",
  },

  container_dark: {
    padding: 10,
    justifyContent: "flex-end",
    backgroundColor: colors.black,
    height: "60%",
  },
  disabledCommentWrapper_light: {
    backgroundColor: colors.white,
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  disabledCommentWrapper_dark: {
    backgroundColor: colors.black,
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
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

  textComment: {
    color: colors.white,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 50,
  },
  postCountText_light: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.black,
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
  warningText_light: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.black,
    textAlign: "center",
    marginHorizontal: 15,
  },
  warningText_dark: {
    fontSize: 12,
    fontWeight: "bold",
    color: "rgba(125, 125, 125, 0.7)",
    textAlign: "center",
    marginHorizontal: 15,
  },
  closeButton: {
    top: Platform.OS === "android" ? 7 : 2,
    right: 10,
    position: "absolute",
  },
  circle: {
    top: 3,
    right: 3.2,
    position: "absolute",
    color: colors.white,
  },
  countRow: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommentModal;
