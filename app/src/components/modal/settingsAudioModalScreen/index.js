import { View, Text, TouchableOpacity, StyleSheet, Share } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import routes from "../../../navigation/routes";
import colors from "../../../../config/colors";

const SettingsAudioModalScreen = ( props ) => {
  const navigation = useNavigation();
  const handleClosePress = () => props.bottomSheetRef.current.close();

  return (
    <View style={styles.container}>
      <Text style={styles.settingsText}>Audio Settings</Text>
      <TouchableOpacity
        style={styles.fieldItemContainer}
        autoCapitalize="none"
        onPress={() => {
          // navigation.navigate(routes.MARKET)
          handleClosePress();
        }}
      >
        <Text style={styles.text}>
          <MaterialCommunityIcons
            name="bookmark-music"
            size={14}
            color={colors.green}
          /> Add to Favorites</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.fieldItemContainer}
        onPress={() => {
          handleClosePress();
        }}
      >
        <Text style={styles.text}>
          <MaterialCommunityIcons
            name="playlist-music-outline"
            size={16}
            color={colors.green}
          /> Use audio</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.fieldItemContainer}
        onPress={() => {
          handleClosePress();
        }}
      >
        <Text style={styles.text}>
          <MaterialCommunityIcons
            name="music-circle-outline"
            size={16}
            color={colors.green}
          /> Buy music </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.green,
  },
  settingsText: {
    color: colors.green,
    textAlign: "center",
    paddingTop: 10,
  },
  fieldItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    padding: 5,
    marginLeft: 10,
  },
  fieldValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SettingsAudioModalScreen;
