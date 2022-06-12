import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import routes from "../../../navigation/routes"
import colors from "../../../../config/colors";

function ProfileStatsContainer() {
  const navigation = useNavigation();
  const [following, setFollowing] = useState("40k");
  const [friends, setFriends] = useState("500k");
  const [starCount, setStarCount] = useState("10m");

    // format a number so that we show K at the end if it’s a thousand or more and return the show number if it’s less than 1000
  // const kFormatter = (num) => {
  //   return Math.abs(num) > 999
  //     ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
  //     : Math.sign(num) * Math.abs(num);
  // };

  
  return (
    <View style={styles.counterContainer}>
      <View style={styles.counterItemContainer}>
        <TouchableOpacity
        onPress={() => navigation.navigate(routes.FOLLOWING_LIST)}
        >
          <Text style={styles.counterNumberText}>{following}</Text>
        </TouchableOpacity>
        <Text style={styles.counterLabelText}>Following</Text>
      </View>
      <View style={styles.counterItemContainer}>
        <TouchableOpacity
        onPress={() => navigation.navigate(routes.FRIENDS_LIST)}
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
  );
}

const styles = StyleSheet.create({
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
});

export default React.memo(ProfileStatsContainer)
