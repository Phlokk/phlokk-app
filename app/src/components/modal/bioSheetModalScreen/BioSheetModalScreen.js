import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import colors from "../../../../config/colors";
import { useState, useEffect } from "react";
import VerifiedIcon from "../../common/VerifiedIcon";
import axios from "../../../redux/apis/axiosDeclaration";
import { useAtom } from "jotai";
import { userAtom } from "../../../services/appStateAtoms";
import * as SecureStore from "expo-secure-store";

function BioSheetModalScreen({ user, isCurrentUser }) {
  const [following, setFollowing] = useState(user?.follow_count);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loggedInUserFollowingList, setLoggedInUserFollowingList] = useState(
    []
  );
  const [currentUser] = useAtom(userAtom);
  const getCurrentUser = async () => {
    const chunkSize = 50;
    let followingList = [];
    let i = 0;
    while (true) {
      const chunkKey = `followingList-${i}`;
      const chunkData = await SecureStore.getItemAsync(chunkKey);
      if (!chunkData) {
        break;
      }
      const chunkArray = JSON.parse(chunkData);
      followingList = [...followingList, ...chunkArray];
      i++;
    }
    setIsFollowing(IsUserFollowing(followingList));
    return followingList;
  };
  const addUserToFollowingList = async (userId) => {
    let newList = [...loggedInUserFollowingList, userId];
    setLoggedInUserFollowingList(newList);
    setIsFollowing(IsUserFollowing(newList));
    await handlesSaveFollowingList(newList);
  };
  const removeUserToFollowingList = async (userId) => {
    let newList = loggedInUserFollowingList.filter((e) => e !== userId);
    setLoggedInUserFollowingList(newList);
    setIsFollowing(IsUserFollowing(newList));
    await handlesSaveFollowingList(newList);
  };
  const followUser = async function (userId) {
    if (isFollowing) {
      await axios.delete(`/api/creators/unfollow/${currentUser._id}/${userId}`),
        {};
      await removeUserToFollowingList(userId);
    } else {
      await axios.post(`/api/creators/follow/${currentUser._id}/${userId}`), {};
      await addUserToFollowingList(userId);
    }
  };

  useEffect(async () => {
    setLoggedInUserFollowingList(await getCurrentUser());
  }, []);
  const IsUserFollowing = (list) => {
    let id = user._id || user.id;
    if (list?.includes(id)) return true;

    return false;
  };
  const handlesSaveFollowingList = async (list) => {
    const chunkSize = 50;
    const numChunks = Math.ceil(list.length / chunkSize);
    for (let i = 0; i < numChunks; i++) {
      const startIndex = i * chunkSize;
      const endIndex = Math.min((i + 1) * chunkSize, list.length);
      const chunkData = list.slice(startIndex, endIndex);
      const chunkKey = `followingList-${i}`;
      await SecureStore.setItemAsync(chunkKey, JSON.stringify(chunkData));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View>
          {user.username !== null ? (
            <Text selectable={true} style={styles.username}>
              {user.username}
              <View>{user && user.is_verified === 1 && <VerifiedIcon />}</View>
            </Text>
          ) : (
            <Text style={styles.username}>user</Text>
          )}
        </View>

        {user.pronouns !== "n/a" && user.pronouns !== null && (
          <>
            <Text style={[styles.pronounsText, styles.pronounsIcon]}>
              {user.pronouns}
            </Text>
          </>
        )}

        {user.relationship_type !== "n/a" &&
          user.relationship_type !== null && (
            <>
              <Text style={styles.statusText}>Relationship status</Text>
              <Text style={[styles.statusText, styles.relationshipStatusIcon]}>
                <Ionicons
                  name="md-heart-sharp"
                  size={12}
                  color={colors.secondary}
                />{" "}
                {user.relationship_type}
              </Text>
            </>
          )}

        {!isCurrentUser && (
          <TouchableOpacity
            style={styles.imageViewContainer}
            onPress={() => followUser(user.id || user._id)}
          >
            <View style={isFollowing ? styles.followingBtn : styles.followBtn}>
              <Text
                style={
                  isFollowing
                    ? styles.alertMessageFriendsText
                    : styles.alertMessageFollowText
                }
              >
                {isFollowing ? (
                  <AntDesign name="swap" size={20} color={colors.white} />
                ) : (
                  <Feather name="user-plus" size={19} color={colors.white} />
                )}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.linkRow}>
          <View style={styles.linkText}>
            <SimpleLineIcons
              onPress={
                user && user.youtube_link
                  ? () => Linking.openURL(user.youtube_link)
                  : null
              }
              name="social-youtube"
              size={20.5}
              color={user && user.youtube_link ? colors.green : colors.white}
            />
          </View>
          <View style={styles.linkText}>
            <FontAwesome
              name="opencart"
              size={20}
              color={user && user.link ? colors.green : colors.white}
              onPress={
                user && user.link ? () => Linking.openURL(user.link) : null
              }
            />
          </View>
          <View style={styles.linkText}>
            <Feather
              onPress={
                user && user.instagram_link
                  ? () => Linking.openURL(user.instagram_link)
                  : null
              }
              name="instagram"
              size={18}
              color={user && user.instagram_link ? colors.green : colors.white}
            />
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.userInfoBox}>
          {user.bio !== null && (
            <>
              <Text style={styles.aboutText}>Bio:</Text>
              <Text style={styles.bioText}>{user.bio}</Text>

              <View style={styles.divider_light}></View>
            </>
          )}
        </View>

        <View style={styles.userInfoBox}>
          {user.skills !== null && (
            <>
              <Text style={styles.aboutText}>Skills:</Text>
              <Text style={styles.bioText}>{user.skills}</Text>
              {Platform.OS === "ios" && (
                <View style={styles.divider_light}></View>
              )}
            </>
          )}
        </View>

        <View style={styles.userInfoBox}>
          {user.education !== null && (
            <>
              <Text style={styles.aboutText}>Education:</Text>
              <Text style={styles.bioText}>{user.education}</Text>
              <View style={styles.divider_light}></View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.settingsBlack,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: "80%",
    overflow: "hidden",
  },

  top: {
    marginTop: 35,
    alignItems: "center",
    bottom: 10,
    borderRadius: 25,
    padding: 10,
  },
  middle: {
    textAlign: "center",
    color: colors.white,
    fontSize: 16,
  },
  username: {
    fontSize: 14,
    color: colors.white,
    marginTop: 15,
    marginBottom: 5,
  },

  bioText: {
    color: colors.white,
    paddingHorizontal: 15,
    marginTop: 5,
    opacity: 0.9,
    textAlign: "left",
    fontSize: 16,
    fontFamily: "DarkerGrotesque-Medium",
  },

  aboutText: {
    color: colors.secondary,
    paddingLeft: 15,
    marginTop: 5,
    opacity: 0.8,
    textAlign: "left",
    fontSize: 18,
    fontFamily: "DarkerGrotesque-Medium",
  },
  alertMessageFriendsText: {
    color: colors.secondary,
    opacity: 0.6,
    textAlign: "center",
    fontSize: 16,
  },
  alertMessageFollowText: {
    color: colors.green,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  followBtn: {
    width: 100,
    borderWidth: 1,
    borderColor: colors.green,
    padding: 5,
    borderRadius: 5,
  },
  followingBtn: {
    width: 100,
    borderWidth: 1,
    borderColor: colors.green,
    padding: 5,
    borderRadius: 5,
  },
  relationshipStatusIcon: {
    color: colors.secondary,
    textAlign: "center",
    fontSize: 12,
  },
  statusText: {
    marginTop: 10,
    color: colors.white,
    opacity: 0.8,
    textAlign: "center",
    fontSize: 12,
  },
  pronounsText: {
    marginTop: 10,
    marginBottom: 5,
    color: colors.white,
    opacity: 0.6,
    textAlign: "center",
    fontSize: 11,
  },
  alertMessageButtonText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: colors.secondary,
  },
  text: {
    color: colors.white,
  },
  linkRow: {
    bottom: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  linkText: {
    color: colors.secondary,
    alignSelf: "center",
    justifyContent: "center",
    padding: 30,
    top: 30,
  },
  imageViewContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: 20,
    zIndex: 99999,
  },
  imageOverlay: {
    backgroundColor: "rgba(0,0,0, 0.5)",
    ...StyleSheet.absoluteFill,
  },
  userInfoBox: {
    margin: 10,
    padding: 5,
    borderRadius: 10,
    paddingBottom: 20,
  },
  divider_light: {
    top: 20,
    borderBottomWidth: 0.3,
    borderColor: colors.secondary,
    marginTop: 10,
    opacity: 0.2,
    // width: '80%',
  },
  icons: {
    color: colors.secondary,
    paddingLeft: 15,
    marginTop: 5,
    opacity: 0.8,
    textAlign: "left",
    fontSize: 16,
    fontFamily: "DarkerGrotesque-Medium",
  },
});

export default BioSheetModalScreen;
