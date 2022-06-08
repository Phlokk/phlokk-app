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
  const navigation = useNavigation();
  return (
    <View style={styles.fieldsContainer}>
      <AccountInformation />

      <View style={styles.divider}></View>
      <Text style={styles.socialText}>Account control</Text>
      <CustomAlert
        alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
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
          <Feather name="chevron-right" size={28} color={colors.white} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.fieldItemContainer}
        onPress={() =>
          navigation.navigate(routes.DELETE_PROFILE, {
            title: "Delete account",
          })
        }
      >
        <Text style={styles.text}>Delete account</Text>
        <View style={styles.fieldValueContainer}>
          <Feather name="chevron-right" size={28} color={colors.white} />
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
    color: colors.green,
    fontSize: 12,
  },
  socialText: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 10,
    marginTop: 20,
  },
  divider: {
    borderBottomWidth: 0.3,
    borderColor: colors.secondary,
    marginTop: 10,
  },
});

export default AccountControl;
