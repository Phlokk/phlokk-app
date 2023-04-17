import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import VerifiedIcon from "../../components/common/VerifiedIcon";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../config/colors";
import axios from "../../redux/apis/axiosDeclaration";
import RisingStar from "../../components/common/RisingStar";
import { useAtom } from "jotai";
import { userAtom } from "../../services/appStateAtoms";
import * as SecureStore from "expo-secure-store";
const FriendListItem = ({ item, setFriendsList}) => {
  const navigation = useNavigation();
  const [isFriends, setIsFriends] = useState(item.is_friend);
  const [loggedInUserFollowingList, setLoggedInUserFollowingList] = useState(
    []
  );
  const [currentUser] = useAtom(userAtom);
  const getCurrentUser = async () => {
    const chunkSize = 50;
    let followingList = [];
    let i = 0;
    while (true) {
      const chunkKey = `followingList-${i}`;
      const chunkData = await SecureStore.getItemAsync(chunkKey);
      if (!chunkData) {
        break;
      }
      const chunkArray = JSON.parse(chunkData);
      followingList = [...followingList, ...chunkArray];
      i++;
    }
    return followingList;
  };
  const toggleIsFriend = async function () {
    await axios.delete(`/api/creators/unfollow/${currentUser._id}/${ item.user._id}`),
    {};
    await removeUserToFollowingList(item.user._id);
    setFriendsList(e=> [...e.filter(j=> j.user?._id !==  item.user?._id )])
  };
  useEffect(async () => {
    setLoggedInUserFollowingList(await getCurrentUser());
  }, []);
  const handlesSaveFollowingList = async (list) => {
    const chunkSize = 50;
    const numChunks = Math.ceil(list.length / chunkSize);
    for (let i = 0; i < numChunks; i++) {
      const startIndex = i * chunkSize;
      const endIndex = Math.min((i + 1) * chunkSize, list.length);
      const chunkData = list.slice(startIndex, endIndex);
      const chunkKey = `followingList-${i}`;
      await SecureStore.setItemAsync(chunkKey, JSON.stringify(chunkData));
    }
  };
  const removeUserToFollowingList = async (userId) => {
    let newList = loggedInUserFollowingList.filter((e) => e !== userId);
    setLoggedInUserFollowingList(newList);
    await handlesSaveFollowingList(newList);
  };

  return (
    <View style={styles.item}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("feedProfile", {
              initialUser: item.user,
            });
          }}
        >
          <Image
            style={styles.image}
            source={
              item?.user.photo_thumb_url
                ? { uri: item?.user.photo_thumb_url }
                : require("../../../assets/userImage.png")
            }
          />
        </TouchableOpacity>
      </View>
      <View style={styles.friendInfoRow}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("feedProfile", {
              initialUser: item.user,
            });
          }}
        >
          <Text style={styles.itemInfo}>
            {item.user.username}
            {item.user.is_verified && (
              <View style={styles.logoRow}>
                <VerifiedIcon />
              </View>
            )}
            {item.user.is_rising === 1 && <RisingStar />}
          </Text>
          <Text style={styles.creatorTypeText}> {item.user.creator_type}</Text>
        </TouchableOpacity>
        {isFriends ? (
          <TouchableOpacity onPress={toggleIsFriend} style={styles.friendView}>
            <Text style={styles.friendBtn}>Friend</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleIsFriend} style={styles.friendView}>
            <Text style={styles.friendBtn}>friend</Text>
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
  friendView: {
    position: "absolute",
    right: 0,
    left: 280,
    top: 0,
    bottom: 0,
  },
  friendInfoRow: {
    flex: 1,
  },
  friendRow: {
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
    paddingLeft: 7,
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
    paddingLeft: 5,
  },
  logoRow: {
    bottom: 12,
    paddingLeft: 8,
  },
  unfriendBtn: {
    fontSize: 10,
    color: colors.white,
    textAlign: "center",
    padding: 4,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.green,
    backgroundColor: colors.grey,
  },
  friendBtn: {
    fontSize: 10,
    color: colors.green,
    textAlign: "center",
    padding: 4,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.green,
    backgroundColor: colors.grey,
  },
  risingStarRow: {
    bottom: -12,
    paddingLeft: 5,
  },
});

export default FriendListItem;
