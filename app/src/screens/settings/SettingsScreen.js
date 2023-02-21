import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SettingsNavBar from "../../components/general/settings/SettingsNavBar";

// import { LOGOUT } from "@env";
import routes from "../../navigation/routes";
import colors from "../../../config/colors";
import AccountScreen from "./account/AccountScreen";
import SupportScreen from "./support/SupportScreen";
import { enableNotificationsForDevice } from "../../services/notifications";
import Constants from "expo-constants";
import { useTheme } from "../../theme/context";
import AboutScreen from "./about/AboutScreen";

export default function SettingsScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [user, setUser] = useState("");

  const enableNotifications = async function () {
    await enableNotificationsForDevice();
  };

  return (
    <SafeAreaView
      style={theme == "light" ? styles.container_light : styles.container_dark}
    >
      <SettingsNavBar />
      <ScrollView style={styles.fieldsContainer}>
        <Text
          style={
            theme == "light" ? styles.socialText_light : styles.socialText_dark
          }
        >
          ACCOUNT
        </Text>
        <AccountScreen />

        <Text
          style={
            theme == "light" ? styles.socialText_light : styles.socialText_dark
          }
        >
          CONTENT & ACTIVITY
        </Text>
        <View style={ theme == "light" ? styles.blockColorContainer_light : styles.blockColorContainer_dark}>
        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          onPress={() => navigation.navigate(routes.ACTIVITY_SCREEN)}
        >
          <Text style={theme == "light" ? styles.text_light : styles.text_dark}>
            <Feather
              name="bell"
              size={14}
              style={theme == "light" ? styles.icon_light : styles.icon_dark}
            />{" "}
            Push Notifications
          </Text>
          <View style={styles.fieldValueContainer}>
            <Feather
              style={
                theme == "light" ? styles.chevron_light : styles.chevron_dark
              }
              name="chevron-right"
              size={20}
              color={colors.secondary}
            />
          </View>
        </TouchableOpacity>
        </View>

        <Text
          style={
            theme == "light" ? styles.socialText_light : styles.socialText_dark
          }
        >
          SUPPORT
        </Text>

        <SupportScreen />

         <AboutScreen />

        <Text
          style={
            theme == "light"
              ? styles.versionText_light
              : styles.versionText_dark
          }
        >
          v{Constants.nativeApplicationVersion}-{Constants.nativeBuildVersion}
        </Text>
      </ScrollView>
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
  fieldsContainer: {
    marginTop: 20,
  },
  fieldItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
  },
  fieldValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text_light: {
    color: colors.black,
    fontSize: 12,
  },
  text_dark: {
    color: colors.white,
    fontSize: 12,
  },
  versionText_light: {
    color: colors.black,
    textAlign: "center",
    fontSize: 10,
    marginTop: 50,
  },
  versionText_dark: {
    color: colors.secondary,
    textAlign: "center",
    fontSize: 10,
    marginTop: 50,
  },
  authText: {
    color: colors.white,
  },
  socialText_light: {
    color: colors.black,
    paddingHorizontal:10,
    fontWeight: "bold",
    fontSize: 8,
    marginTop: 20,
    opacity: 0.5,
  },
  socialText_dark: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 8,
    marginTop: 20,
    opacity: 0.5,
  },
  chevron_light: {
    color: colors.black,
  },
  chevron_dark: {
    opacity: 0.6,
  },
  icon_light: {
    color: colors.black,
  },
  icon_dark: {
    color: colors.white,
  },
  blockColorContainer_light: {
    backgroundColor: colors.secondaryLight,
    borderRadius: 2,
    marginTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 5,
  },
  blockColorContainer_dark: {
    backgroundColor: colors.settingsBlack,
    borderRadius: 2,
    marginTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 5,
  },
});
