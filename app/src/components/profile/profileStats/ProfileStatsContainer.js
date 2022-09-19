import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomAlert from "../../Alerts/CustomAlert";
import {MaterialIcons} from "@expo/vector-icons";
// import routes from "../../../navigation/routes"
import colors from "../../../../config/colors";
import {useAtom} from "jotai";
import {userAtom} from "../../../../../App";

function ProfileStatsContainer({currentUser}) {
  const navigation = useNavigation();

  const [user, setUser] = useAtom(userAtom);


  const [starCount, setStarCount] = useState(currentUser?.like_count || user?.like_count);
  const [following, setFollowing] = useState(currentUser?.follow_count || user?.follow_count);

  const [isFollowing, setIsFollowing] = useState(currentUser?.is_following || user?.is_following);
  const [friends, setFriends] = useState("0");

  const [isFriends, setIsFriends] = useState(false);




  return (
    <View style={styles.outerContainer}>
      <View style={styles.counterContainer}>

        <View style={styles.counterItemContainer}>
          <TouchableOpacity
          onPress={() => setIsFollowing(true)}

          // onPress={() => navigation.navigate(routes.FOLLOWING_LIST)}
          >
            <Text style={styles.counterNumberText}>{following}</Text>
          </TouchableOpacity>

          <Text style={styles.counterLabelText}>Following</Text>
        </View>

        <View style={styles.counterItemContainer}>
        <CustomAlert
          alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
          customAlertMessage={<Text>Friends{"\n"}coming in beta 3</Text>}
          positiveBtn="Ok"
          modalVisible={isFriends}
          dismissAlert={setIsFriends}
          animationType="fade"
        />
          <TouchableOpacity
          onPress={() => setIsFriends(true)}

          // onPress={() => navigation.navigate(routes.FRIENDS_LIST)}
          >
            <Text style={styles.counterNumberText}>{friends}</Text>
          </TouchableOpacity>
          <Text style={styles.counterLabelConnections}>Friends</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>{starCount}</Text>
          <Text style={styles.counterLabelTextStar}>Stars</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
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
  counterNumberText: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.white,
  },
  counterLabelText: {
    color: colors.diamondBlue,
    fontSize: 11,
  },
  counterLabelConnections: {
    color: colors.diamondBlue,
    fontSize: 11,
    marginTop: 0,
  },
  counterLabelTextStar:{
    color: colors.diamondBlue,
    fontSize: 11,
  },
  profileIconButton: {

    paddingVertical: 7,
  },
  filledButton: {
    paddingVertical: 7,
  },
});

export default React.memo(ProfileStatsContainer)
