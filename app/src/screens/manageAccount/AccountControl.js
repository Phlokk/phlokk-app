import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../config/colors";
import AccountInformation from "./AccountInformation";
import CustomAlert from "../../components/Alerts/CustomAlert";
import { useTheme } from "../../theme/context";
import routes from "../../navigation/routes";
const AccountControl = () => {
  const { theme } = useTheme();

  const [businessAccount, setBusinessAccount] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  const navigation = useNavigation();
  return (
    <View style={styles.fieldsContainer}>
      <AccountInformation />
      <Text
        style={
          theme == "light" ? styles.socialText_light : styles.socialText_dark
        }
      >
        ACCOUNT CONTROL
      </Text>
      <View style={ theme == "light" ? styles.blockColorContainer_light : styles.blockColorContainer_dark}>
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

        <TouchableOpacity
          style={styles.fieldItemContainer}
          // onPress={() => setDeleteAccount(true)}
          onPress={() =>
            navigation.navigate(routes.DELETE_PROFILE, {
              title: "Delete account",
            })
          }
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
      <CustomAlert
        customAlertMessage={<Text>Business & Analytics{"\n"}coming soon!</Text>}
        positiveBtn="Ok"
        modalVisible={businessAccount}
        dismissAlert={setBusinessAccount}
        animationType="fade"
      />
      <CustomAlert
        customAlertMessage={
          <Text>Delete account{"\n"}coming in official release</Text>
        }
        positiveBtn="Ok"
        modalVisible={deleteAccount}
        dismissAlert={setDeleteAccount}
        animationType="fade"
      />
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
    paddingHorizontal:5,
    color: colors.black,
    fontSize: 12,
  },
  text_dark: {
    paddingHorizontal:5,
    color: colors.white,
    fontSize: 12,
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
    paddingHorizontal:10,
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

export default AccountControl;
