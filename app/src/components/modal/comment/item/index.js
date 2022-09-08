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
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../../../App";
import verifiedCheck from "../../../../../assets/verified.png";
import CustomAlert from "../../../Alerts/customAlert";
import { timeSince } from "../../../../services/posts";
import { likeComment } from "../../../../redux/actions/likes";

const CommentItem = ({ item, post, setCommentList }) => {
  const navigation = useNavigation();
  const [user, setUser] = useAtom(userAtom);
  const [isUsernameProfile, setIsUsernameProfile] = useState(false);
  const [isReplies, setIsReplies] = useState(false);

  const [isLiked, setIsLiked] = useState(item.is_liked);
  const [likeCount, setLikeCount] = useState(item.like_count);

  const [isDeleteCommentModalOpen, setIsDeleteCommentModalOpen] =
    useState(false);

  const likeButtonHandler = async () => {
    const type = isLiked ? "unlike" : "like";
    try {
      await likeComment(post._id, item._id, type);
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch {
      Alert.alert("There was an error with your request!");
    }
  };

  const onDeleteCommentConfirmed = async () => {
    // Before we remove the comment from the, make a call to the server to delete it from the database
    try {
      // await deleteComment(item._id);

      setCommentList((prev) => {
        const newCommentList = prev.filter(
          (comment) => comment._id !== item._id
        );
        return newCommentList;
      });
    } catch {
      // Display a modal saying that it couldnt delete
    }
  };

  const isCommentCurrentUser = user._id === item.user_id;
  const isPostFromCurrentUser = user._id === post.user._id;

  return (
    <View style={styles.container}>
      {!user?.photo_url && !user?.photo_url ? (
        <TouchableOpacity
          disabled={user._id == item.user._id}
          onPress={() => {
            navigation.navigate("feedProfile", {
              initialUser: item.user,
            });
          }}
        >
          <Image
            style={styles.avatar}
            source={require("../../../../../assets/userImage.png")}
            cache="only-if-cached"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={user._id == item.user._id}
          onPress={() => {
            navigation.navigate("feedProfile", {
              initialUser: item.user,
            });
          }}
        >
          <Image style={styles.avatar} source={{ uri: item.user.photo_url }} />
        </TouchableOpacity>
      )}

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
            disabled={user._id == item.user._id}
            onPress={() => {
              navigation.navigate("feedProfile", {
                initialUser: item.user,
              });
            }}
          >
            <Text style={styles.username}>@{item.user.username}</Text>
          </TouchableOpacity>
          {item.user && item.user.is_verified === 1 && (
            <Image style={styles.phlokkVerified} source={verifiedCheck} />
          )}
        </View>
        <Text style={styles.textComment}>{item.message}</Text>
        <View style={styles.replyRow}>
          <Text style={styles.date}>
            {item.created_at ? timeSince(new Date(item.created_at)) : "Now"}
          </Text>
          <CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={<Text>Replies{"\n"}coming in beta 2</Text>}
            positiveBtn="Ok"
            modalVisible={isReplies}
            dismissAlert={setIsReplies}
            animationType="fade"
          />
          <TouchableOpacity onPress={() => setIsReplies(true)}>
            <Text style={styles.textReplies}>Reply</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
      <View style={styles.starRow}>
        <TouchableOpacity onPress={likeButtonHandler}>
          <MaterialCommunityIcons
            color={colors.green}
            size={20}
            name={isLiked ? "star" : "star-outline"}
          />
        </TouchableOpacity>
        <Text style={styles.starCount}>{likeCount}</Text>
      </View>

      <CustomAlert
        alertTitle="Alert"
        customAlertMessage="Would you like to delete this comment?"
        negativeBtn="Cancel"
        positiveBtn="Yes"
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
  username: {
    flex: 1,
    color: colors.green,
    fontSize: 11,
  },
  textComment: {
    color: colors.secondary,
    paddingRight: 40,
    fontSize: 12,
    marginTop: 2,
    opacity: 0.9,
  },
  textReplies: {
    color: colors.secondary,
    paddingRight: 20,
    fontSize: 10,
    marginHorizontal: 5,
  },
  date: {
    color: colors.secondary,
    fontSize: 9,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  phlokkVerified: {
    width: 10,
    height: 10,
    marginHorizontal: 3,
  },
  starRow: {
    alignItems: "center",
  },
  starCount: {
    color: colors.secondary,
    fontSize: 10,
    paddingTop: 5,
  },
});

export default CommentItem;
