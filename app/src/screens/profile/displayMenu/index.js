import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { openSettingsModal } from "../../../redux/actions/modal";
import CustomAlert from "../../../components/Alerts/customAlert";

import colors from "../../../../config/colors";

export default function DisplayMenuScreen() {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <CustomAlert
          alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
          customAlertMessage={<Text>Star videos{"\n"}coming in beta version 2</Text>}
          positiveBtn="Ok"
          modalVisible={isVisible}
          dismissAlert={setIsVisible}
          animationType="fade"
        />
        <TouchableOpacity style={styles.itemContainer}>
          <MaterialIcons name="cloud-upload" size={24} color={colors.green} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => setIsVisible(true)}
        >
          <AntDesign name="star" size={24} color={colors.green} />
        </TouchableOpacity>
        <CustomAlert
          alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
          customAlertMessage={<Text>Favorite videos{"\n"}coming in beta version 2</Text>}
          positiveBtn="Ok"
          modalVisible={isBookmark}
          dismissAlert={setIsBookmark}
          animationType="fade"
        />
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => setIsBookmark(true)}
        >
          <MaterialIcons name="bookmark" size={24} color={colors.green} />
        </TouchableOpacity>
        <CustomAlert
          alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
          customAlertMessage={<Text>Private videos{"\n"}coming in beta version 2</Text>}
          positiveBtn="Ok"
          modalVisible={isPrivate}
          dismissAlert={setIsPrivate}
          animationType="fade"
        />
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => setIsPrivate(true)}
        >
          <FontAwesome name="lock" size={24} color={colors.green} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer}>
          <MaterialIcons
            name="admin-panel-settings"
            size={24}
            color={colors.green}
            onPress={() => dispatch(openSettingsModal(true))}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 0,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.white,
  },
  itemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuContainer: {
    paddingBottom: 5,
    flexDirection: "row",
  },
});
