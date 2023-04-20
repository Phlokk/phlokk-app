import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../theme/context";
import colors from "../../../../config/colors";
import ChatSettingsModalScreen from "../../modal/LiveChatModalScreen/ChatSettingsModalScreen";

export default function LiveChatRoomNav({ title }) {
  const { theme, setTheme } = useTheme();
  const [openChatSettingsModal, setOpenChatSettingsModal] = useState(false);

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
      <Ionicons
            name="ellipsis-horizontal-sharp"
            size={20}
            style={[theme == "light" ? styles.toggle_light : styles.toggle_dark, styles.infoIcon]}
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
    paddingTop: 20,
  },
  button: {
    flexDirection: "row",
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
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Waterfall-Regular",
    color: colors.green,
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
  toggle_light: {
    color: colors.black,
  },
  toggle_dark: {
    color: colors.white,
  },
  infoIcon: {
    marginRight: 10,
  }
});
