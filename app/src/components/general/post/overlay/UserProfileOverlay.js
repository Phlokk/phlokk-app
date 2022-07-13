import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

import { getLikeById, updateLike } from "../../../../services/posts";
import { useDispatch, useSelector } from "react-redux";
import { throttle } from "throttle-debounce";
import {
  openCommentModal,
  openSettingsSheetModal,
  openGiftingModal,
} from "../../../../redux/actions/modal";
import { useNavigation } from "@react-navigation/native";
import verifiedCheck from "../../../../../assets/verified.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Animated } from "react-native";
import useRotation from "./useRotation";
import pmdLogo from "../../../../../assets/pmd_logo_green.png";
import CustomAlert from "../../../Alerts/customAlert";
import routes from "../../../../navigation/routes";
import colors from "../../../../../config/colors";

function UserProfileOverlay({ post, user }) {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const songTicker = "Artist and song name";

  const [instaGifts, setInstaGifts] = useState(false);
  const [ckt, setCkt] = useState(false);

  const rotate = useRotation();
  const animatedStyle = { transform: [{ rotate }] };

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.verifiedRow}>
        {user.photo_url !== null || !undefined ? (
          <Image
            style={styles.avatar}
            // key={user._id}
            source={{ uri: user.photo_url }}
          />
        ) : (
          <View style={styles.avatarContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routes.PROFILE_OTHER, {
                  initialUserId: user._id,
                })
              }
            >
              <Image
                style={styles.avatar}
                // key={user._id}
                source={{ uri: user.photo_url }}
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.usernameView}>
          {user.username !== null || !undefined ? (
            <Text>
              <Text style={styles.username} key={user._id}>
                @{user.username}
              </Text>
              <View>
                {user.is_verified === 1 && (
                  <Image style={styles.phlokkVerified} source={verifiedCheck} />
                )}
              </View>
            </Text>
          ) : (
            <Text style={styles.username}>@user</Text>
          )}
        </View>

        <Text style={styles.description} key={user}>
          {post.description}
        </Text>
        <View style={styles.songRow}>
          <Entypo name="beamed-note" size={15} color="white" />

          <Text style={styles.songName}>{songTicker}</Text>
          <Animated.Image
            style={[styles.songImage, animatedStyle]}
            source={pmdLogo}
          />
        </View>
      </View>
    </View>
  );
}

export default UserProfileOverlay;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    position: "absolute",
    bottom: 0,
  },
  topText: {
    flexDirection: "row",
    color: colors.white,
    margin: 10,
    bottom: 270,
  },
  searchRow: {
    justifyContent: "flex-end",
  },
  uiContainer: {
    height: "100%",
  },
  globeIcon: {
    marginTop: 20,
  },
  reportIcon: {
    marginTop: 10,
    alignItems: "center",
  },
  date: {
    color: colors.secondary,
    fontSize: 8,
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

    marginHorizontal: 3,
  },

  reportButtonText: {
    color: colors.white,

    padding: 10,
    flexDirection: "row",
  },
  usernameView: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
  },
});
