import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'; 
// import { LOGOUT } from "@env";
import routes from "../../../navigation/routes";
import colors from "../../../../config/colors";
import CustomAlert from "../../../components/Alerts/customAlert";

export default function AccountScreen() {
  const auth = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [blocking, setBlocking] = useState(false);
  const [security, setSecurity] = useState(false);



  return (
    <View>
        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          onPress={() =>
            navigation.navigate(routes.MANAGE_ACCOUNT, {
              title: "Manage Account",
            })
          }
        >
          <Text style={styles.text}>
            <Feather name="user" size={12} color={colors.secondary} /> Manage Account
          </Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={28} color={colors.white} />
          </View>
        </TouchableOpacity>

        <CustomAlert
        customAlertMessage={<Text>Security{"\n"}coming in official release</Text>}
        positiveBtn="Ok"
        modalVisible={security}
        dismissAlert={setSecurity}
        animationType="fade"
      />
        <TouchableOpacity
         onPress={() =>setSecurity(true)}
          style={styles.fieldItemContainer}
          autoCapitalize="none"
        >
          <Text style={styles.text}>
            <Ionicons name="md-shield-checkmark-outline" size={12} color={colors.secondary} /> Security</Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={28} color={colors.white} />
          </View>
        </TouchableOpacity>

        <CustomAlert
        customAlertMessage={<Text>Privacy{"\n"}coming in beta 2</Text>}
        positiveBtn="Ok"
        modalVisible={blocking}
        dismissAlert={setBlocking}
        animationType="fade"
      />
        <TouchableOpacity
         onPress={() =>setBlocking(true)}
          style={styles.fieldItemContainer}
          autoCapitalize="none"
        >
          <Text style={styles.text}>
            <MaterialIcons name="lock-outline" size={12} color={colors.secondary} /> Privacy</Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={28} color={colors.white} />
          </View>
        </TouchableOpacity>
    </View>
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
    color: colors.secondary,
    fontSize: 12,
  },
  versionText: {
    color: colors.secondary,
    textAlign: "center",
    fontSize: 10,
    paddingTop: 200,
  },
  authText: {
    color: colors.secondary,
  },
  socialText: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 8,
    marginTop: 20,
  },
});
