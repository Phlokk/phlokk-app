import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";

import colors from "../../../../config/colors";

export default function ProfileStatsContainer() {
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
        <Text style={styles.counterNumberText}>{following}</Text>
        <Text style={styles.counterLabelText}>Following</Text>
      </View>
      <View style={styles.counterItemContainer}>
        <Text style={styles.counterNumberText}>{friends}</Text>
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
    color: colors.white,
    fontSize: 11,
  },
});
