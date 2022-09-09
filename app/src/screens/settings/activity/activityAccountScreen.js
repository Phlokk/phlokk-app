import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import SettingsNavBar from "../../../components/general/settings";
import colors from "../../../../config/colors";
import { Linking } from 'react-native';
// import {enableNotificationsForDevice, sendTestPushNotification} from "../../../services/notifications";

export default function ActivityAccountScreen() {
  const auth = useSelector((state) => state.auth);
  const [user, setUser] = useState("");


  // const enableNotifications = async function () {
  //   await enableNotificationsForDevice();
  // }

  return (
    <SafeAreaView style={styles.container}>
      <SettingsNavBar title="Notifications"/>
      <ScrollView style={styles.fieldsContainer}>

        <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
            onPress={() => Linking.openSettings()}
        >
          <Text style={styles.text}>
          Push Notifications
          </Text>
          <View style={styles.fieldValueContainer}>
            <Feather style={styles.chevron} name="chevron-right" size={20} color={colors.secondary} />
          </View>
        </TouchableOpacity>

        <View style={styles.divider}></View>
      </ScrollView>   
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
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
  text: {
    color: colors.white,
    fontSize: 12,
  },
  socialText: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 8,
    marginTop: 20,
    opacity: 0.3
  },
  divider: {
    borderBottomWidth: 0.3,
    borderColor: colors.secondary,
    marginTop: 10,
    opacity: 0.2,
  },
  chevron: {
    opacity: 0.6
  }
});
