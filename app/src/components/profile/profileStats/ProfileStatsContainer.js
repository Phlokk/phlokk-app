import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomAlert from "../../Alerts/CustomAlert";
import {Feather, MaterialIcons} from "@expo/vector-icons";
import routes from "../../../navigation/routes"
import colors from "../../../../config/colors";
import {useAtom} from "jotai";
import {userAtom} from "../../../../../App";
import axios from "../../../redux/apis/axiosDeclaration";

function ProfileStatsContainer({currentUser}) {
  const navigation = useNavigation();

  const [user, setUser] = useAtom(userAtom);
  // console.log(user);

  const [following, setFollowing] = useState(currentUser?.follow_count || user?.follow_count);
  const [friends, setFriends] = useState("500k");
  const [starCount, setStarCount] = useState(currentUser?.like_count || user?.like_count);

  const [isFollowing, setIsFollowing] = useState(currentUser?.is_following || user?.is_following);
  const [isFriends, setIsFriends] = useState(false);


  const toggleIsFollowing = async function (userId) {
    await axios.post('/api/creator/' + userId + '/' + (isFollowing ? 'unfollow' : 'follow'), {});
    console.log('toggleIsFollowing');
    setIsFollowing(!isFollowing);

    setFollowing((!isFollowing) ? (following + 1) : (following - 1));
  }


    // format a number so that we show K at the end if it’s a thousand or more and return the show number if it’s less than 1000
  // const kFormatter = (num) => {
  //   return Math.abs(num) > 999
  //     ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
  //     : Math.sign(num) * Math.abs(num);
  // };

  const renderFollowButton = () => {
    if (user._id == currentUser._id) {
      return;
    }
    if (isFollowing) {
      return (
          <View style={{flexDirection: 'row', alignItems: "center"}}>
            {/*<TouchableOpacity*/}
            {/*	style={styles.profileIconButton}*/}
            {/*	// onPress={() =>*/}
            {/*	//   navigation.navigate(routes.CHAT_SINGLE, { contactId: user.id })*/}
            {/*	// }*/}
            {/*>*/}
            {/*	<MaterialCommunityIcons*/}
            {/*		name="message-processing-outline"*/}
            {/*		size={22}*/}
            {/*		color="lightgray"*/}
            {/*	/>*/}
            {/*</TouchableOpacity>*/}
            <TouchableOpacity
                style={styles.profileIconButton}
                onPress={() => toggleIsFollowing(currentUser._id)}
            >
              <Feather name="user-check" size={20} color={colors.green} />
            </TouchableOpacity>
          </View>
      );
    } else {
      return (
          <TouchableOpacity
              style={styles.filledButton}
              onPress={() => toggleIsFollowing(currentUser._id)}
              // onPress={() =>
              //   isFollowingMutation.mutate({ otherUserId: user.id, isFollowing })
              // }
          >
            <Text style={styles.text}>
              <Feather name="user-plus" size={20} color="white" />
            </Text>
          </TouchableOpacity>
      );
    }
  };

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
          <Text style={styles.counterLabelText}>Friends</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>{starCount}</Text>
          <Text style={styles.counterLabelText}>Stars</Text>
        </View>
      </View>
      { renderFollowButton() }
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    paddingHorizontal: 50,
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

  profileIconButton: {
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 7,
    marginBottom: 5,
    paddingHorizontal: 30,
    marginHorizontal: 5,
  },
  filledButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.secondary,
    paddingVertical: 7,
    paddingHorizontal: 50,
    marginBottom: 5,
  },
});

export default React.memo(ProfileStatsContainer)
