import React from "react";
import { View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "../../../../../config/colors";

function AddFriendBtn() {
  return (
    <View style={styles.circleView}>
      <View style={styles.iconView}>
        <Entypo name="circle-with-plus" size={28} color={colors.green} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconView: {
    top: -2,
    right: 1.3,
  },
  circleView: {
    width: 25,
    height: 25,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AddFriendBtn;
