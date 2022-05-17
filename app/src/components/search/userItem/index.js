import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";

import routes from "../../../navigation/routes";
import colors from "../../../../config/colors";

export default function SearchUserItem({ item }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate(routes.PROFILE_OTHER, { initialUserId: item?.uid })
      }
    >
      <View style={styles.verifiedRow}>
        <Text style={styles.text}>{item.username}</Text>
        <View style={{ flex: 1 }}>
          {/* {item?.verified === true ? (
            <Image style={styles.verifiedBadge} source={verifiedPNG} />
          ) : (
            <TouchableOpacity></TouchableOpacity>
          )} */}
        </View>
        <Image style={styles.image} source={{ uri: item.photoURL }} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  verifiedRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  verifiedBadge: {
    width: 10,
    height: 10,
    top: 1,
    marginHorizontal: 3,
  },
  text: {
    fontSize: 12,
    color: colors.secondary,
  },
  image: {
    backgroundColor: "#0C0C0C",
    height: 45,
    width: 45,
    borderRadius: 25,
  },
});
