import FastImage from "react-native-fast-image";
import { Pressable, StyleSheet, View } from "react-native";
import { useState } from "react";

const NotificationItemSecondaryAvatar = ({ image }) => {
  const [imageIsLoading, setImageIsLoading] = useState(false);

  return (
    <Pressable style={styles.iconRowAvatars}>
      <FastImage
        style={styles.avatarList}
        source={
          
          image ?
          {
          uri: image,
          priority: FastImage.priority.low,
          }
          : require("../../../assets/userImage.png")
      }
        cache={FastImage.cacheControl.web}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  avatarList: {
    height: 30,
    width: 30,
    borderRadius: 50,
  },
  iconRow: {
    flexDirection: "row",
    paddingTop: 5,
  },
  iconRowAvatars: {
    marginRight: 10,
  },
});

export default NotificationItemSecondaryAvatar;
