import React from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { openSettingsModal } from "../../../redux/actions/modal";

import colors from "../../../../config/colors"

export default function DisplayMenuScreen() {
  const dispatch = useDispatch();



  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.itemContainer}>
          <MaterialIcons name="cloud-upload" size={24} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer}
         onPress={() => (Alert.alert("Star videos", "Coming in beta version 2!"))}
        >
          <AntDesign name="star" size={24} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer}
        onPress={() => (Alert.alert("Favorite videos", "Coming in beta version 2!"))}
        >
          <MaterialIcons name="bookmark" size={24} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer}
        onPress={() => (Alert.alert("Private videos", "Coming in beta version 2!"))}
        >
          <FontAwesome name="lock" size={24} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer}>
          <MaterialIcons
            name="admin-panel-settings"
            size={24}
            color={colors.white}
            onPress={() => dispatch(openSettingsModal(true))}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      paddingHorizontal: 0,
      paddingVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
  },
  text: {
      color: colors.white,
  },
  itemContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
  },
  menuContainer: {
      paddingBottom: 5,
      flexDirection: 'row',
  },
  

});
