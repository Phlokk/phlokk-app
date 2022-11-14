import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import colors from "../../../config/colors";
import { useState } from "react";
import VerifiedIcon from "../../components/common/VerifiedIcon";
import axios from "../../redux/apis/axiosDeclaration";

export default function CustomImageModal({
  modalVisible,
  dismissAlert,
  user,
  isCurrentUser,
  setUser,
}) {
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
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType={"fade"}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.middle}>
            <View style={styles.bioView}>
              <View style={styles.top}>
                <View style={styles.goBackView}>
                  <Feather
                    onPress={() => dismissAlert(false)}
                    style={styles.alertMessageButtonText}
                    name="x"
                    size={25}
                  />
                </View>
                <Image
                  source={{ uri: user.photo_url }}
                  resizeMode={"contain"}
                  style={styles.profileImage}
                />
              </View>
              <View style={styles.top}>
                <View style={styles.usernameView}>
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
                <Text
                  style={[styles.statusText, styles.relationshipStatusIcon]}
                >
                  <Ionicons
                    name="md-heart-sharp"
                    size={12}
                    color={colors.white}
                  />{" "}
                  {user.relationship_type}
                </Text>
              </View>

              <ScrollView>
                <Text style={styles.aboutText}>Bio:</Text>
                <Text style={styles.bioText}>{user.bio}</Text>
                <Text style={styles.aboutText}>Skills: (coming soon)</Text>
                <Text style={styles.aboutText}>Education: (coming soon)</Text>
              </ScrollView>

              {/* follow button  */}
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
                      {isFollowing ? "Following" : "Follow"}
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
                    color={
                      user && user.youtube_link ? colors.green : colors.white
                    }
                  />
                </View>
                <View style={styles.linkText}>
                  <Octicons
                    onPress={
                      user && user.link
                        ? () => Linking.openURL(user.link)
                        : null
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
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: "100%",
    width: "100%",
    padding: 4,
  },
  scroll: {
    backgroundColor: colors.red,
    // padding: 10,
  },
  top: {
    alignItems: "center",
    bottom: 30,
  },
  middle: {
    textAlign: "center",
    padding: 15,

    color: colors.white,
    fontSize: 16,
  },
  profileImage: {
    borderColor: colors.secondary,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 100,
    marginTop: 30,
    height: 100,
    width: 100,
  },
  statusText: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  username: {
    fontSize: 12,
    color: colors.green,
    marginTop: 5,
    marginBottom: 20,
  },
  alertTitleTextStyle: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: colors.green,
    fontSize: 18,
    fontWeight: "bold",
    padding: 2,
    marginHorizontal: 2,
  },
  bioText: {
    color: colors.white,
    marginTop: 10,
    opacity: 0.9,
    textAlign: "left",
    fontSize: 16,
    fontFamily: "DarkerGrotesque-Medium",
  },
  bioView: {
    top: 80,
    backgroundColor: colors.lightBlack,
    borderColor: colors.secondary,
    borderWidth: 0.3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 0.9,
    padding: 30,
    borderRadius: 7,
  },
  aboutText: {
    color: colors.white,
    marginTop: 40,
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
    top: 10,
  },
  statusText: {
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
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
    marginTop: 50,
    paddingBottom: 20,
    top: 30,
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

  goBackView: {
    zIndex: 99,
    position: "absolute",
    left: -25,
    top: 5,
  },
  imageViewContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: 70,
  },
  imageOverlay: {
    backgroundColor: "rgba(0,0,0, 0.5)",
    ...StyleSheet.absoluteFill,
  },
});
