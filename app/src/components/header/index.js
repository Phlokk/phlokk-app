import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import DisplayMenuScreen from "../../screens/profile/displayMenu";
// import { useFollowing } from "../../../hooks/useFollowing";
// import { useFollowingMutation } from "../../../hooks/useFollowingMutation";
import UserProfile from "../../screens/profile/userProfile";
import ProfileStatsContainer from "../profile/profileStats";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import routes from "../../../navigation/routes";

import colors from "../../../config/colors";

function ProfileHeader() {
  const navigation = useNavigation();


  // const auth = useSelector((state) => state.auth);

  // const isFollowing = useFollowing(
  //   auth.currentUser.user)
  // // const isFollowingMutation = useFollowingMutation();
  // const renderFollowButton = () => {
  //   if (isFollowing === null) {
  //     return (
  //       <View style={{ flexDirection: "row" }}>
  //         <TouchableOpacity
  //           style={styles.profileIconButton}
  //           // onPress={() =>
  //           //   navigation.navigate(routes.CHAT_SINGLE, { contactId: user.id })
  //           // }
  //         >
  //           <MaterialCommunityIcons
  //             name="message-processing-outline"
  //             size={22}
  //             color="lightgray"
  //           />
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={styles.profileIconButton}
  //           // onPress={() =>
  //           //   isFollowingMutation.mutate({ otherUserId: user.id, isFollowing })
  //           // }
  //         >
  //           <Feather name="user-check" size={20} color={colors.green} />
  //         </TouchableOpacity>
  //       </View>
  //     );
  //   } else {
  //     return (
  //       <TouchableOpacity
  //         style={styles.filledButton}
  //         // onPress={() =>
  //         //   isFollowingMutation.mutate({ otherUserId: user.id, isFollowing })
  //         // }
  //       >
  //         <Text style={styles.text}>
  //           <Feather name="user-plus" size={20} color="white" />
  //         </Text>
  //       </TouchableOpacity>
  //     );
  //   }
  // };

  return (

    <View style={styles.container}>
      
      <ProfileStatsContainer />

      {/* {users !== null ? (
        <TouchableOpacity></TouchableOpacity>
      ) : (
        renderFollowButton()
      )} */}

      <View>
        <UserProfile />
      </View>

      {/* {users !== null ? ( */}
        <View>
          <DisplayMenuScreen />
        </View>
      {/* ) : ( */}
        {/* <TouchableOpacity></TouchableOpacity> */}
      {/* )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 50,
    // backgroundColor: colors.primary,
  },
  creatorText: {
    padding: 20,
    color: colors.white,
  },

  bioText: {
    color: colors.white,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
  },

  display: {
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "bold",
    padding: 20,
    color: colors.white,
  },
  text: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  linkText: {
    color: colors.secondary,
    marginBottom: 30,
  },
  link: {
    alignItems: "center",
    marginVertical: 5,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  username: {
    color: colors.white,
    marginTop: 10,
    marginBottom: 20,
  },
  phlokkVerified: {
    width: 12,
    height: 12,
    bottom: 4,
    marginHorizontal: 3,
  },
  usernameView: {
    flexDirection: "row",
    alignItems: "center",
  },
  followButton: {
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 30,
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
  messageText: {
    color: colors.black,
    fontWeight: "700",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8a2be2",
    padding: 3,
    borderRadius: 25,
    color: colors.primary,
  },
});

export default ProfileHeader;
