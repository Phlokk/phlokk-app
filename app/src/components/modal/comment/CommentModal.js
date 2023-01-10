import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CommentItem from "./item/CommentItem";
import {
  commentListener,
  clearCommentListener,
  addComment,
  addCommentReply,
} from "../../../services/posts";
import colors from "../../../../config/colors";
import { Entypo } from '@expo/vector-icons'; 
import { Feather } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { userAtom } from "../../../../../App";
import uuid from "uuid-random";
import { useTheme } from "../../../theme/context";

function CommentModal({ post, onNewCommentSubmitted }) {
  const { theme } = useTheme();

  const commentTextInputRef = useRef();

  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [commentCount, setCommentCount] = useState("");
  const [repliedToComment, setRepliedToComment] = useState();
  const [textInput, setTextInput] = useState("");

  const [user] = useAtom(userAtom);

  useEffect(async () => {
    await commentListener(post._id, setCommentList, setCommentCount);
    return () => clearCommentListener();
  }, []);

  const submitReply = async () => {
    if (comment.length == 0) {
      return;
    }

    let commentTextToSubmit = comment;
    let indexToInsertNewComment = 0;

    if (repliedToComment) {
      commentTextToSubmit = commentTextToSubmit.replace(
        `@${repliedToComment.user.username} `,
        ""
      );

      const indexOfRepliedToComment = commentList.findIndex(
        (comment) => comment._id === repliedToComment._id
      );

      indexToInsertNewComment = indexOfRepliedToComment + 1;
    }

    // The comments payload needs to signify that a comment is a reply to another comment
    // It may even need to signify which comment is replying to
    // We can then replicate that same thing above, so when we had a new reply to the UI, we can add a property saying
    // that its a reply

    commentList.splice(indexToInsertNewComment, 0, {
      _id: uuid().toString() + "-temp",
      message: commentTextToSubmit,
      created_at: new Date().toString(),
      replies: [],
      user: user,
      post: post,
      user_id: user._id,
      is_reply: !!repliedToComment,
      like_count: 0,
    });

    setComment("");

    if (!repliedToComment) {
      await addComment(post._id, commentTextToSubmit);
    } else {
      await addCommentReply(
        post._id,
        repliedToComment._id,
        commentTextToSubmit
      );
    }

    setCommentCount((prev) => prev + 1);

    onNewCommentSubmitted();
  };

  const renderItem = ({ item, index }) => {
    return (
      <>
        <View style={item.is_reply && { marginLeft: 40, marginTop: -10 }}>
          <CommentItem
            setCommentList={setCommentList}
            setComment={setComment}
            index={index}
            comment={item}
            post={post}
            isReply={item.is_reply}
            onReplyPressed={(comment) => {
              setRepliedToComment(comment);
              setComment(`@${comment.user.username} `);
              commentTextInputRef.current.focus();
            }}
          />
        </View>
        {item.comment_replies &&
          item.comment_replies.map((reply) => (
            <View style={{ marginLeft: 40, marginTop: -10 }}>
              <CommentItem
                setCommentList={setCommentList}
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
            </View>
          ))}
      </>
    );
  };

  return (
    <View
      style={theme == "light" ? styles.container_light : styles.container_dark}
    >
      <Text
        style={
          theme == "light"
            ? styles.postCountText_light
            : styles.postCountText_dark
        }
      >
        {commentCount} comments
      </Text>

      <View style={styles.containerInput}>
        {!user?.photo_thumb_url && !user?.photo_thumb_url ? (
          <Image
            style={styles.avatar}
            source={require("../../../../assets/userImage.png")}
            cache="only-if-cached"
          />
        ) : (
          <TouchableOpacity>
            <Image
              style={styles.avatar}
              source={{ uri: user.photo_thumb_url }}
            />
          </TouchableOpacity>
        )}
        <TextInput
          ref={commentTextInputRef}
          selectionColor={colors.green}
          style={styles.input}
          placeholder="Add comment..."
          placeholderTextColor={"gray"}
          multiline
          value={comment}
          onChangeText={(newCommentText) => {
            if (!repliedToComment) {
              setComment(newCommentText);
              return;
            }

            const authorNameLength =
              repliedToComment?.user.username.length || 0;

            // If the username has a character deleted, we are no longer responding, just delete the user name too
            if (newCommentText.length - 1 <= authorNameLength) {
              setComment("");
              setRepliedToComment();
              return;
            }

            // If the user tries to insert text before the username, do not insert the text
            if (repliedToComment) {
              if (
                !newCommentText.startsWith(
                  `@${repliedToComment.user.username} `
                )
              ) {
                return;
              }
            }

            setComment(newCommentText);
          }}
          maxLength={150}
        />
        {comment !== "" ? (
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => submitReply()}
          >
             <Ionicons name="arrow-up-circle" size={24} color={colors.green} />
          </TouchableOpacity>
        ) : (
          <Text
            style={styles.closeButton}
          >
            <Ionicons
              name="md-chatbubble-ellipses-outline"
              size={23}
              color={colors.secondary}
            />
          </Text>
        )}
      </View>
      <FlatList
        data={commentList}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        // keyExtractor={() => uuid().toString()}
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
  containerInput: {
    padding: 20,
    bottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: colors.commentInput,
    borderRadius: 50,
    flex: 1,
    paddingTop: 8,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
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
  },
  postCountText_dark: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.secondary,
    textAlign: "center",
  },
  closeButton: {
    top: 25,
    right: 40,
    position: "absolute",
  },
});

export default CommentModal;
