import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import AccountNavBar from "../../components/general/manageAccount";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import routes from "../../navigation/routes";
import colors from "../../../config/colors";
import AccountInformation from "./accountInformation";
import CustomAlert from "../../components/Alerts/customAlert"

const AccountControl = () => {
  const [businessAccount, setBusinessAccount] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  const navigation = useNavigation();
  return (
    <View style={styles.fieldsContainer}>
      <AccountInformation />

      <View style={styles.divider}></View>
      <Text style={styles.socialText}>ACCOUNT CONTROL</Text>
      <CustomAlert
        customAlertMessage={<Text>Business & Analytics{"\n"}coming in official release</Text>}
        positiveBtn="Ok"
        modalVisible={businessAccount}
        dismissAlert={setBusinessAccount}
        animationType="fade"
      />
      <TouchableOpacity
        style={styles.fieldItemContainer}
        onPress={() => setBusinessAccount(true)}
      >
        <Text style={styles.text}>Switch to Business Account</Text>
        <View style={styles.fieldValueContainer}>
          <Feather style={styles.chevron} name="chevron-right" size={20} color={colors.secondary} />
        </View>
      </TouchableOpacity>
      <CustomAlert
        customAlertMessage={<Text>Delete account{"\n"}coming in official release</Text>}
        positiveBtn="Ok"
        modalVisible={deleteAccount}
        dismissAlert={setDeleteAccount}
        animationType="fade"
      />
      <TouchableOpacity
        style={styles.fieldItemContainer}
        onPress={() =>setDeleteAccount(true)}
        // onPress={() =>
        //   navigation.navigate(routes.DELETE_PROFILE, {
        //     title: "Delete account",
        //   })
        // }
      >
        <Text style={styles.text}>Delete account</Text>
        <View style={styles.fieldValueContainer}>
          <Feather style={styles.chevron} name="chevron-right" size={20} color={colors.secondary} />
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
  text: {
    color: colors.white,
    fontSize: 12,
  },
  socialText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 8,
    marginTop: 20,
    opacity: 0.5
  },
  divider: {
    borderBottomWidth: 0.3,
    borderColor: colors.secondary,
    marginTop: 10,
    opacity: 0.2,
  },
  chevron:{
    opacity: 0.6,

  },
});

export default AccountControl;
