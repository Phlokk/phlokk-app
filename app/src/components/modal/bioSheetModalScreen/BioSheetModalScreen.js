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
import { FontAwesome5 } from '@expo/vector-icons'; 
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

          {user.relationship_type !== "n/a" && (
            <>
              <Text style={styles.statusText}>Relationship status</Text>
              <Text style={[styles.statusText, styles.relationshipStatusIcon]}>
                <Ionicons
                  name="md-heart-sharp"
                  size={12}
                  color={colors.white}
                />
                {user.relationship_type}
              </Text>
            </>
          )}

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
          <View style={styles.userInfoBox}>
          <Feather style={styles.icons} name="user" color={colors.secondary} />
          <Text style={styles.bioText}>{user.bio}</Text>
          <View
          style={styles.divider_light}
        ></View>
          </View>
          
          <View style={styles.userInfoBox}>
          <Feather style={styles.icons} name="award" color={colors.secondary} />
          <Text style={styles.bioText}>{user.skills}</Text>
          <View
          style={styles.divider_light}
        ></View>
        <View
          style={styles.divider_light}
        ></View>
          </View>
  
          <View style={styles.userInfoBox}>
          <FontAwesome5 style={styles.icons} name="user-graduate" color={colors.secondary} />
          <Text style={styles.bioText}>{user.education}</Text>
          <View
          style={styles.divider_light}
        ></View>
          </View>
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
    // backgroundColor: "rgba(0,0,0, 0.2)",
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
