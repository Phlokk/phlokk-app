import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import VerifiedIcon from "../../components/common/VerifiedIcon";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../config/colors";
import axios from "../../redux/apis/axiosDeclaration";

const FollowingListItem = ({ item }) => {

  const navigation = useNavigation();
  const [isFollowing, setIsFollowing] = useState(item.is_following);
  const toggleIsFollowing = async function () {
    await axios.post(
      "/api/creator/" + item._id + "/" + (!isFollowing ? "unfollow" : "follow")
    ),
      {};
    setIsFollowing(!isFollowing);
  };

  return (
    <View style={styles.item}>
      <View>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={
              item?.photo_thumb_url
                ? { uri: item?.photo_thumb_url }
                : require("../../../assets/userImage.png")
            }
          />
        </TouchableOpacity>
      </View>
      <View style={styles.followingInfoRow}>
        <TouchableOpacity>
          <Text
          // TODO:Needs to navigate to the correct user account
            // onPress={() => {
            //   navigation.navigate("feedProfile", {
            //     initialUser: item.user,
            //   });
            // }}
            style={styles.itemInfo}
          >
            {item.username}
            {item.is_verified && (
              <View style={styles.logoRow}>
                <VerifiedIcon />
              </View>
            )}
            <Text style={styles.itemCreator}> {item.creator}</Text>
          </Text>
          <Text style={styles.creatorTypeText}> {item.creator_type}</Text>
        </TouchableOpacity>
        {isFollowing ? (
          <TouchableOpacity
            onPress={toggleIsFollowing}
            style={styles.followingView}
          >
            <Text style={styles.followBtn}>Following</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={toggleIsFollowing}
            style={styles.followingView}
          >
            <Text style={styles.followingBtn}>Follow</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    color: colors.secondary,
    paddingHorizontal: 15,
    alignItems: "center",
    marginTop: 15,
  },
  followingView: {
    position: "absolute",
    right: 0,
    left: 280,
    top: 0,
    bottom: 0,
  },
  followingInfoRow: {
    flex: 1,
  },
  followRow: {
    position: "absolute",
    right: 8,
    bottom: 70,
  },
  image: {
    borderRadius: 50,
    height: 35,
    width: 35,
  },
  logo: {
    left: 2,
    height: 12,
    width: 12,
  },
  itemInfo: {
    color: colors.green,
    fontWeight: "bold",
    top: 5,
    fontSize: 11,
    paddingLeft: 5,
  },
  itemCreator: {
    color: colors.green,
    fontWeight: "bold",
    top: 10,
    fontSize: 8,
    paddingLeft: 5,
  },
  creatorTypeText: {
    color: colors.secondary,
    top: 7,
    fontSize: 8,
    paddingLeft: 3,
  },
  logoRow: {
    bottom: 12,
    paddingLeft: 5,
  },
  followingBtn: {
    fontSize: 10,
    color: colors.white,
    textAlign: "center",
    padding: 4,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.green,
    backgroundColor: colors.grey,
  },
  followBtn: {
    fontSize: 10,
    color: colors.green,
    textAlign: "center",
    padding: 4,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.green,
    backgroundColor: colors.grey,
  },
});

export default FollowingListItem;
