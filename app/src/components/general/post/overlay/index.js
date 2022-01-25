import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Image, TouchableOpacity, Share } from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { getLikeById, updateLike } from "../../../../services/posts";
import { useDispatch, useSelector } from "react-redux";
import { throttle } from "throttle-debounce";
import { openCommentModal } from "../../../../redux/actions/modal";
import { useNavigation } from "@react-navigation/core";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PostSingleOverlay({ user, post }) {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigation = useNavigation();
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

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Check out this new video I posted on Phlokk!",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("profileOther", { initialUserId: user?.uid })
          }
        >
          <Image style={styles.avatar} source={{ uri: user?.photoURL }} />
        </TouchableOpacity>
        <View style={styles.verifiedContainer}>
          <Text style={styles.username}>@{user?.username}</Text>
          <Image
            style={styles.phlokkVerified}
            source={require("../../../../../../app/assets/verified.png")}
          />
        </View>
        <View style={styles.wrapText}>
          <Text style={styles.description}>{post.description}</Text>
        </View>
      </View>

      <View style={styles.leftContainer}>
        <View style={styles.likesBox}>
          <TouchableOpacity onPress={() => handleUpdateLike(currentLikeState)}>
            <MaterialCommunityIcons
              color="white"
              size={40}
              name={currentLikeState.state ? "star" : "star-outline"}
            />

            <Text style={styles.actionButtonText}>
              {currentLikeState.counter}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.commentBox}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => dispatch(openCommentModal(true, post))}
          >
            <Ionicons
              name="md-chatbubble-ellipses-outline"
              size={35}
              color="white"
            />
            <Text style={styles.actionButtonText}>{post.commentsCount}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.shareBox}>
          <TouchableOpacity style={styles.iconContainer} onPress={onShare}>
            <MaterialCommunityIcons
              name="share-all-outline"
              size={30}
              color="white"
            />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.musicBox}>
          <Text>
            <MaterialCommunityIcons
              name="music-circle-outline"
              size={34}
              color="white"
            />
          </Text>
        </View>
      </View>
    </View>
  );
}
