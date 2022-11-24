import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { ThemeContext } from "../../../theme/context";

import colors from "../../../../config/colors";

export default function AccountNavBar({ title = "Manage Account" }) {
  const { theme, setTheme } = useContext(ThemeContext);

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
          name="power-settings-new"
          size={24}
          style={theme == "light" ? styles.power_light : styles.power_dark}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  title_light: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.black,
  },
  title_dark: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.secondary,
  },
  text: {
    color: colors.black,
  },
  power_light: {
    color: colors.white,
  },
  power_dark: {
    color: colors.black,
  },
  chevron_light: {
    color: colors.black,
  },
  chevron_dark: {
    color: colors.white,
    opacity: 0.6,
  },
});
