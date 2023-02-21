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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../config/colors";
import axios from "../../redux/apis/axiosDeclaration";
import CustomAlert from "../../components/Alerts/CustomAlert";
import PrivacyInfoNav from "../../components/general/navBar/PrivacyInfoNav";
import { useTheme } from "../../theme/context";
import { useTogglePasswordVisibility } from "../../services/passwordVisibility";

export default function UpdatePasswordScreen() {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
  useTogglePasswordVisibility();
  const { theme } = useTheme();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [codeErrorMessage, setCodeErrorMessage] = useState(false);
  const [updateMessage, setUpdateMessage] = useState(false);


  function resetTextInput() {
    setPassword("");
    setPasswordConfirmation("");
    setOldPassword("");
  }

  const onSave = async () => {
    try {
      const result = await axios.post(`/api/updatePassword`, {
        oldPassword: oldPassword,
        password: password,
        passwordConfirmation: passwordConfirmation,
      });
      resetTextInput();
      setUpdateMessage(true);
      return result.data;
    } catch (e) {
      setCodeErrorMessage(true);
      console.log(e);
    }
  };

  return (
    <ScrollView style={theme == "light" ? styles.container_light : styles.container_dark}>
      <View>
        <View style={styles.navView}>
          <PrivacyInfoNav
            title="Update Password"
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
            Please enter your information{"\n"} to update your password.
          </Text>
          <Text style={theme == "light" ? styles.validateText_light : styles.validateText_dark}>
            Your password must be at least 6 characters and should include a
            combination of numbers, letters and special characters (!$@%)
          </Text>
          <TextInput
            style={theme == "light" ? styles.textInput_light : styles.textInput_dark}
            placeholderTextColor={colors.green}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            maxLength={50}
            onChangeText={(text) => setOldPassword(text)}
            placeholder="Current password"
            value={oldPassword}
          />
          <TextInput
            style={theme == "light" ? styles.textInput_light : styles.textInput_dark}
            placeholderTextColor={colors.green}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            maxLength={50}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={passwordVisibility}
            placeholder="New password"
            value={password}
          />
          <TextInput
            style={theme == "light" ? styles.textInput_light : styles.textInput_dark}
            placeholderTextColor={colors.green}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            maxLength={50}
            onChangeText={(text) => setPasswordConfirmation(text)}
            secureTextEntry={passwordVisibility}
            placeholder="New password, again"
            value={passwordConfirmation}
          />
          <TouchableOpacity
                  onPress={handlePasswordVisibility}
                  style={styles.eye}
                >
                  <MaterialCommunityIcons
                    name={rightIcon}
                    size={22}
                    color={colors.green}
                  />
                </TouchableOpacity>
        </View>
      </View>
      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>The old password does not match!</Text>}
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
          <Text>Your password has been updated successfully!</Text>
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
  validateText_light: {
    marginTop: 10,
    fontSize: 12,
    opacity: 0.4,
    color: colors.black,
    textAlign: "center",
  },
  validateText_dark: {
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
  eye: {
    position: "absolute",
    right: 30,
    bottom: 10,
  },
});
