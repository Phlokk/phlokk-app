import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import VerifiedIcon from "../../components/common/VerifiedIcon";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../config/colors";
import axios from "../../redux/apis/axiosDeclaration";
import RisingStar from "../../components/common/RisingStar";

const FriendListItem = ({ item }) => {
  const navigation = useNavigation();
  const [isFriends, setIsFriends] = useState(item.is_friend);
  const toggleIsFriend = async function () {
    await axios.post(
      "/api/creator/" + item._id + "/" + (!isFriends ? "unfriend" : "friend")
    ),
      {};
    setIsFriends(!isFriends);
  };

  return (
    <View style={styles.item}>
      <View>
        <TouchableOpacity>
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
