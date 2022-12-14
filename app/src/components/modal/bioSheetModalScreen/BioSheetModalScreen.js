import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import colors from "../../../../config/colors";
import { useState } from "react";
import VerifiedIcon from "../../common/VerifiedIcon";
import { LinearGradient } from "expo-linear-gradient";
import axios from "../../../redux/apis/axiosDeclaration";

function BioSheetModalScreen({ user, isCurrentUser, setUser }) {
  const [following, setFollowing] = useState(user?.follow_count);
  const [isFollowing, setIsFollowing] = useState(user?.is_following);
  // const [isFriends, setIsFriends] = useState(false);

  const toggleIsFollowing = async function (userId) {
    await axios.post(
      "/api/creator/" + userId + "/" + (isFollowing ? "unfollow" : "follow")
    ),
      {};
    setIsFollowing(!isFollowing);
    setFollowing(!isFollowing ? following + 1 : following - 1);

    setUser((prev) => {
      let updatedUser = { ...prev };
      updatedUser.is_following = !isFollowing;
      updatedUser.follow_count = !isFollowing ? following + 1 : following - 1;
      return updatedUser;
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#000000", "#f2f2f2"]}
        start={{ x: 1.0, y: 3.0 }}
        end={{ x: 1.0, y: 0.0 }}
        locations={[1.0, 0.1]}
        style={{
          flex: 1,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
      >
        <View style={styles.top}>
          <View>
            {user.username !== null ? (
              <Text selectable={true} style={styles.username}>
                @{user.username}
                <View>
                  {user && user.is_verified === 1 && <VerifiedIcon />}
                </View>
              </Text>
            ) : (
              <Text style={styles.username}>@user</Text>
            )}
          </View>

          <Text style={styles.statusText}>Relationship status</Text>
          <Text style={[styles.statusText, styles.relationshipStatusIcon]}>
            <Ionicons name="md-heart-sharp" size={12} color={colors.white} />{" "}
            {user.relationship_type}
          </Text>

          {!isCurrentUser && (
            <TouchableOpacity
              style={styles.imageViewContainer}
              onPress={() => toggleIsFollowing(user._id)}
            >
              <View
                style={isFollowing ? styles.followingBtn : styles.followBtn}
              >
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
                size={23}
                color={user && user.youtube_link ? colors.green : colors.white}
              />
            </View>
            <View style={styles.linkText}>
              <Octicons
                onPress={
                  user && user.link ? () => Linking.openURL(user.link) : null
                }
                name="link-external"
                size={21}
                color={user && user.link ? colors.green : colors.white}
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
                color={
                  user && user.instagram_link ? colors.green : colors.white
                }
              />
            </View>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.aboutText}>Bio:</Text>
          <Text style={styles.bioText}>{user.bio}</Text>
          <Text style={styles.aboutText}>Skills: (coming soon)</Text>
          <Text style={styles.aboutText}>Education: (coming soon)</Text>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: "80%",
    overflow: "hidden",
  },

  top: {
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
    paddingLeft: 15,

    marginTop: 20,
    opacity: 0.9,
    textAlign: "left",
    fontSize: 16,
    fontFamily: "DarkerGrotesque-Medium",
  },

  aboutText: {
    color: colors.secondary,
    paddingLeft: 15,
    marginTop: 20,
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
    // backgroundColor: colors.red,
  },
  linkText: {
    color: colors.secondary,
    alignSelf: "center",
    justifyContent: "center",
    padding: 30,
    // backgroundColor: colors.red,
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
});

export default BioSheetModalScreen;
