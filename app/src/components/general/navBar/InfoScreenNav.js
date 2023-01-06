import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../../theme/context";

import colors from "../../../../config/colors";

export default function InfoScreenNav({
  title = "Edit profile",
  leftButton = { display: false },
}) {
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

      <TouchableOpacity
        style={styles.button}
        onPress={() => (leftButton.display ? leftButton.action() : null)}
      >
        <AntDesign
          name="checkcircleo"
          size={21}
          color={leftButton.display ? colors.green : colors.primary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.2, 
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
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
  chevron_light: {
    color: colors.black,
  },
  chevron_dark: {
    color: colors.secondary,
    opacity: 0.6,
  },
});
