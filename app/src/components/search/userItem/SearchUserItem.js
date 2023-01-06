import { useNavigation } from "@react-navigation/core";
import React, { useContext } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import colors from "../../../../config/colors";
import VerifiedIcon from "../../common/VerifiedIcon";
import { useTheme } from "../../../theme/context";



export default function SearchUserItem({ item }) {
  const { theme, setTheme } = useTheme();
  const navigation = useNavigation();

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
            <Text
              style={theme == "light" ? styles.text_light : styles.text_dark}
            >
              @{item.username}
            </Text>
            <View style={styles.check}>{item && item.is_verified === 1 && <VerifiedIcon />}
            </View>
          </Text>
        ) : (
          <Text style={styles.username}>@user</Text>
        )}
        <Text
          style={
            theme == "light"
              ? styles.creatorText_light
              : styles.creatorText_dark
          }
        >
          {item.creator_type}
        </Text>
      </View>

      <View>
        <Image
          style={styles.image}
          source={
            item?.photo_thumb_url
              ? { uri: item?.photo_thumb_url }
              : require("../../../../assets/userImage.png")
          }
        />
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
  text_light: {
    fontSize: 12,
    color: colors.secondary,
  },
  text_dark: {
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
  creatorText_light: {
    color: colors.secondary,
    opacity: 0.7,
    fontSize: 10,
  },
  creatorText_dark: {
    color: colors.secondary,
    opacity: 0.7,
    fontSize: 10,
  },
});
