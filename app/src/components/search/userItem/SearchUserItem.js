import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import colors from "../../../../config/colors";
import VerifiedIcon from "../../common/VerifiedIcon";
import RisingStar from "../../common/RisingStar";



export default function SearchUserItem({ item }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("feedProfile", { initialUser: {
          disable_comments: item.disable_comments,
          disable_downloads: item.disable_downloads,
          disable_duos: item.disable_duos,
          disable_ticker: item.disable_ticker,
          id: item._id,
          is_rising: item.is_rising,
          is_special_need: item.is_special_need,
          is_verified: item.is_verified,
          link: item.link,
          photo_thumb_url: item.photo_url,
          username: item.username,
        } })
      }}
    >
      <View style={styles.verifiedRow}>
        {item.username ? (
          <Text>
            <Text
              style={styles.text_dark}
            >
              {item.username}
            </Text>
            <View>{item && item.is_verified === 1 && <VerifiedIcon />}</View>
            {item && item.is_rising === 1 && <RisingStar />}
            
          </Text>
        ) : (
          <Text style={styles.username}>user</Text>
        )}
        <View>
          <Text style={styles.creatorText_dark}>{item.creator_type}</Text>
        </View>
      </View>
      
      

      <View>
        <Image
          style={styles.image}
          source={
             item?.photo_url
              ? { uri: item?.photo_url }
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
  creatorText_dark: {
    color: colors.secondary,
    opacity: 0.7,
    fontSize: 10,
  },
 
});
