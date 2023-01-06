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
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
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

export default function SettingsScreen() {
  const { theme, setTheme } = useTheme();
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

        <View
          style={theme == "light" ? styles.divider_light : styles.divider_dark}
        ></View>

        <Text
          style={
            theme == "light" ? styles.socialText_light : styles.socialText_dark
          }
        >
          CONTENT & ACTIVITY
        </Text>

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

        <Text
          style={
            theme == "light" ? styles.socialText_light : styles.socialText_dark
          }
        >
          SUPPORT
        </Text>

        <SupportScreen />

        <View
          style={theme == "light" ? styles.divider_light : styles.divider_dark}
        ></View>

        <Text
          style={
            theme == "light" ? styles.socialText_light : styles.socialText_dark
          }
        >
          ABOUT
        </Text>
        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          onPress={() =>
            navigation.navigate(routes.GUIDELINES, {
              title: "Community Guidelines",
            })
          }
        >
          <Text style={theme == "light" ? styles.text_light : styles.text_dark}>
            <AntDesign
              name="exclamationcircleo"
              size={14}
              style={theme == "light" ? styles.icon_light : styles.icon_dark}
            />{" "}
            Community Guidelines
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

        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          onPress={() =>
            navigation.navigate(routes.TERMS, { title: "Terms oF Service" })
          }
        >
          <Text style={theme == "light" ? styles.text_light : styles.text_dark}>
            <Feather
              name="file-text"
              size={14}
              style={theme == "light" ? styles.icon_light : styles.icon_dark}
            />{" "}
            Terms of Service
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

        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          onPress={() =>
            navigation.navigate(routes.PRIVACY, { title: "Privacy Policy" })
          }
        >
          <Text style={theme == "light" ? styles.text_light : styles.text_dark}>
            <Feather
              name="file"
              size={14}
              style={theme == "light" ? styles.icon_light : styles.icon_dark}
            />{" "}
            Privacy Policy
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

        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          onPress={() =>
            navigation.navigate(routes.COPYRIGHT, {
              title: "Copyright Policy",
              field: "link",
            })
          }
        >
          <Text style={theme == "light" ? styles.text_light : styles.text_dark}>
            <FontAwesome5
              name="copyright"
              size={14}
              style={theme == "light" ? styles.icon_light : styles.icon_dark}
            />{" "}
            Copyright Policy
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

        <View style={styles.divider}></View>

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
    padding: 20,
    flex: 1,
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
  divider_light: {
    borderBottomWidth: 0.3,
    borderColor: colors.black,
    marginTop: 10,
    opacity: 0.2,
  },
  divider_dark: {
    borderBottomWidth: 0.3,
    borderColor: colors.white,
    marginTop: 10,
    opacity: 0.2,
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
});
