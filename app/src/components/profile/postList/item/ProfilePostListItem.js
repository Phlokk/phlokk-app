import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  View,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import routes from "../../../../navigation/routes";
import colors from "../../../../../config/colors";
import { deletePostById } from "../../../../services/posts";
import { useQueryClient } from "react-query";
import { useAtom } from "jotai";
import { userAtom } from "../../../../../../App";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from "@expo/vector-icons";
import CustomAlert from "../../../../components/Alerts/CustomAlert";
import CustomActivityIndicator from "../../../common/ActivityIndicator";

export default function ProfilePostListItem({ item, index, posts, setPosts }) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const [isVideoDeleted, setIsVideoDeleted] = useState(false);
  const [isConfirmedDeletion, setIsConfirmedDeletion] = useState(false);

  const [currentUser] = useAtom(userAtom);

  const deleteUserPost = async () => {
    try {
      setIsLoading(true);
      await deletePostById(item._id);
      queryClient.invalidateQueries(["userPosts", item.creator]);

      setIsVideoDeleted(true);
      setIsLoading(false);
      

      setPosts((prev) => prev.filter((postItem) => postItem._id !== item._id));
    } catch (err) {
      alert(err?.message);
      setIsLoading(false);
    }
  };

  const deletePost = () => {
    const uid = currentUser._id;
    if (item.user._id === uid) {
      Alert.alert(
        "Delete Video",
        "Are you sure you want to delete this video?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "OK", onPress: deleteUserPost },
        ]
      );
    }
  };

  const thumbUrl = item.media[1].original_url;
  if ((item.media[1].generated_conversions.length ?? 0) > 0) {
    if ((item.media[1].generated_conversions.optimal ?? false) == true) {
      if ((item.media[1].conversions_disk ?? "local") == "digitalocean") {
        const thumbUrl =
          "https://cdn.phlokk.com/" +
          item.media[1].id +
          "/conversions/" +
          item.media[1].name +
          "-optimal.png";
      }
    }
  }

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
          preloadedPosts: posts,
        });
      }}
    >
      <Image
        style={styles.image}
        source={{ uri: thumbUrl }}
        onLoadStart={() => {
          setIsLoading(true);
        }}
        onLoadEnd={() => setIsLoading(false)}
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
          <CustomActivityIndicator />
        </View>
      )}

      <Text style={styles.playCountText}>
        <Ionicons
          style={styles.playCountText}
          name="ios-play-outline"
          size={14}
          color={colors.white}
        />{" "}
        {item?.play_count ?? 0}
      </Text>
      <CustomAlert
        alertTitle={
          <Text>
            <FontAwesome5 name="user-astronaut" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Video Deleted Successfully!</Text>}
        positiveBtn="Ok"
        modalVisible={isVideoDeleted}
        dismissAlert={setIsVideoDeleted}
        animationType="fade"
      />
      {/* // need to figure out how to get the function for delete video to wrok with this custom alert button.  */}
      {/* <CustomAlert
        alertTitle={
          <Text>
            <MaterialCommunityIcons name="check-circle-outline" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Delete Video{"/n"}
        Are you sure you want to delete this video?</Text>}
        positiveBtn="Ok"
        modalVisible={isConfirmedDeletion}
        dismissAlert={setIsConfirmedDeletion}
        animationType="fade"
      /> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 / 3,
    height: 180,
    overflow: "hidden",
  },
  image: {
    flex: 1,
  },
  text: {
    alignItems: "center",

    color: colors.white,
    zIndex: -5,
  },
  videoCountText: {
    color: colors.white,
  },
  playCountText: {
    color: colors.white,
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 11,
    position: "absolute",
    bottom: 3,
    left: 0,
  },
});
