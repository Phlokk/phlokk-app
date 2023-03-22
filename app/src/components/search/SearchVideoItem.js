import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";
import colors from "../../../config/colors";
import VerifiedIcon from "../common/VerifiedIcon";

export default function SearchVideoItem({ item }) {
  const navigation = useNavigation();

  const getDate = () => {
    const date = new Date(item.created_at);
    return `${date.getDay()}/${date.getMonth()}`;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("discoverFeedProfile", { initialUser: item })
      }
    >
      <View>
        <FastImage
          style={styles.thumbnail}
          source={{
            uri: item?.media[1]?.original_url,
            priority: FastImage.priority.low,
          }}
          cache={FastImage.cacheControl.web}
        />
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.date}>{getDate()}</Text>
        <View style={styles.userDetailsContainer}>
          <View style={styles.userDetails}>
            <Image
              style={styles.image}
              source={{ uri: item?.user?.photo_thumb_url }}
            />

            <TouchableOpacity>
              <View style={styles.verifiedRow}>
                <Text style={styles.username}>
                  {item?.user?.username ?? " "}
                </Text>
                {item?.user?.is_verified && <VerifiedIcon />}
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.videoDetails}>
            <FontAwesome5
              name="play"
              size={12}
              color={colors.secondary}
              style={styles.pauseIcon}
            />
            <Text style={styles.playCount}>{item?.play_count}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexBasis: "50%",
    justifyContent: "space-around",
    padding: 5,
  },
  thumbnail: {
    width: "100%",
    height: 300,
  },
  description: {
    color: colors.secondary,
  },
  image: {
    backgroundColor: "#0C0C0C",
    height: 30,
    width: 30,
    borderRadius: 18,
    borderColor: colors.white,
    borderWidth: 0.7,
    marginTop: 7,
  },
  userDetailsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  username: {
    color: colors.secondary,
    fontSize: 12,
    marginLeft: 5,
  },
  playCount: {
    color: colors.secondary,
    justifyContent: "flex-end",
  },
  pauseIcon: {
    margin: 5,
  },
  videoDetails: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  date: {
    top: -60,
    fontSize: 12,
    paddingLeft: 5,
    color: colors.white,
    fontWeight: "bold",
  },
  userDetails: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  verifiedRow: {
    flexDirection: "row",
  },
});
