import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../../config/colors";
import RisingStarsNavBar from "../../components/general/profileNavBar/RisingStarsNavBar";
import { ThemeContext } from "../../theme/context";

export default function FoodieScreen() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={theme == "light" ? styles.container_light : styles.container_dark}
    >
      <RisingStarsNavBar title="Rising Stars of Foodies" />
      <Text style={theme == "light" ? styles.text_light : styles.text_dark}>
        Find your favorite rising star foodies on this channel:
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container_light: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container_dark: {
    flex: 1,
    backgroundColor: colors.black,
  },
  text_light: {
    color: colors.black,
    marginTop: 30,
    margin: 20,
    textAlign: "center",
  },
  text_dark: {
    color: colors.white,
    marginTop: 30,
    margin: 20,
    textAlign: "center",
  },
});
