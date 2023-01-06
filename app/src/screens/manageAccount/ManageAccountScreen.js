import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useContext } from "react";
import AccountNavBar from "../../components/general/manageAccount/AccountNavBar";
import colors from "../../../config/colors";
import AccountControl from "./AccountControl";
import { useTheme } from "../../theme/context";

export default function ManageAccountScreen() {
  const { theme, setTheme } = useTheme();

  return (
    <SafeAreaView
      style={theme == "light" ? styles.container_light : styles.container_dark}
    >
      <AccountNavBar />
      <AccountControl />
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
    backgroundColor: colors.primary,
  },
});
