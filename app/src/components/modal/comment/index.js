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
import CommentItem from "./item";
import {
  commentListener,
  clearCommentListener,
  addComment,
  addCommentReply,
} from "../../../services/posts";
import colors from "../../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../../App";
import uuid from "uuid-random";

function CommentModal({ post, onNewCommentSubmitted }) {
  const commentTextInputRef = useRef();

  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState("");
  const [repliedToComment, setRepliedToComment] = useState();

  const [user, setUser] = useAtom(userAtom);

  useEffect(async () => {
    await commentListener(post._id, setCommentList);
    return () => clearCommentListener();
  }, []);

  const handleCommentSend = async () => {
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
                  alert("Coming soon");
                  //   setRepliedToComment(comment);
                  //   setComment(`@${comment.user.username} `);
                  //   commentTextInputRef.current.focus();
                }}
              />
            </View>
          ))}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.postCountText}>{commentList.length} comments</Text>

      <View style={styles.containerInput}>
        {!user?.photo_thumb_url && !user?.photo_thumb_url ? (
          <Image
            style={styles.avatar}
            source={require("../../../../assets/userImage.png")}
            cache="only-if-cached"
          />
        ) : (
          <TouchableOpacity>
            <Image style={styles.avatar} source={{ uri: user.photo_thumb_url }} />
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

            // If the username has a character deleted, we are longer responding, just delete the user name too
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

        <TouchableOpacity onPress={() => handleCommentSend()}>
          <Ionicons name="paper-plane" size={30} color={colors.green} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={commentList}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "flex-end",
    backgroundColor: colors.primary,
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
    borderRadius: 10,
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
    borderWidth: 1,
    borderColor: "lightgray",
  },
  postCountText: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.secondary,
    textAlign: "center",
  },
});

export default CommentModal;
