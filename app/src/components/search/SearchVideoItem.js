import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Foundation } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";
import colors from "../../../config/colors";
import VerifiedIcon from "../common/VerifiedIcon";
import RisingStar from "../common/RisingStar";

export default function SearchVideoItem({ item, setPlayVideo }) {
  const navigation = useNavigation();

  const getDate = () => {
    const date = new Date(item.created_at);
    return `${date.getDay()}/${date.getMonth()}`;
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          setPlayVideo(item);
        }}
      >
        <View>
          <FastImage
            style={styles.thumbnail}
            source={{
              uri: item?.media[0]?.original_url,
              priority: FastImage.priority.low,
            }}
            cache={FastImage.cacheControl.web}
          />

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
                <View style={styles.iconRow}>
                  {item?.user?.is_verified && <VerifiedIcon />}
                </View>
                {item.user.is_rising === 1 && (
                  <View style={styles.starRow}>
                    <RisingStar />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={styles.date}>{getDate()}</Text>
          <View style={styles.userDetailsContainer}>
            <View style={styles.videoDetails}>
              <Text style={styles.playCountText}>
                <Foundation
                  style={styles.graphIcon}
                  name="graph-bar"
                  size={14}
                  color={colors.secondary}
                />{" "}
                <Text style={styles.playCount}>{item?.play_count}</Text>
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  mainVideoContainer: {
    flex: 1,
  },
  container: {
    flexBasis: "50%",
    justifyContent: "space-around",
    padding: 5,
  },
  thumbnail: {
    width: "100%",
    height: 300,
    borderRadius: 1.5,
  },
  description: {
    color: colors.secondary,
    fontSize: 11,
  },
  image: {
    backgroundColor: "#0C0C0C",
    height: 20,
    width: 20,
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
    fontSize: 10,
    marginLeft: 5,
    top: 3,
  },
  playCount: {
    fontSize: 10,
    top: 4,
    color: colors.secondary,
    justifyContent: "flex-end",
  },
  pauseIcon: {
    margin: 5,
    top: 5,
  },
  videoDetails: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  date: {
    top: -90,
    fontSize: 12,
    paddingLeft: 5,
    color: colors.white,
    fontWeight: "bold",
  },

  userDetails: {
    flex: 1,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  verifiedRow: {
    flexDirection: "row",
  },
  iconRow: {
    top: 5.5,
  },
  starRow: {
    top: 17,
    right: 15,
  },
  playCountText: {
    color: colors.white,
    fontWeight: "600",
    marginLeft: 0,
    fontSize: 11,
    position: "absolute",
    bottom: -3.5,
    left: 0,
  },
  graphIcon: {
    fontSize: 11,
  },
});
