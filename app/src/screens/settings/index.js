import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
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

export default function SettingsScreen() {
  const auth = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const dispatch = useDispatch();

  const handleLogout = async () => {
    // console.log("handling logout");
    axios
      .post("/api/logout")
      .then((response) => {
        // console.log("back from logout");
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
        // console.log(error.response);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SettingsNavBar />
      <View style={styles.fieldsContainer}>
        <Text style={styles.socialText}>ACCOUNT</Text>

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
            <Feather name="user" size={12} color={colors.green} /> Manage Account
          </Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={28} color={colors.white} />
          </View>
        </TouchableOpacity>

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
            <AntDesign name="exclamationcircleo" size={12} color={colors.green} /> Community Guidelines
          </Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={28} color={colors.white} />
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
            <Feather name="file-text" size={12} color={colors.green} /> Terms of
            Service
          </Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={28} color={colors.white} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          onPress={() => navigation.navigate(routes.EULA, { title: "EULA" })}
        >
          <Text style={styles.text}>
            <Feather name="file-text" size={12} color={colors.green} /> EULA
          </Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={28} color={colors.white} />
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
            <Feather name="file" size={12} color={colors.green} /> Privacy Policy
          </Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={28} color={colors.white} />
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
            <FontAwesome5 name="copyright" size={12} color={colors.green} /> Copyright
            Policy
          </Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={28} color={colors.white} />
          </View>
        </TouchableOpacity>

        <View style={styles.divider}></View>
        <Text style={styles.socialText}>LOGIN</Text>

        <TouchableOpacity
          style={styles.fieldItemContainer}
          onPress={handleLogout}
        >
          <Text style={styles.text}>
            <MaterialIcons name="logout" size={14} color={colors.green} /> Logout
          </Text>
        </TouchableOpacity>
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>v01.0.0</Text>
        </View>
      </View>
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
    color: colors.green,
    fontSize: 12,
  },
  versionText: {
    color: colors.green,
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
  divider: {
    borderBottomWidth: 0.3,
    borderColor: colors.secondary,
    marginTop: 10,
  },
  versionContainer: {
    flex: 1,
  },
});
