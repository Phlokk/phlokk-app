import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import colors from "../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../App";
import { timeSince } from "../../services/posts";
import routes from "../../navigation/routes";

const NotificationItem = ({ navigation, item }) => {
  const [user, setUser] = useAtom(userAtom);

  const posts = [item.associated];

  return (
    <TouchableOpacity
    onPress={() => {
      navigation.navigate(routes.USER_POSTS, {
        creator: item.associated.user,
        profile: true,
        selectedVideo: item.associated.media[0].original_url,
        selectedIndex: 0,
        preloadedPosts: posts,
      });
    }}
    >
      <View style={styles.containerInput}>
        {!item.user.photo_url ? (
          <Image
            style={styles.avatar}
            source={require("../../../assets/userImage.png")}
            cache="only-if-cached"
          />
        ) : (
          <TouchableOpacity>
            <Image
              style={styles.avatar}
              source={{ uri: item.user.photo_url }}
            />
          </TouchableOpacity>
        )}
        <View style={styles.notificationView}>
          <Text style={styles.usernameView}>{item.user.username}</Text>

          {/* TODO still need to hide all but 4 avatars and show button that connects to FlatList of all users who liked, commented on post. Also add thumbnail for each post */}
          <View style={styles.iconRow}>
            {Object.keys(item.pictures).map((key, keyIndex) => (
              <Pressable
                key={key}
                style={styles.iconRowAvatars}
                // TODO navigate to initialUser profile when clicked

                // onPress={() => {
                //   navigation.navigate("feedProfile", {
                //     initialUserId: key,
                //   });
                // }}
              >
                <Image
                  style={styles.avatarList}
                  source={{ uri: item.pictures[key] }}
                />
              </Pressable>
            ))}
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
