import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import VerifiedIcon from "../../components/common/VerifiedIcon";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../config/colors";
import axios from "../../redux/apis/axiosDeclaration";
import { useAtom } from "jotai";
import { userAtom } from "../../services/appStateAtoms";
import * as SecureStore from "expo-secure-store";
import RisingStar from "../../components/common/RisingStar";
const FollowingListItem = ({ item, followersList, setLoggedInUserFollowingList }) => {

  const navigation = useNavigation();
  const [currentUser] = useAtom(userAtom);
  const [isFollowing, setIsFollowing] = useState(item.is_following);
  const IsUserFollowing = (list= []) => {
		let id =  item.user._id;
		if (list?.includes(id)) return true;
	
		return false;
	};
  useEffect(() => {
    setIsFollowing(IsUserFollowing(followersList))
  }, [])
  

  const addUserToFollowingList = async (userId) => {
    let newList = [...followersList, userId];
    setLoggedInUserFollowingList(newList);
    setIsFollowing(IsUserFollowing(newList))
    await handlesSaveFollowingList([...newList]);
  };
  const removeUserToFollowingList = async (userId) => {
    let newList = followersList.filter((e) => e !== userId);
    setLoggedInUserFollowingList(newList);
    setIsFollowing(false);
    await handlesSaveFollowingList(newList);
  };
  const followUser = async function ( userId = item.user._id ) {
  try{
    if (isFollowing) {
      await axios.delete(`/api/creators/unfollow/${currentUser._id}/${userId}`),
        {};
      await removeUserToFollowingList(userId);
    } else {
      await axios.post(`/api/creators/follow/${currentUser._id}/${userId}`), {};
      await addUserToFollowingList(userId);
    }
  } catch {}
 
  };
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
      <View style={styles.followingInfoRow}>
        <TouchableOpacity
         onPress={() => {
          navigation.navigate("feedProfile", {
            initialUser: item.user,
          });
         }}
         >
          <Text
            style={styles.itemInfo}
          >
            {item?.user.username}
            {item?.user.is_verified && (
              <View style={styles.logoRow}>
                <VerifiedIcon />
              </View>
            )}
            {item.user.is_rising === 1 && <RisingStar />}
          </Text>
          <Text style={styles.creatorTypeText}> {item.user.creator_type}</Text>
        </TouchableOpacity>
        {isFollowing ? (
          <TouchableOpacity
            onPress={()=>followUser()}
            style={styles.followingView}
          >
            <Text style={styles.followingBtn}>Following</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={()=>followUser()}
            style={styles.followingView}
          >
            <Text style={styles.followBtn}>Follow</Text>
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
    left: 240,
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
    top: 6,
    paddingLeft: 8,
  },
  followingBtn: {
    fontSize: 10,
    color: colors.green,
    textAlign: "center",
    padding: 4,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.green,
    backgroundColor: colors.grey,
  },
  followBtn: {
    fontSize: 10,
    color: colors.white,
    textAlign: "center",
    padding: 4,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.green,
    backgroundColor: colors.grey,
  },
});

export default FollowingListItem;
