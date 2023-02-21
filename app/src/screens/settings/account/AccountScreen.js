import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import routes from "../../../navigation/routes";
import colors from "../../../../config/colors";
import CustomAlert from "../../../components/Alerts/CustomAlert";
import { useTheme } from "../../../theme/context";

export default function AccountScreen() {
  const { theme } = useTheme();
  const auth = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [blocking, setBlocking] = useState(false);
  const [security, setSecurity] = useState(false);

  return (
    <View>
      <View style={ theme == "light" ? styles.blockColorContainer_light : styles.blockColorContainer_dark}>
        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          onPress={() =>
            navigation.navigate(routes.MANAGE_ACCOUNT, {
              title: "Manage Account",
            })
          }
        >
          <Text style={theme == "light" ? styles.text_light : styles.text_dark}>
            <Feather
              name="user"
              size={14}
              style={theme == "light" ? styles.icon_light : styles.icon_dark}
            />{" "}
            Manage Account
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
            <Text>Security{"\n"}coming in official release</Text>
          }
          positiveBtn="Ok"
          modalVisible={security}
          dismissAlert={setSecurity}
          animationType="fade"
        />
        <TouchableOpacity
          onPress={() => setSecurity(true)}
          style={styles.fieldItemContainer}
          autoCapitalize="none"
        >
          <Text style={theme == "light" ? styles.text_light : styles.text_dark}>
            <Ionicons
              name="md-shield-checkmark-outline"
              size={14}
              style={theme == "light" ? styles.icon_light : styles.icon_dark}
            />{" "}
            Security
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
          onPress={() =>
            navigation.navigate(routes.PRIVACY_SCREEN, {
              title: "Privacy",
            })
          }
          style={styles.fieldItemContainer}
          autoCapitalize="none"
        >
          <Text style={theme == "light" ? styles.text_light : styles.text_dark}>
            <MaterialIcons
              name="lock-outline"
              size={14}
              style={theme == "light" ? styles.icon_light : styles.icon_dark}
            />{" "}
            Privacy
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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

  authText: {
    color: colors.secondary,
  },
  socialText: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 8,
    marginTop: 20,
    opacity: 0.3,
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
    color: colors.greyShade,
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
