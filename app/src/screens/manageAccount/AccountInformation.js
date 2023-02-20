import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../config/colors";
import CustomAlert from "../../components/Alerts/CustomAlert";
import { useTheme } from "../../theme/context";
import routes from "../../navigation/routes";

const AccountInformation = () => {
  const { theme, setTheme } = useTheme();
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);

  return (
    <View>
      <Text
        style={
          theme == "light" ? styles.socialText_light : styles.socialText_dark
        }
      >
        ACCOUNT INFORMATION
      </Text>
      <CustomAlert
        customAlertMessage={<Text>Add phone number{"\n"}coming soon!</Text>}
        positiveBtn="Ok"
        modalVisible={phoneNumber}
        dismissAlert={setPhoneNumber}
        animationType="fade"
      />
      <TouchableOpacity
        onPress={() => setPhoneNumber(true)}
        style={styles.fieldItemContainer}
        autoCapitalize="none"
      >
        <Text style={theme == "light" ? styles.text_light : styles.text_dark}>
          Phone number
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
        customAlertMessage={<Text>Edit email{"\n"}coming soon!</Text>}
        positiveBtn="Ok"
        modalVisible={email}
        dismissAlert={setEmail}
        animationType="fade"
      />
      <TouchableOpacity
         onPress={() =>
          navigation.navigate(routes.UPDATE_EMAIL, {
            title: "Update email",
          })
        }
        style={styles.fieldItemContainer}
        autoCapitalize="none"
      >
        <Text style={theme == "light" ? styles.text_light : styles.text_dark}>
          Email
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
          navigation.navigate(routes.UPDATE_PASSWORD, {
            title: "Update password",
          })
        }
        style={styles.fieldItemContainer}
        autoCapitalize="none"
      >
        <Text style={theme == "light" ? styles.text_light : styles.text_dark}>
          Password
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
  chevron_light: {
    color: colors.black,
  },
  chevron_dark: {
    opacity: 0.6,
  },
});

export default AccountInformation;
