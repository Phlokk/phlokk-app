import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import SettingsNavBar from "../../components/general/settings";
import * as SecureStore from "expo-secure-store";
// import DeviceInfo from 'react-native-device-info';
import axios from "../../redux/apis/axiosDeclaration";
import { types } from "../../redux/constants";

// import { LOGOUT } from "@env";
import routes from "../../navigation/routes";
import colors from "../../../config/colors";
import AccountScreen from "./account/account";
import SupportScreen from "./support/support";

export default function SettingsScreen() {
  const auth = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [blocking, setBlocking] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    axios
      .post("/api/logout")
      .then((response) => {
        setUser(null);
        SecureStore.deleteItemAsync("user");
        dispatch({
          type: types.USER_STATE_CHANGE,
          currentUser: null,
          loaded: true,
        });
      })
      .catch((error) => {
        setUser(null);
        SecureStore.deleteItemAsync("user");
        dispatch({
          type: types.USER_STATE_CHANGE,
          currentUser: null,
          loaded: true,
        });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SettingsNavBar />
      <ScrollView style={styles.fieldsContainer}>
        <Text style={styles.socialText}>ACCOUNT</Text>
        <AccountScreen />
        <View style={styles.divider}></View>

        <Text style={styles.socialText}>SUPPORT</Text>
        <SupportScreen />
        <View style={styles.divider}></View>
        <Text style={styles.socialText}>ABOUT</Text>
        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          onPress={() =>
            navigation.navigate(routes.GUIDELINES, {
              title: "Community Guidelines",
            })
          }
        >
          <Text style={styles.text}>
            <AntDesign name="exclamationcircleo" size={12} color={colors.white} /> Community Guidelines
          </Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={20} color={colors.secondary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          onPress={() =>
            navigation.navigate(routes.TERMS, { title: "Terms oF Service" })
          }
        >
          <Text style={styles.text}>
            <Feather name="file-text" size={12} color={colors.white} /> Terms of
            Service
          </Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={20} color={colors.secondary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          onPress={() =>
            navigation.navigate(routes.PRIVACY, { title: "Privacy Policy" })
          }
        >
          <Text style={styles.text}>
            <Feather name="file" size={12} color={colors.white} /> Privacy Policy
          </Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={20} color={colors.secondary} />
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
          <Text style={styles.text}>
            <FontAwesome5 name="copyright" size={12} color={colors.white} /> Copyright
            Policy
          </Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={20} color={colors.secondary} />
          </View>
        </TouchableOpacity>

        <View style={styles.divider}></View>
        <Text style={styles.socialText}>LOGIN</Text>

        <TouchableOpacity
          style={styles.fieldItemContainer}
          onPress={handleLogout}
        >
          <Text style={styles.text}>
            <MaterialIcons name="logout" size={14} color={colors.white} /> Logout
          </Text>
        </TouchableOpacity>
        <Text style={styles.versionText}>v0.1.0</Text>
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
    opacity: 0.8,
  },
  versionText: {
    color: colors.secondary,
    textAlign: "center",
    fontSize: 10,
    marginTop: 50,
  },
  authText: {
    color: colors.secondary,
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
});
