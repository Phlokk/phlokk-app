import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";


import { FontAwesome5 } from '@expo/vector-icons'; 
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Animated } from "react-native";
import useRotation from "./useRotation";
import pmdLogo from "../../../../../assets/pmd_logo_green.png";
import colors from "../../../../../config/colors";
import VerifiedIcon from "../../../common/VerifiedIcon";
import * as Linking from "expo-linking";
import TextTicker from "react-native-text-ticker";
import RisingStar from "../../../common/RisingStar";



const DEFAULT_DESC_DISPLAY_LINES = 2;

function UserProfileOverlay({ post, user, currentUser, areTabsShowing }) {
  const navigation = useNavigation();
  const username = user.username;

  const [descriptionDisplayLines, setDescriptionDisplayLines] = useState(
    DEFAULT_DESC_DISPLAY_LINES
  );
  const userLink = user.link;
  const rotate = useRotation();
  const animatedStyle = { transform: [{ rotate }] };
  const isFocused = useIsFocused();

  const tickerText = "official phlokk audio @" + username;

  return (
    <View
      style={[styles.bottomContainer, areTabsShowing && { paddingBottom: 30 }]}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <View style={styles.avatarContainer}>
          <TouchableOpacity
            disabled={currentUser._id == post.user._id}
            onPress={() => {
              navigation.navigate("feedProfile", {
                initialUser: user,
              });
            }}
          >
            {!user?.photo_thumb_url && !user?.photo_thumb_url ? (
              <Image
                style={styles.avatar}
                source={require("../../../../../assets/userImage.png")}
                cache="only-if-cached"
              />
            ) : (
              <Image
                style={styles.avatar}
                source={{ uri: user.photo_thumb_url }}
              />
            )}
          </TouchableOpacity>

        </View>
       

        <View style={styles.linkView}>
          {user.link !== null ? (
            <TouchableOpacity
              style={styles.linkIconRow}
              onPress={
                user && user.link ? () => Linking.openURL(user.link) : null
              }
            >
              <FontAwesome5
                name="globe"
                size={16}
                color={colors.green}
              />
              <Text style={styles.linkText}> Visit site</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <View style={styles.usernameRow} pointerEvents="box-none">
          <Text style={styles.username} key={user._id}>
            @{user.username}
          </Text>
          <View style={{ paddingTop: 2, top: 2 }}>
            {user.is_verified === 1 && <VerifiedIcon />}
            {user.is_rising === 1 && <RisingStar />}
          </View>
          
        </View>

        <Text
          numberOfLines={descriptionDisplayLines}
          style={styles.description}
          key={user}
          onPress={() => {
            if (descriptionDisplayLines > DEFAULT_DESC_DISPLAY_LINES) {
              setDescriptionDisplayLines(DEFAULT_DESC_DISPLAY_LINES);
            } else {
              setDescriptionDisplayLines(5);
            }
          }}
        >
          {post.description}
        </Text>

        <View style={styles.songRow}>
          <Entypo
            style={styles.note}
            name="beamed-note"
            size={15}
            color="white"
          />
          <TextTicker style={styles.songName} duration={8000} loop={true}>
            {tickerText}
          </TextTicker>

          <View style={styles.animatedlogo}>
            <Animated.Image
              style={[styles.songImage, isFocused && animatedStyle]}
              source={pmdLogo}
            />
            
          </View>
        </View>
      </View>
    </View>
  );
}

export default UserProfileOverlay;

const styles = StyleSheet.create({
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    padding: 10,
    paddingBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginRight: 45,
  },
  username: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 10,
  },
  description: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "300",
    marginBottom: 10,
    marginRight: 10,
  },
  seeMoreText: {
    color: colors.secondary,
    fontSize: 13,
    fontWeight: "300",
  },
  songRow: {
    flexDirection: "row",
    alignItems: "center",
    width: 150,
  },
  songName: {
    color: colors.white,
    fontSize: 12,
    marginLeft: 5,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.white,
    marginBottom: 10,
  },
  avatarContainer: {
    width: "20%",
  },
  songImage: {
    height: 32,
    width: 32,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.secondary,
    marginBottom: 10,
    marginLeft: 10,
  },
  verifiedContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  phlokkVerified: {
    width: 12,
    height: 12,
    top: 4,
    marginHorizontal: 3,
  },
  usernameRow: {
    flexDirection: "row",
  },
  animatedlogo: {
    marginLeft: 5,
  },
  displayLines: {
    color: colors.white,
  },
  note: {
    marginRight: 5,
  },
  linkView: {
    flexDirection: "row",
    // backgroundColor: colors.modals,
    borderRadius: 7,
    padding: 5,
    // opacity: 0.4,
  },
  linkText: {
    color: colors.white,
  },
  linkIconRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
    paddingRight: 4,
    borderRadius: 5,
    backgroundColor: 'rgba(125, 125, 125, 0.5)',
    marginBottom: 5,
    right: 7,
    
   
  },
});
