import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import SettingsNavBar from "../../../components/general/settings/SettingsNavBar";
import colors from "../../../../config/colors";
import { Linking } from "react-native";
import * as SecureStore from "expo-secure-store";
import {
  enableNotificationsForDevice,
  disableNotificationsForDevice,
  sendTestPushNotification,
} from "../../../services/notifications";
import { ThemeContext } from "../../../theme/context";

export default function ActivityAccountScreen() {
  const { theme, setTheme } = useContext(ThemeContext);

  const auth = useSelector((state) => state.auth);
  const [user, setUser] = useState("");

  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  const loadNotificationState = async function () {
    let user = JSON.parse(await SecureStore.getItemAsync("user"));
    setIsNotificationsEnabled(user.notificationsForDeviceEnabled);
  };

  const toggleNotifications = async function () {
    if (!isNotificationsEnabled) {
      await enableNotificationsForDevice();
      await loadNotificationState();
    } else {
      await disableNotificationsForDevice();
      Alert.alert("Disable notifications coming in Beta 3");
    }
  };

  const testPushNotification = async function () {
    await sendTestPushNotification()
      .then(() => {
        Alert.alert(
          "A push notification has been sent to your device. If you did not receive the notification please check your device settings."
        );
      })
      .catch((error) => {
        Alert.alert(
          "Unable to send push notification. Please check your device settings."
        );
      });
  };

  loadNotificationState();

  return (
    <SafeAreaView
      style={theme == "light" ? styles.container_light : styles.container_dark}
    >
      <SettingsNavBar title="Notifications" />
      <ScrollView style={styles.fieldsContainer}>
        <View
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          // onPress={toggleNotifications}
          // This setting is used for turning on and off notifications in the actual Phlokk app
          // onPress={() => Linking.openSettings()}
        >
          <Text style={theme == "light" ? styles.text_light : styles.text_dark}>
            Push Notifications
          </Text>
          <View style={styles.fieldValueContainer}>
            <Switch
              style={styles.switch}
              trackColor={{ false: "grey", true: colors.green }}
              thumbColor={{ false: "f4f3f4", true: "f4f3f4" }}
              onValueChange={toggleNotifications}
              value={isNotificationsEnabled}
            />
          </View>
        </View>
        {isNotificationsEnabled && (
          <>
            <View
              style={
                theme == "light" ? styles.divider_light : styles.divider_dark
              }
            ></View>
            <View
              style={styles.fieldItemContainer}
              autoCapitalize="none"
              onPress={testPushNotification}
              // This setting is used for turning on and off notifications in the actual Phlokk app
              // onPress={() => Linking.openSettings()}
            >
              <TouchableOpacity>
                <Text style={theme == "light" ? styles.text_light : styles.text_dark}>Send Test Notification</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => Linking.openSettings()}
              style={styles.fieldItemContainer}
            >
              <Text style={theme == "light" ? styles.text_light : styles.text_dark}>Open Device Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openSettings()}
              style={styles.fieldItemContainer}
            >
              <Text style={theme == "light" ? styles.text_light : styles.text_dark}>View Enrolled Devices</Text>
            </TouchableOpacity>
          </>
        )}
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
    marginTop: 20,
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
  socialText: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 8,
    marginTop: 20,
    opacity: 0.3,
  },
  divider_light: {
    borderBottomWidth: 0.3,
    borderColor: colors.black,
    marginTop: 10,
    opacity: 0.2,
  },
  divider_dark: {
    borderBottomWidth: 0.3,
    borderColor: colors.secondary,
    marginTop: 10,
    opacity: 0.2,
  },
  chevron: {
    opacity: 0.6,
  },
});
