import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import colors from "../../../../config/colors";

export default function SettingsNavBar({ title = "Settings & privacy" }) {
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
          color={colors.secondary}
        />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity style={styles.button}>
        <MaterialIcons name="power-settings-new" size={24} color="#131313" />
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
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.secondary,
  },
  text: {
    color: colors.black,
  },
});
