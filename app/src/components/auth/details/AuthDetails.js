import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import Checkbox from "expo-checkbox";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { types } from "../../../redux/constants";
import { useTogglePasswordVisibility } from "../../../services/passwordVisibility";
import colors from "../../../../config/colors";
import axios from "../../../redux/apis/axiosDeclaration";
import CustomPolicyModal from "../../eulaScreenModal/CustomPolicyModal";
import CustomTOSModal from "../../eulaScreenModal/CustomTOSModal";
import { registerForPushNotificationsAsync } from "../../../services/notifications";
import CustomAlert from "../../../components/Alerts/CustomAlert";
import { useAtom } from "jotai";
import { userAtom } from "../../../services/appStateAtoms";
import routes from "../../../navigation/routes";

export default function AuthDetails({ authPage, setDetailsPage }) {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const [loggedInUser, setLoggedInUser] = useAtom(userAtom);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [policyModal, setPolicyModal] = useState(false);
  const [isTosModal, setTosModal] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  function resetTextInput() {
    setName("");
    setEmail("");
    setPassword("");
    setUsername("");
  }

  const handleLogin = () => {
    
    axios
      .post("/api/auth/login", {
        email: email,
        password: password,
      })
      .then(async (response) => {
        // if (Platform.OS === 'ios') {
        //   const expoPushToken = await registerForPushNotificationsAsync();
        // setExpoPushToken(expoPushToken);

        // }
        setLoggedInUser(response.data.user);

        const user = response.data.user[0];
        user.token = response.data.token;
        
        // if (Platform.OS === 'ios') {
        //   user.expoPushToken = expoPushToken;
        // }
        SecureStore.setItemAsync("user", JSON.stringify(user));
        // setTimeout(() => {
        //   axios
        //     .get("/api/auth/refresh-token")
        //     .then(async (response) => {
        //       console.log(response.data, "response from refresh")
        //       const newUser = response.data.user[0];
        //       newUser.token = response.data.token;
              
        //       // if (Platform.OS === 'ios') {
        //       //   user.expoPushToken = expoPushToken;
        //       // }
        //       SecureStore.setItemAsync("user", JSON.stringify(newUser));
        //     })
        // }, 60*60*4);
        dispatch({
          type: types.USER_STATE_CHANGE,
          currentUser: user,
          loaded: true,
        });
      })
      .catch((error) => {
        setIsLogin(true)
      });
  };
  
  const handleRegister = () => {
    axios
      .post("/api/auth/register", {
        name: name,
        username: username,
        email: email,
        password: password,
        acceptTerms: isChecked,
      })
      .then(function (response) {
        const user = response.data.user[0];
        user.token = response.data.token;
        resetTextInput();
        setUser(user);
        SecureStore.setItemAsync("user", JSON.stringify(user));
        dispatch({
          type: types.USER_STATE_CHANGE,
          currentUser: user,
          loaded: true,
        });
      })
      .catch(function (error) {
        setIsRegistered(true)
      });
  };
  

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => setDetailsPage(false)}>
            <MaterialIcons
              style={styles.keyLeft}
              name="keyboard-arrow-left"
              size={28}
              color="lightgray"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../../../app/assets/phlokk_logo.png")}
          />
        </View>
        <View style={styles.fields} behavior="padding">
          {authPage === 0 ? (
            <>
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
              <View>
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={colors.green}
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="password"
                  maxLength={24}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={passwordVisibility}
                  placeholder="Password"
                  value={password}
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
            </>
          ) : (
            <>
              <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={colors.green}
                  autoCapitalize="words"
                  autoCorrect={false}
                  maxLength={50}
                  onChangeText={(text) => setName(text)}
                  placeholder="Name"
                  value={name}
                />
                <TextInput
                  style={styles.textInputUser}
                  placeholderTextColor={colors.green}
                  autoCapitalize="none"
                  autoCorrect={false}
                  maxLength={24}
                  onChangeText={(val) => {
                    setUsername(val.toString().toLowerCase().replaceAll(" ", ""));
                  }}
                  placeholder="Username"
                  value={username}
                />
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
                  textContentType="password"
                  maxLength={24}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={passwordVisibility}
                  placeholder="Password"
                  value={password}
                  enablesReturnKeyAutomatically
                />
                <TouchableOpacity
                  onPress={handlePasswordVisibility}
                  style={styles.eyeRegister}
                >
                  <MaterialCommunityIcons
                    name={rightIcon}
                    size={22}
                    color={colors.green}
                  />
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => (authPage === 0 ? handleLogin() : handleRegister())}
          >
            <Text style={styles.buttonText}>
              {authPage === 0 ? "Sign In" : "Sign Up "}
            </Text>
            
          </TouchableOpacity>
          

          {authPage === 0 ? (
            <TouchableOpacity
            style={styles.forgotPass}
            onPress={() => navigation.navigate(routes.RESET_PASS)}
          >
            <Text style={styles.forgotButtonText}>Forgot Password?</Text>
            <View />
          </TouchableOpacity>
          ) : (
          null
          )}

          {authPage === 0 ? (
            <></>
          ) : (
            <View style={styles.checkboxRow}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#00cec9" : undefined}
              />
              <CustomPolicyModal
                positiveBtn="Back"
                modalVisible={policyModal}
                dismissAlert={setPolicyModal}
                animationType="fade"
              />
              <CustomTOSModal
                positiveBtn="Back"
                modalVisible={isTosModal}
                dismissAlert={setTosModal}
                animationType="fade"
              />
              <Text style={styles.eulaText}>
                <Text>
                  By clicking Sign Up you agree to our{" "}
                  <Text
                    onPress={() => setTosModal(true)}
                    style={styles.eulaInfoText}
                  >
                    Terms and Conditions
                  </Text>
                </Text>
                <Text> and </Text>
                <Text
                  onPress={() => setPolicyModal(true)}
                  style={styles.eulaInfoText}
                >
                  EULA
                </Text>
              </Text>
            </View>
          )}
        </View>
        <CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={<Text>Wrong username or password!</Text>}
            positiveBtn="Ok"
            modalVisible={isLogin}
            dismissAlert={setIsLogin}
            animationType="fade"
          />
          <CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={<Text>Registration was not successful!</Text>}
            positiveBtn="Ok"
            modalVisible={isRegistered}
            dismissAlert={setIsRegistered}
            animationType="fade"
          />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 0,
    width: 40,
  },
  checkboxRow: {
    flexDirection: "row",
    alignSelf: "center",
    paddingTop: 10,
  },
  termsRow: {
    paddingTop: 10,
    flexDirection: "row",
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
  textInputUser: {
    borderColor: colors.secondary,
    borderBottomWidth: 1,
    borderStyle: "solid",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginTop: 20,
    color: colors.white,
    textTransform: 'lowercase',
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
  forgotPass: {
    marginTop: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.green,
  },
  forgotButtonText: {
    fontSize: 14,
    color: colors.green,
    
  },
  buttonForgotPassword: {
    marginTop: 20,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderStyle: "solid",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  forgotPassword: {
    flexDirection: "row",
  },
  text: {
    color: colors.white,
  },
  fields: {
    flex: 1,
    top: 50,
    paddingTop: Platform.OS === "android" ? 80 : 150,
    paddingHorizontal: 30,
  },
  eulaText: {
    textAlign: "left",
    marginTop: 10,
    color: colors.secondary,
  },
  welcomeText: {
    textAlign: "center",
    marginTop: 10,
    color: colors.white,
  },
  logoContainer: {
    top: 60,
    alignItems: "center",
  },
  eye: {
    position: "absolute",
    right: 10,
    top: 30,
  },
  eyeRegister: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  checkbox: {
    bottom: 1,
    margin: 8,
    width: 20,
    height: 20,
  },
  eulaInfoText: {
    fontSize: 12,
    color: colors.green,
    textDecorationLine: "underline",
  },
  keyLeft: {
    top: Platform.OS === "android" ? 10 : 60,
  },
  providerButtonPass: {
    borderColor: colors.secondary,
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "solid",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lock: {
    padding: 5,
  },
});
