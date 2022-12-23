import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import routes from "../../../navigation/routes";
import colors from "../../../../config/colors";
import { ThemeContext } from "../../../theme/context";

export default function PostNavBar(props) {
  const { theme, setTheme } = useContext(ThemeContext);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={30}
          style={theme == "light" ? styles.chevron_light : styles.chevron_dark}
          onPress={() => navigation.goBack()}
        />
      </TouchableOpacity>

      <Text style={theme == "light" ? styles.title_light : styles.title_dark}>
        {props.title}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(routes.FEED)}
      >
        <Feather
          name="x"
          size={24}
          style={theme == "light" ? styles.x_light : styles.x_dark}
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
    padding: 10,
    top: 5,
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
    color: colors.white,
  },
  cancelText: {
    color: colors.white,
    fontSize: 10,
  },
  x_light: {
    color: colors.secondary,
  },
  x_dark: {
    color: colors.white,
  },
  chevron_light: {
    color: colors.secondary,
  },
  chevron_dark: {
    color: colors.white,
  },
});
