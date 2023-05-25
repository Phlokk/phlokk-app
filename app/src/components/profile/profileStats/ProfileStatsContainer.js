import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomAlert from "../../Alerts/CustomAlert";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useTheme } from "../../../theme/context";
import { getAllUserPostLikes, getCount} from "../../../services/user";
import { numberFormatter } from "../../common/NumberFormatter";
import routes from "../../../navigation/routes";

function ProfileStatsContainer({ user,disablePressEvents = false,chatModule,  isCurrentUser }) {
  const isFocused = useIsFocused();

  const { theme, setTheme } = useTheme();
  const navigation = useNavigation();
  const [following, setFollowing] = useState("");

  const [likesCount, setLikesCount] = useState(0);
  const [starsCount, setStarsCount] = useState(0);

  const [isFollowing, setIsFollowing] = useState(false);
  const [isStar, setIsStar] = useState(false);
  const [friendsCount, setFriendsCount] = useState(0);

  const [isFriends, setIsFriends] = useState(false);

  

  useEffect(() => {
    const getAllCounts = async () => {
      const countResults = await getCount(user._id);
      setFollowing(numberFormatter(countResults.followersCount));
      setStarsCount(numberFormatter(countResults.starsCount));
      setFriendsCount(numberFormatter(countResults.friendsCount));
    };

    if (isFocused) {
      getAllCounts();
    }
  }, [isFocused]);

  followingCount = numberFormatter(following);

  const getTextColor = () => {
    if(chatModule){
     return styles.counterNumberText_dark
    }  else{
     return  theme == "light" ? styles.counterNumberText_light  : styles.counterNumberText_dark
    }
  }
  const getLabelColor = () =>{
    if(chatModule){
      return styles.counterLabelText_dark
    }else{
     return theme == "light"  ? styles.counterLabelTextStar_light : styles.counterLabelTextStar_dark
    }
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.counterContainer}>
        <View style={[styles.counterItemContainer, styles.followingPad]}>
          <TouchableOpacity
            // onPress={() => setIsFollowing(true)}
            onPress={disablePressEvents ?()=>{} :() =>
              navigation.navigate(routes.FOLLOWING_LIST, {
                user: user,
                isCurrentUser: isCurrentUser,
              })
            }
          >
            <Text
              style={ getTextColor()}
            >
              {numberFormatter(following)}
            </Text>
          </TouchableOpacity>

          <Text
            style={getLabelColor() }
          >
            Following
          </Text>
        </View>

        <View style={styles.counterItemContainer}>
          <TouchableOpacity
            // onPress={() => setIsFriends(true)}

            onPress={disablePressEvents ?()=>{} :() =>
              navigation.navigate(routes.FRIENDS_LIST, {
                user: user,
                isCurrentUser: isCurrentUser,
              })
            }
          >
            <Text
             style={ getTextColor()}
            >
              {numberFormatter(friendsCount)}
            </Text>
          </TouchableOpacity>
          <Text
           style={getLabelColor() }
          >
            Friends
          </Text>
        </View>
        <View style={styles.counterItemContainer}>
          <TouchableOpacity onPress={disablePressEvents ?()=>{} : () => setIsStar(true)}>
            <Text style={ getTextColor()}
            >
              {starsCount}
            </Text>
          </TouchableOpacity>
          <Text
           style={getLabelColor() }
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
            <AntDesign
              color={colors.white}
              size={18}
              name="star"
            />
          </Text>
        }
        customAlertMessage={
          <Text>
            {user.username} received a total of {starsCount}
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
