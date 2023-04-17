import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../../config/colors";
import { timeSince } from "../../services/posts";
import routes from "../../navigation/routes";
import { getPost, getSinglePost } from "../../services/posts";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/core";
import NotificationItemSecondaryAvatar from "./NotificationItemSecondaryAvatar";
import { useTheme } from "../../theme/context";

const NotificationItem = ({ navigation, item }) => {
  const { theme } = useTheme();

  /**
   * Notification "types"
   * 1 = DEVICE REGISTRATION; // no navigation / navigate to "session list"
   * 2 = POST REACTION; // navigate to post / comment???
   * 3 = POST COMMENT; // navigate to comment???
   * 4 = POST DELETED; // no navigation
   * 5 = NEW FOLLOW; // navigate to user
   */

  const inAppNavigation = useNavigation();

  const goToAssociated = async function () {
    if (!item.post) {
      console.log("No post")
      inAppNavigation.navigate("profileOther", {
        initialUser: item.user,
        profile:true
      });
    } else {
      const post = await getSinglePost(item.post.id ?? item.post._id, item.post.user_id)
      // return console.log("Post", item.body)
      //TODO: save the comment id in notification table so that filtering that comment id easier
      item.post.user = post.data[0].user;
      post.data[0].videoUrl  = item.post.videoUrl

      navigation.navigate(routes.USER_POSTS, {
        creator: post.data[0].user,
        profile: true,
        selectedVideo: item.post.media.find((e)=> !e.original_url?.endsWith("jpg")),
        selectedIndex: 0,
        preloadedPosts: [post.data[0]],
        notificationView: true,
      });
    }
  };

  const renderAvatarRow = ( key ) => {
    return (
      <NotificationItemSecondaryAvatar image={item.pictures[key]} key={key} />
    );
  };
  

  return (
    <TouchableOpacity onPress={() => goToAssociated()}>
      <View style={styles.containerInput}>
        <View style={{flexDirection: 'row', paddingTop: 8}}>
          <TouchableOpacity>
            <FastImage
              style={styles.avatar}
              source={
                item.user?.photo_thumb_url
                  ? {
                      uri: item.user?.photo_thumb_url,
                      priority: FastImage.priority.high,
                    }
                  : require("../../../assets/userImage.png")
              }
              cache={FastImage.cacheControl.web}
            />
          </TouchableOpacity>
          <View style={styles.notificationView}>
            <View style={styles.mentionsView}>
              <TouchableOpacity  onPress={() => goToAssociated()}>
                <Text
                  style={
                    theme == "light"
                      ? styles.mentionText_light
                      : styles.mentionText_dark
                  }
                >
                  {item.body} 
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={theme == "light" ? styles.date_light : styles.date_dark}
              >
                {item.created_at ? timeSince(item.created_at) : "Now"}
              </Text>
            </View>
          </View>
        </View>
        {(item?.post)? (
          <View>
            <FastImage
              style={styles.thumb}
              source={{
                uri: item?.post?.thumbnailUrl,
                priority: FastImage.priority.high,
              }}
              cache={FastImage.cacheControl.web}
            />
          </View>
        ):null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  containerInput: {
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  mentionsView: {
    flexDirection: "row",
    width:250,
  },
  notificationView: {
    paddingLeft: 10,
  },
  text: {
    color: colors.white,
  },
  username_light: {
    color: colors.black,
    fontSize: 12,
  },
  username_dark: {
    color: colors.white,
    fontSize: 12,
  },
  mentionText_light: {
    fontSize: 10,
    marginTop: 5,
    color: colors.black,
  },
  mentionText_dark: {
    fontSize: 10,
    marginTop: 5,
    color: colors.green,
  },
  date_light: {
    fontSize: 10,
    marginTop: 5,
    color: colors.grey,
    opacity: 0.8,
  },
  date_dark: {
    fontSize: 10,
    marginTop: 5,
    color: colors.secondary,
    opacity: 0.8,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  thumb: {
    height: 60,
    width: 50,
    right: 10, 
  },
  avatarList: {
    height: 30,
    width: 30,
    borderRadius: 50,
  },
  iconRow: {
    flexDirection: "row",
    paddingTop: 5,
  },
  iconRowAvatars: {
    marginRight: 10,
  },
});

export default NotificationItem;
