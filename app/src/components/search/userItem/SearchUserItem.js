import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import colors from "../../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../../App";
import VerifiedIcon from "../../common/VerifiedIcon";
import routes from "../../../navigation/routes";

export default function SearchUserItem({ item }) {
  const navigation = useNavigation();
  //   const [user, setUser] = useAtom(userAtom);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("discoverFeedProfile", { initialUser: item })
      }
    >
      <View style={styles.verifiedRow}>
        {item.username !== null || !undefined ? (
          <Text>
            <Text style={styles.text}>@{item.username}</Text>
            <View>
              {item && item.is_verified === 1 && (
                // <Image style={styles.verifiedBadge} source={verifiedCheck} />
                <VerifiedIcon />
              )}
            </View>
          </Text>
        ) : (
          <Text style={styles.username}>@user</Text>
        )}
      </View>

      <View>
        {item.photo_thumb_url !== null || !undefined ? (
          <Image style={styles.image} source={{ uri: item.photo_thumb_url }} />
        ) : (
          <Image
            style={styles.image}
            source={require("../../../../assets/userImage.png")}
          />
        )}
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
  username: {
    color: colors.white,
    marginTop: 10,
    marginBottom: 20,
  },
});
