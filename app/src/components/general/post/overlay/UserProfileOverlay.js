import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
// import { getLikeById, updateLike } from "../../../../services/posts";
import { useNavigation } from "@react-navigation/native";
import verifiedCheck from "../../../../../assets/verified.png";
import { Animated } from "react-native";
import useRotation from "./useRotation";
import pmdLogo from "../../../../../assets/pmd_logo_green.png";
import colors from "../../../../../config/colors";


function UserProfileOverlay({ post, user }) {
  const navigation = useNavigation();
  const songTicker = "official phlokk audio ";

  const rotate = useRotation();
  const animatedStyle = { transform: [{ rotate }] };

  return (
    <View style={[styles.bottomContainer]}>
      <View style={styles.verifiedRow}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("feedProfile", {
                initialUser: user,
              });
            }}
          >
            {!user?.photo_url && !user?.photo_url ? (
              <Image
                style={styles.avatar}
                source={require("../../../../../assets/userImage.png")}
                cache="only-if-cached"
              />
            ) : (
              <Image style={styles.avatar} source={{ uri: user.photo_url }} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.usernameRow}>
          <Text style={styles.username} key={user._id}>
            @{user.username}
          </Text>
          <View>
            {user.is_verified === 1 && (
              <Image style={styles.phlokkVerified} source={verifiedCheck} />
            )}
          </View>
        </View>
        <Text style={styles.description} key={user}>
          {post.description}
        </Text>
        <View style={styles.songRow}>
          <Entypo name="beamed-note" size={15} color="white" />

          <Text style={styles.songName}>{songTicker}</Text>

          <View style={styles.animatedlogo}>
            <Animated.Image
              style={[styles.songImage, animatedStyle]}
              source={pmdLogo}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default UserProfileOverlay;

const styles = StyleSheet.create({
  date: {
    color: colors.secondary,
    fontSize: 8,
    bottom: 5,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    padding: 10,
    paddingBottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginRight: 45,
  },
  username: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 10,
  },
  description: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "300",
    marginBottom: 10,
    marginRight: 10,
  },
  songRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  songName: {
    color: colors.white,
    fontSize: 12,
    marginLeft: 5,
  },
  avatar: {
    // zIndex: -9999,
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.white,
    marginBottom: 10,
  },
  avatarContainer: {
    width: "20%",
  },
  songImage: {
    height: 32,
    width: 32,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.secondary,
    marginBottom: 10,
    marginLeft: 10,
  },
  verifiedContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  phlokkVerified: {
    width: 12,
    height: 12,
    top: 4,
    marginHorizontal: 3,
  },
  usernameRow: {
    flexDirection: "row",
  },
  animatedlogo: {
    marginLeft: 5,
  },
});
