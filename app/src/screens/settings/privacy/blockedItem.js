import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import colors from "../../../../config/colors";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/core";
import { unblockUserById } from "../../../services/user";
const BlockedItem = ({ item, setBlockedList }) => {
  const navigation = useNavigation();
  const unblockUser = async() => {
    const user = JSON.parse(await SecureStore.getItemAsync("user"))
    const response = await unblockUserById(user._id, (item?.user?.id ?? item?.user?._id));
    setBlockedList(e=> e.filter((k)=> k.user.id !== item.user.id));
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("feedProfile", { initialUser: {
            blocked: true,
            ...item.user
          } })
        }}
    >
      <View style={styles.containerInput}>
        {!item?.user?.photo_thumb_url ? (
          <Image
            style={styles.avatar}
            source={require("../../../../assets/userImage.png")}
            cache="only-if-cached"
          />
        ) : (
          <TouchableOpacity>
            <Image style={styles.avatar} source={{ uri: item?.user?.photo_thumb_url }} />
          </TouchableOpacity>
        )}
        <View style={styles.notificationView}>
          <Text style={styles.blockedUserText}>{item.user?.username}</Text>
          </View>
        </View>
    </TouchableOpacity>
    <TouchableOpacity
            onPress={unblockUser}
            style={styles.followingView}
          >
            <Text style={styles.followBtn}>Unblock</Text>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"space-between"
  },
  followingView: {
    position: "absolute",
    right: 0,
    left: 280,
    top: 10,
    bottom: 0, 
  }, 
  followBtn: {
    fontSize: 10,
    color: colors.red,
    textAlign: "center",
    padding: 4,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.red,
  },
  containerInput: {
    paddingLeft: 20,
    flexDirection: "row",
    alignItems:"center"
  },
  mentionsView: {
    flexDirection: "row",
  },
  notificationView: {
    flex: 1,
    // backgroundColor: "red",
    paddingLeft: 10,
    marginRight: 20,
  },
  text: {
    color: colors.white,
  },
  blockedUserText: {
    color: colors.white,
  },
  mentionsText: {
    fontSize: 10,
    marginTop: 5,
    color: colors.green,
  },
  date: {
    fontSize: 10,
    marginTop: 5,
    color: colors.secondary,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "lightgray",
  },
});

export default BlockedItem;
