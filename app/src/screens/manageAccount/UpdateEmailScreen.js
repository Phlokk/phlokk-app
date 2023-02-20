import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";

import LottieView from "lottie-react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../config/colors";
import axios from "../../redux/apis/axiosDeclaration";
import CustomAlert from "../../components/Alerts/CustomAlert";
import PrivacyInfoNav from "../../components/general/navBar/PrivacyInfoNav";
import { useTheme } from "../../theme/context";

export default function UpdateEmailScreen() {
  const { theme, setTheme } = useTheme();
  const [oldEmail, setOldEmail] = useState("");
  const [email, setEmail] = useState("");

  const [codeErrorMessage, setCodeErrorMessage] = useState(false);
  const [updateMessage, setUpdateMessage] = useState(false);


  function resetTextInput() {
    setEmail("");
    setOldEmail("");
  }

  const onSave = async () => {
    try {
      const result = await axios.put(`/api/updateEmail`, {
        oldEmail: oldEmail,
        email: email,
      });
      resetTextInput();
      setUpdateMessage(true);
      return result.data;
    } catch (e) {
      setCodeErrorMessage(true);
    }
  };

  return (
    <ScrollView style={theme == "light" ? styles.container_light : styles.container_dark}>
      <View>
        <View style={styles.navView}>
          <PrivacyInfoNav
            title="Update Email"
            leftButton={{ display: true, name: "save", action: onSave }}
          />
        </View>
        <View style={styles.fields} behavior="padding">
          <View style={styles.lockView}>
            <View style={styles.textContainer}>
              <LottieView
                autoPlay
                style={{
                  alignItems: "center",
                  width: 200,
                  height: 200,
                }}
                source={require("../../../assets/animations/lock.json")}
              />
            </View>
          </View>

          <Text style={theme == "light" ? styles.passwordText_light : styles.passwordText_dark}>
            Please enter your information{"\n"} to update your email.
          </Text>
          <TextInput
            style={theme == "light" ? styles.textInput_light : styles.textInput_dark}
            placeholderTextColor={colors.green}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            maxLength={50}
            onChangeText={(text) => setOldEmail(text)}
            placeholder="Current email"
            value={oldEmail}
          />
          <TextInput
            style={theme == "light" ? styles.textInput_light : styles.textInput_dark}
            placeholderTextColor={colors.green}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            maxLength={50}
            onChangeText={(text) => setEmail(text)}
            placeholder="New email"
            value={email}
          />
        </View>
      </View>
      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Please enter a valid, current email </Text>}
        positiveBtn="Ok"
        modalVisible={codeErrorMessage}
        dismissAlert={setCodeErrorMessage}
        animationType="fade"
      />
      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={
          <Text>Your email has been updated successfully!</Text>
        }
        positiveBtn="Ok"
        modalVisible={updateMessage}
        dismissAlert={setUpdateMessage}
        animationType="fade"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container_light: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 0,
    backgroundColor: colors.white,
  },
  container_dark: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingTop: 0,
  },
  navView: {
    marginTop: 40,
  },
  textInput_light: {
    borderColor: colors.secondary,
    borderBottomWidth: 1,
    borderStyle: "solid",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginTop: 20,
    color: colors.black,
  },
  textInput_dark: {
    borderColor: colors.secondary,
    borderBottomWidth: 1,
    borderStyle: "solid",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginTop: 20,
    color: colors.white,
  },
  button: {
    marginTop: 25,
    borderColor: colors.green,
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "solid",
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.green,
  },
  text: {
    color: colors.white,
  },
  passwordText_light: {
    color: colors.black,
    textAlign: "center",
  },
  passwordText_dark: {
    color: colors.green,
    textAlign: "center",
  },
  validateText: {
    marginTop: 10,
    fontSize: 12,
    opacity: 0.4,
    color: colors.secondary,
    textAlign: "center",
  },
  fields: {
    flex: 1,
    top: 50,
    paddingTop: Platform.OS === "android" ? 20 : 90,
    paddingHorizontal: 30,
  },
  keyLeft: {
    top: Platform.OS === "android" ? 10 : 60,
  },
  lockView: {
    top: -50,
    alignItems: "center",
  },
  textContainer: {
    padding: 10,
    borderRadius: 50,
  },
  image: {
    height: 200,
    width: 200,
  },
});
