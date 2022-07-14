import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  View,
} from "react-native";
import routes from "../../../../navigation/routes";
import colors from "../../../../../config/colors";
// import { deletePostById } from "../../../../services/posts";
import { useAtom } from "jotai";
import { userAtom } from "../../../../../../App";
import { useQueryClient } from "react-query";

export default function ProfilePostListItem({ item, index, user }) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const deleteUserPost = async () => {
    try {
      setIsLoading(true);
      await deletePostById(item.id);
      queryClient.invalidateQueries(["userPosts", item.creator]);

      setIsLoading(false);
      alert("Video Deleted Successfully");
    } catch (err) {
      alert(err?.message);
      setIsLoading(false);
    }
  };
  const deletePost = () => {
    const uid = user.user;
    console.log("uid, item.creator", uid, item.creator);
    if (item.creator === uid) {
      Alert.alert(
        "Delete Video",
        "Are you sure you want to delete this video?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: deleteUserPost },
        ]
      );
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={deletePost}
      onPress={() => {
        navigation.navigate(routes.USER_POSTS, {
          creator: item.user,
          profile: true,
          selectedVideo: item.media[0].original_url,
          selectedIndex: index,
        });
      }}
    >
      <Image
        style={styles.image}
        source={{ uri: item.media[1].original_url }}
      />
      {isLoading && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="small" color={colors.green} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 / 3,
    height: 180,
  },
  image: {
    flex: 1,
  },
  text: {
    alignItems: "center",
    backgroundColor: colors.primary,

    color: colors.white,
    zIndex: -5,
  },
});
