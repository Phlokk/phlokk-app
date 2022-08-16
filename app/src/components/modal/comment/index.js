import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CommentItem from "./item";
import {
  commentListener,
  clearCommentListener,
  addComment,
} from "../../../services/posts";
import colors from "../../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../../App";
import uuid from "uuid-random";

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
      _id: uuid().toString() + "-temp",
      message: comment,
      created_at: new Date().toString(),
      replies: [],
      user: user,
      post: post,
    });

    setComment("");

    await addComment(post.post._id, comment);
  };

  const renderItem = ({ item, index }) => {
    return <CommentItem setComment={setComment} index={index} item={item} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
      {!user?.photo_url && !user?.photo_url ? (
				<Image
					style={styles.avatar}
					source={require('../../../../assets/userImage.png')}
					cache="only-if-cached"
				/>
			) : (
          <TouchableOpacity>
            <Image style={styles.avatar} source={{ uri: user.photo_url }} />
          </TouchableOpacity>
        )}
        <TextInput
          selectionColor={colors.green}
          style={styles.input}
          placeholder="Add comment..."
          placeholderTextColor={"gray"}
          multiline
          value={comment}
          onChangeText={setComment}
          maxLength={150}
        />
        <TouchableOpacity onPress={() => handleCommentSend()}>
          <Ionicons name="paper-plane" size={30} color={colors.green} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={commentList}
        renderItem={renderItem}
        showsVerticalScrollIndicator ={false}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

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
});

export default CommentModal;
