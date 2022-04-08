import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  BottomSheetTextInput,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import {
  addComment,
  clearCommentListener,
  commentListener,
} from "../../../services/posts";
import CommentItem from "./item";
import { generalStyles } from "../../../styles";

import colors from "../../../../config/colors"

const CommentModal = ({ post }) => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState("");
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    commentListener(post.id, setCommentList);
    return () => clearCommentListener();
  }, []);

  const handleCommentSend = () => {
    if (comment.length == 0) {
      return;
    }
    setComment("");
    addComment(post.id, currentUser.uid, comment);
  };

  const renderItem = ({ item }) => {
    return <CommentItem item={item} />;
  };

  return (
    <View style={styles.container}>
      <BottomSheetFlatList
        data={commentList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.containerInput}>
        <Image
          style={generalStyles.avatarSmall}
          source={{ uri: currentUser.photoURL }}
        />
        <BottomSheetTextInput 
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
    flex: 1,
    backgroundColor: "#1C1C1C",
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
