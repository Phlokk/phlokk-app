import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

import { useTheme } from "../../../theme/context";
import colors from "../../../../config/colors";

export default function LiveChatNav({ title = "Mad Chatter" }) {
  const { theme, setTheme } = useTheme();

  const navigation = useNavigation();
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

      <TouchableOpacity style={styles.button}>
        <MaterialIcons 
        name="settings" 
        size={24} 
        style={theme == "light" ? styles.button_light : styles.button_dark} />
      </TouchableOpacity>
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
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  button_light: {
    color: colors.primary,
  },
  button_dark: {
    color: colors.secondary,
  },
  title_light: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },
  title_dark: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.secondary,
  },
  text: {
    color: colors.white,
  },
  chevron_light: {
    color: colors.black,
  },
  chevron_dark: {
    color: colors.white,
    opacity: 0.6,
  },
});
