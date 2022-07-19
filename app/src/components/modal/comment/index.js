import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CommentItem from "./item";
import {commentListener, clearCommentListener, addComment} from "../../../services/posts"
import colors from "../../../../config/colors"
import { useAtom } from "jotai";
import { userAtom } from "../../../../../App";

const CommentModal = (post) => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState("");


  const [user, setUser] = useAtom(userAtom);


  useEffect(async () => {
    
    await commentListener(post.post._id, setCommentList);
    return () => clearCommentListener();
  }, []);

  const handleCommentSend = async () => {
    if (comment.length == 0) {
      return;
    }

    commentList.splice(0, 0, {
      comment: comment,
      user: user,
      post: post,
    });

    setComment("");

    await addComment(post.post._id, user._id, comment);
  };

  const renderItem = ({ item, index }) => {
    return <CommentItem
    setComment={setComment}
    index={index}
    item={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={commentList}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />

      <View style={styles.containerInput}>

         {user.photo_url !== null || !undefined ? (
            <TouchableOpacity>
              <Image 
              style={styles.avatar} 
              source={{ uri: user.photo_url }} 
              />
            </TouchableOpacity>
          ) : (
            <Image
              style={styles.avatar}
              source={require("../../../../assets/userImage.png")}
              cache="only-if-cached"
            />
          )}

        <TextInput 
          style={styles.input}
          placeholder="Add comment"
          placeholderTextColor={"gray"}
          multiline
          value={comment}
          onChangeText={setComment}
          maxLength={150}
        />
        <TouchableOpacity onPress={() => handleCommentSend()}>
        <Ionicons name="paper-plane" size={30} color={"gray"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    backgroundColor: colors.primary,
    height: "60%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  containerInput: {
    padding: 25,
    flexDirection: "row",
    alignItems: 'center',
  },
  input: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    flex: 1,
    paddingTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: colors.secondary,
  },

  textComment: {
    color: colors.white,
  },
});

export default CommentModal;
