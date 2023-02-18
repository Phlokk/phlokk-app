import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomAlert from "../../Alerts/CustomAlert";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useTheme } from "../../../theme/context";
import { getAllUserPostLikes } from "../../../services/user";

function ProfileStatsContainer({ user, isCurrentUser }) {

  const isFocused = useIsFocused();

  const { theme, setTheme } = useTheme();
  const navigation = useNavigation();
  const [following, setFollowing] = useState(user?.follow_count);

  const [likesCount, setLikesCount] = useState("");

  const [isFollowing, setIsFollowing] = useState(false);
  const [isStar, setIsStar] = useState(false);
  const [friends, setFriends] = useState("0");

  const [isFriends, setIsFriends] = useState(false);

  useEffect(() => {
    const totalPostsLikes = async () => {
      const likesCount = await getAllUserPostLikes(user._id);
      setLikesCount(likesCount);

      starCount = likesCount;
    };

    if (isFocused) {
      totalPostsLikes();
    }
  }, [isFocused]);

  starCount = likesCount;
  


  return (
    <View style={styles.outerContainer}>
      <View style={styles.counterContainer}>
        <View style={[styles.counterItemContainer, styles.followingPad]}>
          <TouchableOpacity
            onPress={() => setIsFollowing(true)}
            // onPress={() => navigation.navigate(routes.FOLLOWING_LIST, {
            // 	user: user,
            // 	isCurrentUser: isCurrentUser
            // })}
          >
            <Text
              style={
                theme == "light"
                  ? styles.counterNumberText_light
                  : styles.counterNumberText_dark
              }
            >
              {following}
            </Text>
          </TouchableOpacity>

          <Text
            style={
              theme == "light"
                ? styles.counterLabelText_light
                : styles.counterLabelText_dark
            }
          >
            Following
          </Text>
        </View>

        <View style={styles.counterItemContainer}>
          <TouchableOpacity
            onPress={() => setIsFriends(true)}

            // onPress={() => navigation.navigate(routes.FRIENDS_LIST)}
          >
            <Text
              style={
                theme == "light"
                  ? styles.counterNumberText_light
                  : styles.counterNumberText_dark
              }
            >
              {friends}
            </Text>
          </TouchableOpacity>
          <Text
            style={
              theme == "light"
                ? styles.counterLabelConnections_light
                : styles.counterLabelConnections_dark
            }
          >
            Friends
          </Text>
        </View>
        <View style={styles.counterItemContainer}>
          <TouchableOpacity onPress={() => setIsStar(true)}>
            <Text
              style={
                theme == "light"
                  ? styles.counterNumberText_light
                  : styles.counterNumberText_dark
              }
            >
              {starCount}
            </Text>
          </TouchableOpacity>
          <Text
            style={
              theme == "light"
                ? styles.counterLabelTextStar_light
                : styles.counterLabelTextStar_dark
            }
          >
            Stars
          </Text>
        </View>
      </View>
      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Friends{"\n"}coming soon!</Text>}
        positiveBtn="Ok"
        modalVisible={isFriends}
        dismissAlert={setIsFriends}
        animationType="fade"
      />
      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Following{"\n"}coming soon!</Text>}
        positiveBtn="Ok"
        modalVisible={isFollowing}
        dismissAlert={setIsFollowing}
        animationType="fade"
      />
      <CustomAlert
        alertTitle={
          <Text>
            <MaterialCommunityIcons
              color={colors.white}
              size={24}
              name="star"
            />
          </Text>
        }
        customAlertMessage={
          <Text>
            {user.username} received a total of {starCount}
            {"\n"} stars across all videos.
          </Text>
        }
        positiveBtn="Ok"
        modalVisible={isStar}
        dismissAlert={setIsStar}
        animationType="fade"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  counterContainer: {
    paddingBottom: 10,
    flexDirection: "row",
  },
  counterItemContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  counterNumberText_light: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.black,
  },
  counterNumberText_dark: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.white,
  },
  counterLabelText_light: {
    color: colors.black,
    fontSize: 11,
    opacity: 0.5,
  },
  counterLabelText_dark: {
    color: colors.secondary,
    fontSize: 11,
    opacity: 0.7,
  },
  counterLabelConnections_light: {
    color: colors.black,
    opacity: 0.5,
    fontSize: 11,
    marginTop: 0,
  },
  counterLabelConnections_dark: {
    color: colors.white,
    opacity: 0.7,
    fontSize: 11,
    marginTop: 0,
  },
  counterLabelTextStar_light: {
    color: colors.black,
    fontSize: 11,
    opacity: 0.5,
  },
  counterLabelTextStar_dark: {
    color: colors.secondary,
    fontSize: 11,
    opacity: 0.7,
  },
  profileIconButton: {
    paddingVertical: 7,
  },
  filledButton: {
    paddingVertical: 7,
  },
  followingPad: {
    top: -1.8,
  },
});

export default React.memo(ProfileStatsContainer);
