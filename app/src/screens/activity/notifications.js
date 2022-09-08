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
} from "react-native";
import colors from "../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../App";
import { timeSince } from "../../services/posts";

const NotificationItem = ({ navigation, item, }) => {
  const [user, setUser] = useAtom(userAtom);

  return (
    <TouchableOpacity
    onPress={() => item.associated._id}
    >
      <View style={styles.containerInput}>
        {!item.url && !item.url ? (
          
          <Image
            style={styles.avatar}
            source={require("../../../assets/userImage.png")}
            cache="only-if-cached"
          />
        ) : (
          <TouchableOpacity>
            <Image style={styles.avatar} source={{ uri: url }} />
          </TouchableOpacity>
        )}
        <View style={styles.notificationView}>
          <Text style={styles.usernameView}>{item.title}</Text>

          
          {/* TODO still need to hide all but 4 avatars and show button that connects to FlatList of all users who liked, commented on post. Also add thumbnail for each post */}
          <View style={styles.iconRow} >
          {item.pictures.map((url, key) => (
            <Pressable 
            key={key} 
            style={styles.iconRowAvatars}

            // TODO navigate to initialUser profile when clicked

            // onPress={() => {
						// 	navigation.navigate('feedProfile', {
						// 		initialUser: user,
						// 	});
						// }}
            >
            <Image style={styles.avatarList} source={{ uri: url }} />
          </Pressable>
          ))}
          </View>
          
          <View style={styles.mentionsView}>
            <Text style={styles.mentionsText}>{item.body}</Text>
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
  }
});

export default NotificationItem;
