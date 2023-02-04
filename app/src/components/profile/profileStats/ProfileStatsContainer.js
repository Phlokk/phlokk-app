import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomAlert from "../../Alerts/CustomAlert";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../../config/colors";
// import { useAtom } from "jotai";
// import { userAtom } from "../../../../../App";
// import routes from "../../../navigation/routes";
import { useTheme } from "../../../theme/context";

function ProfileStatsContainer({ user, isCurrentUser }) {
  const { theme, setTheme } = useTheme();
  const navigation = useNavigation();
  const [starCount, setStarCount] = useState(user?.like_count);
  const [following, setFollowing] = useState(user?.follow_count);

  const [isFollowing, setIsFollowing] = useState(false);
  const [isStar, setIsStar] = useState(false);
  const [friends, setFriends] = useState("0");

  const [isFriends, setIsFriends] = useState(false);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.counterContainer}>
        <View style={styles.counterItemContainer}>
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
          <TouchableOpacity
          onPress={() => setIsStar(true)}
          >
        
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
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={<Text>Star count{"\n"}coming soon!</Text>}
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
});

export default React.memo(ProfileStatsContainer);
