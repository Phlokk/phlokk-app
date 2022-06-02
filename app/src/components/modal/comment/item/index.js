import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useUser } from "../../../../hooks/useUser";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { generalStyles } from "../../../../styles";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../../../../redux/actions/users";
import colors from "../../../../../config/colors";
import verifiedCheck from "../../../../../assets/verified.png";

const CommentItem = ({ item }) => {
  // const user = useUser(item.creator).data;
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.user);

  // const navigation = useNavigation();
  useEffect(() => {
    dispatch(fetchUserData({}));
  }, [dispatch]);


  return (
    <View style={styles.container}>
      {users &&
        users.map((user, i) =>
          user.photo_url !== null || !undefined ? (
            <Image
              style={styles.avatar}
              key={i}
              source={{ uri: user.photo_url }}
            />
          ) : (
            <Image
              style={styles.avatar}
              source={require("../../../../../assets/userImage.png")}
            />
          )
        )}

      <View style={styles.containerText}>
        <View style={styles.verifiedRow}>
        {users.username !== null || !undefined ? (
          <Text>
            {users &&
              users.map((user, i) => (
                <Text style={styles.username} key={i}>
                  @{user.username}
                </Text>
              ))}
            <View>
              {users[0] && users[0].is_verified === 1 && (
                <Image style={styles.phlokkVerified} source={verifiedCheck} />
              )}
            </View>
          </Text>
        ) : (
          <></>
        )}
      
          <View style={styles.starRow}>
          <MaterialCommunityIcons
          onPress={() => (Alert.alert("Stars", "Coming in beta version 3!"))}
                color="white"
                size={17}
                name={"star" ? "star-outline" : "star"}
              />
              </View>
        </View>
        
        <Text style={styles.textComment}>{item.comment}</Text>
        <View style={styles.replyRow}>
        <Text style={styles.date}>
          {item.creation
            ? new Date(item.creation.seconds * 1000).toISOString().slice(6, 10)
            : "Now"}
        </Text>
        <TouchableOpacity
        onPress={() => (Alert.alert("Replies", "Coming in beta version 3!"))}
        >
        <Text style={styles.textReplies}>Reply</Text>
        </TouchableOpacity>

        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    flexDirection: "row",
    flex: 1,
  },
  containerText: {
    marginHorizontal: 14,
  },
  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
    
  },
  replyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  // starRow:{
  //   // marginHorizontal: 250,
  //   flexDirection: 'row',
  //   alignItems: 'center'
  // },
  username: {
    color: "gray",
    fontSize: 11,
  },
  textComment: {
    color: colors.white,
    paddingRight: 20,
    fontSize: 12,
  },
  textReplies: {
    color: colors.secondary,
    paddingRight: 20,
    fontSize: 10,
    marginHorizontal: 5,
  },
  date: {
    color: colors.secondary,
    fontSize: 10,
    
  },
  verifiedBadge: {
    width: 10,
    height: 10,
    top: 1,
    marginHorizontal: 3,
  },
});

export default CommentItem;
