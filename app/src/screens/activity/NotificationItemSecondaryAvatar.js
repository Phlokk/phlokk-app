import FastImage from "react-native-fast-image";
import { Pressable, StyleSheet } from "react-native";


const NotificationItemSecondaryAvatar = ({ image }) => {

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
