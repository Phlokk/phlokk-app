import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Image,
} from "react-native";


import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../../config/colors";
import axios from "../../../redux/apis/axiosDeclaration";
import CustomAlert from "../../Alerts/CustomAlert";
import ResetCodeAlert from "../../Alerts/ResetCodeAlert";
import { useTheme } from "../../../theme/context";
import LottieView from "lottie-react-native";
const animation = require("../../../../assets/animations/two_dots.json");
export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [codeErrorMessage, setCodeErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation();
  const { theme } = useTheme();
  function resetTextInput() {
    setEmail("");
  }

  const handleReset = async () => {
    try {
      setLoading(true);
      const result = await axios.post(`/api/password/forgotPassword`, {
        email: email,
      });
      resetTextInput();
      setLoading(false);
      setIsCodeSent(true);
      return result.data;
    } catch (e) {
      setCodeErrorMessage(true);
    }
  };

  const LoadingScreen = () =>{
    return(
      <View
      style={theme == "light" ? styles.container_light : styles.container_dark}
    >
      <View style={styles.lottieView}>
        <LottieView
          autoPlay
          style={{
            width: 25,
            height: 25,
          }}
          source={animation}
        />
        <Text
          style={theme == "light" ? styles.splash_light : styles.splash_dark}
        >
         Sending Reset Code...
        </Text>
      </View>
    </View>
    )
  }
  
  if(loading) return <LoadingScreen />

  return (
    <ScrollView style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            style={styles.keyLeft}
            name="keyboard-arrow-left"
            size={32}
            color="lightgray"
          />
        </TouchableOpacity>
        <View style={styles.lockView}>
            <View style={styles.textContainer}>
            <MaterialIcons name="admin-panel-settings" size={50} color={colors.green} />
            </View>
          </View>

        <View style={styles.fields} behavior="padding">
          <Text style={styles.emailText}>
            Please enter your email to get reset code
          </Text>
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
          <TouchableOpacity style={styles.button} onPress={() => handleReset()}>
            <Text style={styles.buttonText}>Get Reset Code</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ResetCodeAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={
          <Text>A code has been sent to your{"\n"} Email Address</Text>
        }
        positiveBtn="Ok"
        modalVisible={isCodeSent}
        dismissAlert={setIsCodeSent}
        animationType="fade"
      />
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
    marginTop: 40,
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
    paddingTop: 150,
    paddingHorizontal: 30,
  },
  keyLeft: {
    top: Platform.OS === "android" ? 10 : 60,
  },
  lockView: {
    top: Platform.OS === "android" ? -50 : 80,
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
  lottieView: {
    marginTop: 400,
    alignItems: "center",
  },
  splash_light: {
    marginTop: 30,
    color: colors.lightBlack,
  },
  splash_dark: {
    marginTop: 30,
    color: colors.green,
  },
  container_light: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container_dark: {
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.black,
  },
});
