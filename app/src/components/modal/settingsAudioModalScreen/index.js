import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../../config/colors";

const SettingsAudioModalScreen = ( props ) => {
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <Text style={styles.settingsText}>Audio Settings</Text>
      <TouchableOpacity
        style={styles.fieldItemContainer}
        autoCapitalize="none"
        onPress={() => {
          // navigation.navigate(routes.MARKET)

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

        }}
      >
        <Text style={styles.text}>
          <MaterialCommunityIcons
            name="music-circle-outline"
            size={16}
            color={colors.green}
          /> Buy song </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: "50%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
