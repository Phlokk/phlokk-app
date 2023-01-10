import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../../config/colors";
import { timeSince } from "../../services/posts";
import routes from "../../navigation/routes";
import { getPost } from "../../services/posts";
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
    if (item.type == 5) {
      inAppNavigation.navigate("profileOther", {
        initialUser: item.associated,
      });
    } else {
      const post = await getPost(item.associated._id).then((resp) => {
        return resp.data.post;
      });

      navigation.navigate(routes.USER_POSTS, {
        creator: post.user,
        profile: true,
        selectedVideo: post.media[0].original_url,
        selectedIndex: 0,
        preloadedPosts: [post],
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
        <TouchableOpacity>
          <FastImage
            style={styles.avatar}
            source={
              item.user?.photo_url
                ? {
                    uri: item.user?.photo_url,
                    priority: FastImage.priority.high,
                  }
                : require("../../../assets/userImage.png")
            }
            cache={FastImage.cacheControl.web}
          />
        </TouchableOpacity>
        <View style={styles.notificationView}>
          <View style={styles.mentionsView}>
            <TouchableOpacity>
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
              {item.created_at ? timeSince(new Date(item.created_at)) : "Now"}
            </Text>
          </View>
          <View style={styles.iconRow}>
            {Object.keys(item.pictures)
              .slice(0, 7)
              .map((key, keyIndex) => renderAvatarRow(key, keyIndex))}
          </View>
        </View>
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
  },
  mentionsView: {
    flexDirection: "row",
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
