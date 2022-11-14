import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../App";
import { timeSince } from "../../services/posts";
import routes from "../../navigation/routes";
import { getPost } from "../../services/posts";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/core";

import NotificationItemSecondaryAvatar from "./NotificationItemSecondaryAvatar";
import CustomActivityIndicator from "../../components/common/ActivityIndicator";

const NotificationItem = ({ navigation, item }) => {
  /**
   * Notification "types"
   * 1 = DEVICE REGISTRATION; // no navigation / navigate to "session list"
   * 2 = POST REACTION; // navigate to post / comment???
   * 3 = POST COMMENT; // navigate to comment???
   * 4 = POST DELETED; // no navigation
   * 5 = NEW FOLLOW; // navigate to user
   */

  const inAppNavigation = useNavigation();
  const [user, setUser] = useAtom(userAtom);

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

  const [isNotificationImageLoading, setIsNotificationImageLoading] =
    useState(true);

  const renderAvatarRow = (key, keyIndex) => {
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
            onLoadStart={() => {
              setIsNotificationImageLoading(true);
            }}
            onLoadEnd={() => {
              setIsNotificationImageLoading(false);
            }}
            cache={FastImage.cacheControl.web}
          />
          {isNotificationImageLoading && (
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: 42,
                justifyContent: "center",
              }}
            >
              <CustomActivityIndicator size="small" color={colors.green} />
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.notificationView}>
          <Text style={styles.usernameView}>{item.user?.username}</Text>

          {/* TODO still need to hide all but 4 avatars and show button that connects to FlatList of all users who liked, commented on post. Also add thumbnail for each post */}
          <View style={styles.iconRow}>
            {Object.keys(item.pictures).map((key, keyIndex) =>
              renderAvatarRow(key, keyIndex)
            )}
          </View>

          <View style={styles.mentionsView}>
            <TouchableOpacity>
              <Text style={styles.mentionsText}>{item.body}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.date}>
              {item.created_at ? timeSince(new Date(item.created_at)) : "Now"}
            </Text>
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
  usernameView: {
    color: colors.white,
  },
  mentionsText: {
    fontSize: 10,
    marginTop: 5,
    color: colors.green,
  },
  date: {
    fontSize: 10,
    marginTop: 5,
    color: colors.secondary,
    opacity: 0.8,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "lightgray",
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
