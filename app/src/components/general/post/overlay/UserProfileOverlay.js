import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Easing,
  Platform,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Animated } from "react-native";
import useRotation from "./useRotation";
import pmdLogo from "../../../../../assets/pmd_logo_green.png";
import colors from "../../../../../config/colors";
import VerifiedIcon from "../../../common/VerifiedIcon";
import * as Linking from "expo-linking";
import TextTicker from "react-native-text-ticker";
import RisingStarFeed from "../../../common/RisingStarFeed";
import AddFriendBtn from "./AddFriendBtn";
import axios from "../../../../redux/apis/axiosDeclaration";
import SpecialNeedsIcon from "../../../common/specialNeedsIcon";
import * as SecureStore from "expo-secure-store";
import { useAtom } from "jotai";
import { userAtom } from "../../../../services/appStateAtoms";
const DEFAULT_DESC_DISPLAY_LINES = 2;

function UserProfileOverlay({ 
  post,
  user,
  currentUser,
  isCurrentUser,
  areTabsShowing,
}) {

  const [following, setFollowing] = useState(user?.follow_count);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLinked, setIsLinked] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null)
  // const [currentUser] = useAtom(userAtom);
  const getCurrentUser = async()=>{
    return await SecureStore.getItemAsync("user");
  }

  const toggleIsFollowing = async function (userId) {
    if(isFollowing){
      await axios.delete(
        `/api/creators/unfollow/${currentUser._id}/${user.id}`
      ),
        {};
    }else{
      await axios.post(
        `/api/creators/follow/${currentUser._id}/${userId}`
      ),
        {};
    }
    setIsFollowing(!isFollowing);
    setFollowing(!isFollowing ? following + 1 : following - 1);
  };

  const navigation = useNavigation();
  const username = user.username;

  const [descriptionDisplayLines, setDescriptionDisplayLines] = useState(
    DEFAULT_DESC_DISPLAY_LINES
  );
  const userLink = user.link;
  const rotate = useRotation();
  const animatedStyle = { transform: [{ rotate }] };
  const isFocused = useIsFocused();
  useEffect(async() => {
    setIsFollowing(IsUserFollowing())
    setLoggedInUser(JSON.parse(await getCurrentUser()))
  }, [])

  const HASHTAG_FORMATTER = (string) => {
    if (string === null) {
      return;
    }

    return string
      .split(/((?:^|\s)(?:#[a-z\d-] || @[a-z\d-]+))/gi)
      .filter(Boolean)
      .map((tag, i) => {
        if (tag.includes("#") || tag.includes("@")) {
          return (
            <Text

              key={i}
              // onPress={() => {
              //   navigation.navigate("feedProfile", {
              //     initialUser: user,
              //   });
              // }
                
              // }
              style={styles.tags}
            >
              {JSON.stringify(tag).slice(1, -1)}
            </Text>
          );
        } else {
          return <Text key={i}>{tag}</Text>;
        }
      });
  };
  const IsUserFollowing = () => {
    if(loggedInUser?.followingList?.includes(user.id)) return true;

    return false;
  }; 

  const tickerText = "official phlokk audio @" + username;

  return (console.log("loggedInUser", loggedInUser?._id,user.id),
    <View
      style={[styles.bottomContainer, areTabsShowing && { paddingBottom: 30 }]}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <View style={styles.avatarContainer}>
          <View style={styles.addFriendBtnView}>
            {!isCurrentUser && currentUser._id !== post.user._id && (
              <TouchableOpacity onPress={() => toggleIsFollowing(user._id)}>
                <Text>{isFollowing ? "asd" : <AddFriendBtn />}</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.imageRow}>
            <TouchableOpacity
              disabled={currentUser._id == post.user._id}
              onPress={() => {
                navigation.navigate("feedProfile", {
                  initialUser: user,
                });
              }}
            >
              {!user?.photo_thumb_url && !user?.photo_thumb_url ? (
                <Image
                  style={styles.avatar}
                  source={require("../../../../../assets/userImage.png")}
                  cache="only-if-cached"
                />
              ) : (
                <Image
                  style={styles.avatar}
                  source={{ uri: user.photo_thumb_url }}
                />
              )}
            </TouchableOpacity>
            {user.is_special_needs === 1 && user.is_special_showing === 1 && (
              <SpecialNeedsIcon />
            )}
          </View>
        </View>

        <View style={styles.linkView}>
          {user.link !== null ? (
            <TouchableOpacity
              style={styles.linkIconRow}
              onPress={
                user && user.link ? () => Linking.openURL(user.link) : null
              }
            >
              <FontAwesome5 name="globe" size={16} color={colors.green} />
              <Text style={styles.linkText}> Visit site</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <View style={styles.usernameRow} pointerEvents="box-none">
          <TouchableOpacity 
          onPress={() => {
            navigation.navigate("feedProfile", {
              initialUser: post.user,
            });
          }}
          style={styles.username} 
          key={user._id}>
            <Text style={styles.username}>@{user.username}</Text>
          </TouchableOpacity>
          <View style={{ paddingTop: 2, top: 2 }}>
            {user.is_verified === 1 && <VerifiedIcon />}
            {user.is_rising === 1 && <RisingStarFeed />}
          </View>
        </View>

        <Text
          numberOfLines={descriptionDisplayLines}
          style={
            post.description !== null
              ? styles.description
              : styles.descriptionEmpty
          }
          key={user}
          onPress={() => {
            if (descriptionDisplayLines > DEFAULT_DESC_DISPLAY_LINES) {
              setDescriptionDisplayLines(DEFAULT_DESC_DISPLAY_LINES);
            } else {
              setDescriptionDisplayLines(5);
            }
          }}
        >
          {HASHTAG_FORMATTER(post.description)}
        </Text>
        <View style={styles.songView}>
          <View style={styles.songRow}>
            <MaterialCommunityIcons
              style={styles.soundWav}
              name="waveform"
              size={28}
              color={colors.green}
            />

            <TextTicker
              style={styles.ticker}
              duration={8000}
              loop={true}
              repeatSpacer={20}
              easing={Easing.in(Easing.linear)}
            >
              {tickerText}
            </TextTicker>

            <View style={styles.animatedlogo}>
              <Animated.Image
                style={[styles.songImage, isFocused && animatedStyle]}
                source={pmdLogo}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default UserProfileOverlay;

const styles = StyleSheet.create({
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    padding: 10,
    paddingBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginRight: 45,
  },
  songView: {
    right: 5,
    flex: 1,
    backgroundColor: "rgba(125, 125, 125, 0.2)",
    width: Platform.OS === "android" ? 210 : 240,
    borderRadius: 50,
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
  descriptionEmpty: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "300",
    marginBottom: -10,
    marginRight: 10,
  },
  seeMoreText: {
    color: colors.secondary,
    fontSize: 13,
    fontWeight: "300",
  },
  songRow: {
    marginLeft: 9,
    flexDirection: "row",
    alignItems: "center",
    width: 150,
  },
  ticker: {
    color: colors.white,
    fontSize: 12,
    marginLeft: 3,
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
    top: 5,
    marginLeft: 5,
  },
  displayLines: {
    color: colors.white,
  },
  note: {
    marginRight: 5,
  },
  linkView: {
    flexDirection: "row",
    // backgroundColor: colors.modals,
    borderRadius: 7,
    padding: 5,
    // opacity: 0.4,
  },
  linkText: {
    color: colors.white,
  },
  linkIconRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
    paddingRight: 4,
    borderRadius: 5,
    backgroundColor: "rgba(125, 125, 125, 0.5)",
    marginBottom: 5,
    right: 7,
  },
  soundWav: {
    paddingRight: 3,
    right: 4,
  },
  addFriendBtnView: {
    zIndex: 1,
    top: 20,
    left: 30,
  },
  imageRow: {
    flexDirection: "row",
  },
  tags: {
    color: colors.secondary,
    fontWeight: "600",
  },
});
