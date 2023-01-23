import React, { useState, useEffect, useRef } from "react";
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
import { FontAwesome } from '@expo/vector-icons'; 
import CommentItem from "./item/CommentItem";
import {
  commentListener,
  clearCommentListener,
  addComment,
  addCommentReply,
} from "../../../services/posts";
import colors from "../../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../services/appStateAtoms";
import uuid from "uuid-random";
import { useTheme } from "../../../theme/context";

function CommentModal({ post, onNewCommentSubmitted }) {
  const { theme } = useTheme();

  const commentTextInputRef = useRef();

  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [commentCount, setCommentCount] = useState("");
  const [repliedToComment, setRepliedToComment] = useState();

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
// TODO: reply to replies
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
      
      <View>
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
      </View>
    );
  };

  return (
    <View
      style={theme == "light" ? styles.container_light : styles.container_dark}
    >
      <View style={styles.countRow}>
      <Text
        style={
          theme == "light"
            ? styles.postCountText_light
            : styles.postCountText_dark
        }
      >
        Comments {commentCount}
      </Text>
      <Text
        style={
          theme == "light"
            ? styles.postCountText_light
            : styles.postCountText_dark
        }
      >
        Stars {post.like_count}
      </Text>
      </View>

      <View style={styles.containerInput}>
        {!user?.photo_thumb_url  ? (
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
        <ScrollView>
        <TextInput
          ref={commentTextInputRef}
          selectionColor={colors.green}
          style={styles.input}
          placeholder="Add comment..."
          placeholderTextColor="gray"
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

        {comment !== "" && (
          <View style={styles.closeButton}>
          <TouchableOpacity
            onPress={() => submitReply()}
          >
             <FontAwesome style={styles.circle} name="circle" size={23} />
             <Ionicons name="arrow-up-circle" size={27} color={colors.green} />
          </TouchableOpacity>
          </View>
        )}
        </ScrollView>
      </View>
      <FlatList
        data={commentList}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
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
  }
});

export default CommentModal;
