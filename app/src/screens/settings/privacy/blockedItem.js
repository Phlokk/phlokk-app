import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import colors from "../../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../services/appStateAtoms";

const BlockedItem = ({ navigation, item }) => {
  const [user, setUser] = useAtom(userAtom);

  return (
    <TouchableOpacity
    // onPress={() => item.associated._id}
    >
      <View style={styles.containerInput}>
        {!user?.photo_url && !user?.photo_url ? (
          <Image
            style={styles.avatar}
            source={require("../../../../assets/userImage.png")}
            cache="only-if-cached"
          />
        ) : (
          <TouchableOpacity>
            <Image style={styles.avatar} source={{ uri: user.photo_url }} />
          </TouchableOpacity>
        )}
        <View style={styles.notificationView}>
          <Text style={styles.blockedUserText}>{item.against_id}</Text>
          <Text style={styles.blockedUserText}>test</Text>
          </View>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  containerInput: {
    paddingLeft: 20,
    flexDirection: "row",
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
