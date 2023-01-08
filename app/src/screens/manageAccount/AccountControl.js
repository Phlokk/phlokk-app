import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../config/colors";
import AccountInformation from "./AccountInformation";
import CustomAlert from "../../components/Alerts/CustomAlert";
import { useTheme } from "../../theme/context";

const AccountControl = () => {
  const { theme, setTheme } = useTheme();

  const [businessAccount, setBusinessAccount] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  const navigation = useNavigation();
  return (
    <View style={styles.fieldsContainer}>
      <AccountInformation />

      <View
        style={theme == "light" ? styles.divider_light : styles.divider_dark}
      ></View>
      <Text
        style={
          theme == "light" ? styles.socialText_light : styles.socialText_dark
        }
      >
        ACCOUNT CONTROL
      </Text>
      <CustomAlert
        customAlertMessage={
          <Text>Business & Analytics{"\n"}coming soon!</Text>
        }
        positiveBtn="Ok"
        modalVisible={businessAccount}
        dismissAlert={setBusinessAccount}
        animationType="fade"
      />
      <TouchableOpacity
        style={styles.fieldItemContainer}
        onPress={() => setBusinessAccount(true)}
      >
        <Text style={theme == "light" ? styles.text_light : styles.text_dark}>
          Switch to Business Account
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
      <CustomAlert
        customAlertMessage={
          <Text>Delete account{"\n"}coming in official release</Text>
        }
        positiveBtn="Ok"
        modalVisible={deleteAccount}
        dismissAlert={setDeleteAccount}
        animationType="fade"
      />
      <TouchableOpacity
        style={styles.fieldItemContainer}
        onPress={() => setDeleteAccount(true)}
        // onPress={() =>
        //   navigation.navigate(routes.DELETE_PROFILE, {
        //     title: "Delete account",
        //   })
        // }
      >
        <Text style={theme == "light" ? styles.text_light : styles.text_dark}>
          Delete account
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
  );
};

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
  text_light: {
    color: colors.black,
    fontSize: 12,
  },
  text_dark: {
    color: colors.white,
    fontSize: 12,
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
    borderColor: colors.secondary,
    marginTop: 10,
    opacity: 0.2,
  },
  chevron_light: {
    color: colors.black,
  },
  chevron_dark: {
    opacity: 0.6,
  },
});

export default AccountControl;
