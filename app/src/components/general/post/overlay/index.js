import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
} from "react-native";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { getLikeById, updateLike } from "../../../../services/posts";
import { useDispatch, useSelector } from "react-redux";
import { throttle } from "throttle-debounce";
import {
  openCommentModal,
  openSettingsSheetModal,
  openGiftingModal
} from "../../../../redux/actions/modal";
import { useNavigation } from "@react-navigation/core";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Animated } from "react-native";
import useRotation from "./useRotation";
import pmdLogo from "../../../../../assets/pmd_logo_green.png";

import routes from "../../../../navigation/routes";
import colors from "../../../../../config/colors";


export default function PostSingleOverlay({ user, post}) {
  // console.log('post single overlay----->', post)
  
  // console.log(post)

  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const songTicker = "Artist and song name";
  const verifiedPNG = require("../../../../../assets/verified.png");



  const [currentLikeState, setCurrentLikeState] = useState({
    state: false,
    counter: post.likesCount,
  });

  useEffect(() => {
    getLikeById(post.id, currentUser.uid).then((res) => {
      setCurrentLikeState({
        ...currentLikeState,
        state: res,
      });
    });
  }, []);

  const handleUpdateLike = useMemo(
    () =>
      throttle(500, true, (currentLikeStateInst) => {
        setCurrentLikeState({
          state: !currentLikeStateInst.state,
          counter:
            currentLikeStateInst.counter +
            (currentLikeStateInst.state ? -1 : 1),
        });
        updateLike(post.id, currentUser.uid, currentLikeStateInst.state);
      }),
    []
  );

  const rotate = useRotation();
  const animatedStyle = { transform: [{ rotate }] };

  return (
    <View style={styles.container}>
      <View style={styles.uiContainer}>
        <View style={styles.sideContainer}>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => handleUpdateLike(currentLikeState)}
            >
              <MaterialCommunityIcons
                color={colors.white}
                size={40}
                name={currentLikeState.state ? "star" : "star-outline"}
              />

              <Text style={styles.statsLabel}>{currentLikeState.counter}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => dispatch(openCommentModal(true, post))}
            >
              <Ionicons
                name="md-chatbubble-ellipses-outline"
                size={35}
                color={colors.white}
              />
              <Text style={styles.statsLabel}>{post.commentsCount}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => dispatch(openGiftingModal(true))}
            >
              <MaterialCommunityIcons
                onPress={() =>
                  Alert.alert("Insta-Gifting", "Coming in official release!")
                }
                name="fire"
                size={40}
                color={colors.white}
              />
              <Text style={styles.statsLabel}>Fire</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.globeIcon}
              onPress={() =>
                Alert.alert("CKT Feed", "Coming in Beta version 3")
              }
            >
              <Octicons name="globe" size={30} color={colors.white} />
              <Text style={styles.statsLabel}>CKT</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.reportIcon}
              onPress={() => dispatch(openSettingsSheetModal(true, post))}
            >
              
              <Ionicons
                name="ellipsis-horizontal-sharp"
                size={28}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View>
            {firebase.auth().currentUser.uid === user?.uid ? (
              <Image style={styles.avatar} source={{ uri: user?.photoURL }} />
            ) : (
              <View style={styles.avatarContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(routes.PROFILE_OTHER, {
                      initialUserId: user?.uid,
                    })
                  }
                >
                  <Image
                    style={styles.avatar}
                    source={{ uri: user?.photoURL }}
                  />
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.verifiedContainer}>
              <Text style={styles.username}>@{user?.username}</Text>

              {user?.verified === true ? (
                <Image style={styles.verifiedBadge} source={verifiedPNG} />
              ) : (
                <TouchableOpacity></TouchableOpacity>
              )}
            </View>

            <Text style={styles.description}>{post.description}</Text>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    position: "absolute",
    bottom: 0,
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

  verifiedBadge: {
    width: 12,
    height: 12,
    bottom: 4,
    marginHorizontal: 3,
  },

  reportButtonText: {
    color: colors.white,

    padding: 10,
    flexDirection: "row",
  },
  // Side Container

  sideContainer: {
    zIndex: 999,
    top: 50,
    flex: 1,
    alignSelf: "flex-end",
    marginRight: 5,
    marginBottom: Platform.OS === "ios" ? 1 : -100,
  },
  iconContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  statsLabel: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 5,
  },
  topBarText: {
    color: colors.white,
    marginHorizontal: 10,
    paddingTop: 45,
  },
  topContainer: {
    flex: 1,
    flexDirection: "row",
    bottom: 250,
  },
});
