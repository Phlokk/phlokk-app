import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../../theme/context";
import colors from "../../../../config/colors";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useState } from "react";
import SettingsModal from "./RoomSettings";

export default function LiveChatNav({
  parties,
  setParties,
  title = "Mad Chatter Parties",
}) {
  const { theme, setTheme } = useTheme();

  const navigation = useNavigation();
  const Drawer = createDrawerNavigator();
  const [viewSettings, setViewSetttings] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons
          name="keyboard-arrow-left"
          size={28}
          style={theme == "light" ? styles.chevron_light : styles.chevron_dark}
        />
      </TouchableOpacity>

      <Text style={theme == "light" ? styles.title_light : styles.title_dark}>
        {title}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setViewSetttings(true)}
      >
        <MaterialIcons
          name="add"
          size={24}
          style={theme == "light" ? styles.button_light : styles.button_dark}
        />
      </TouchableOpacity>
      <SettingsModal
        open={viewSettings}
        onClose={() => setViewSetttings(false)}
        parties={parties}
        setParties={setParties}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
  },
  button_light: {
    color: colors.white,
  },
  button_dark: {
    color: colors.secondary,
  },
  title_light: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Waterfall-Regular",
    color: colors.green,
  },
  title_dark: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Waterfall-Regular",
    color: colors.green,
  },
  text: {
    color: colors.white,
  },
  chevron_light: {
    color: colors.secondary,
  },
  chevron_dark: {
    color: colors.white,
    opacity: 0.6,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
