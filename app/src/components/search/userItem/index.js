import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";

import routes from "../../../navigation/routes";
import colors from "../../../../config/colors";

export default function SearchUserItem() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate(routes.PROFILE_OTHER, { initialUserId: user.id })
      }
    >
      <View style={styles.verifiedRow}>
        <Text style={styles.text}>{user.username}</Text>
        <View style={{ flex: 1 }}>
          {/* {users.is_verified === true ? (
            <Image 
            style={styles.verifiedBadge} 
            key={i}
            source={{ uri: user.is_verified }} 
            />
          ) : (
            <TouchableOpacity></TouchableOpacity>
          )} */}
        </View>
        <Image style={styles.image} key={i} source={{ uri: user.photo_url }} />
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
