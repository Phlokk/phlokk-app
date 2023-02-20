import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  Image,
} from "react-native";
import LottieView from "lottie-react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../../config/colors";
import axios from "../../../redux/apis/axiosDeclaration";
import CustomAlert from "../../Alerts/CustomAlert";
import AnimatedLottieView from "lottie-react-native";

export default function ResetScreen() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");

  const [codeErrorMessage, setCodeErrorMessage] = useState(false);

  const navigation = useNavigation();

  function resetTextInput() {
    setEmail("");
    setToken("");
    setPassword("");
  }

  const handleReset = async () => {
    try {
      const result = await axios.post(`/api/reset`, {
        email: email,
        token: token,
        password: password,
      });
      resetTextInput();
      Alert.alert("Password has been reset successfully");
      navigation.popToTop();

      return result.data;
    } catch (e) {
      setCodeErrorMessage(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            style={styles.keyLeft}
            name="keyboard-arrow-left"
            size={32}
            color="lightgray"
          />
        </TouchableOpacity>
        <View style={styles.lottieContainer}>
          <View style={styles.lockView}>
            <LottieView
              autoPlay
              style={{
                alignItems: "center",
                width: 200,
                height: 200,
              }}
              source={require("../../../../assets/animations/lock.json")}
            />
          </View>

          <View style={styles.fields} behavior="padding">
            <Text style={styles.emailText}>Reset your password</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="email-address"
              placeholderTextColor={colors.green}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              maxLength={50}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
              value={email}
            />
            <TextInput
              style={styles.textInput}
              placeholderTextColor={colors.green}
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={10}
              onChangeText={(text) => setToken(text)}
              placeholder="Input Code"
              value={token}
            />
            <TextInput
              style={styles.textInput}
              placeholderTextColor={colors.green}
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={50}
              onChangeText={(text) => setPassword(text)}
              placeholder="New Password"
              value={password}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleReset()}
            >
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>The Email Address does not exist!</Text>}
        positiveBtn="Ok"
        modalVisible={codeErrorMessage}
        dismissAlert={setCodeErrorMessage}
        animationType="fade"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingTop: 0,
  },
  lottieContainer: {
    top: 90,
  },

  textInput: {
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
  emailText: {
    color: colors.white,
    textAlign: "center",
  },
  fields: {
    flex: 1,
    top: 10,
    paddingHorizontal: 30,
  },
  keyLeft: {
    top: Platform.OS === "android" ? 10 : 60,
  },
  lockView: {
    top: -10,
    alignItems: "center",
  },
  textContainer: {
    padding: 10,
    borderRadius: 50,
  },
});
