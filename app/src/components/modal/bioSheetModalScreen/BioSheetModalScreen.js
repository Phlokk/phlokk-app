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
import { SimpleLineIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import colors from "../../../../config/colors";
import { useState } from "react";
import VerifiedIcon from "../../common/VerifiedIcon";
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
      <View style={styles.top}>
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
              color={user && user.instagram_link ? colors.green : colors.white}
            />
          </View>
        </View>
      </View>
      <View style={styles.top}>
        <Text style={styles.text}>Creator</Text>
        <View style={styles.usernameView}>
          {user.username !== null ? (
            <Text selectable={true} style={styles.username}>
              @{user.username}
              <View>{user && user.is_verified === 1 && <VerifiedIcon />}</View>
            </Text>
          ) : (
            <Text style={styles.username}>@user</Text>
          )}
        </View>
        {/* follow button  */}
        {!isCurrentUser && (
          <TouchableOpacity
            style={styles.imageViewContainer}
            onPress={() => toggleIsFollowing(user._id)}
          >
            <View style={isFollowing ? styles.followingBtn : styles.followBtn}>
              <Text
                style={
                  isFollowing
                    ? styles.alertMessageFriendsText
                    : styles.alertMessageFollowText
                }
              >
                {isFollowing ? "Following" : "Follow"}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <Text style={styles.statusText}>Relationship status</Text>
        <Text style={[styles.statusText, styles.relationshipStatusIcon]}>
          <Ionicons name="md-heart-sharp" size={12} color={colors.white} />{" "}
          {user.relationship_type}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator="false">
        <Text style={styles.aboutText}>Bio:</Text>
        <Text style={styles.bioText}>{user.bio}</Text>
        <Text style={styles.aboutText}>Skills: (coming soon)</Text>
        <Text style={styles.aboutText}>Education: (coming soon)</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.modals,
    height: "80%",
    padding: 20,
  },

  top: {
    alignItems: "center",
    bottom: 10,
  },
  middle: {
    textAlign: "center",
    color: colors.white,
    fontSize: 16,
  },
  username: {
    fontSize: 12,
    color: colors.green,
    marginTop: 5,
    marginBottom: 20,
  },

  bioText: {
    color: colors.white,
    padding: 5,

    marginTop: 20,
    opacity: 0.9,
    textAlign: "left",
    fontSize: 16,
    fontFamily: "DarkerGrotesque-Medium",
  },

  aboutText: {
    color: colors.white,

    padding: 5,
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
    bottom: 5,
  },
  imageOverlay: {
    backgroundColor: "rgba(0,0,0, 0.5)",
    ...StyleSheet.absoluteFill,
  },
});

export default BioSheetModalScreen;
