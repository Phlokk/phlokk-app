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
} from "react-native";
import Checkbox from "expo-checkbox";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { types } from "../../../redux/constants";
import { useTogglePasswordVisibility } from "../../../services/passwordVisibility";
// import { LOGIN, REGISTER } from "@env";
import colors from "../../../../config/colors";
import axios from "../../../redux/apis/axiosDeclaration";
import routes from "../../../navigation/routes";
import CustomPolicyModal from "../../eulaScreenModal/eulaModal";

export default function AuthDetails({ authPage, setDetailsPage }) {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [isChecked, setChecked] = useState(false);

  const [policyModal, setPolicyModal] = useState(false);

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
      .post("/api/login", {
        email: email,
        password: password,
        device_name: "mobile",
      })
      .then((response) => {
        const user = response.data.user;
        user.token = response.data.token;
        setUser(user);
        SecureStore.setItemAsync("user", JSON.stringify(user));
        dispatch({
          type: types.USER_STATE_CHANGE,
          currentUser: user,
          loaded: true,
        });
      })
      .catch((error) => {
        Alert.alert("Wrong username or password!");
      });
  };

  const handleRegister = () => {
    axios
      .post("/api/register", {
        name: name,
        username: username,
        email: email,
        password: password,
        acceptTerms: isChecked
      })
      .then(function (response) {
        const user = response.data.user;
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
        Alert.alert("Registration was not successful");
      });
  };

  return (
    <>
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
        <Image source={require("../../../../../app/assets/phlokk_logo.png")} />
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
            <KeyboardAvoidingView behavior="padding">
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
                style={styles.textInput}
                placeholderTextColor={colors.green}
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={24}
                onChangeText={(text) => setUsername(text)}
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
                placeholder="Password"
                value={password}
                enablesReturnKeyAutomatically
              />
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
          <></>
        ) : (
          <View style={styles.checkboxRow}>
            <Checkbox
              // onPress={() => acceptOnCheck()}
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
            <Text style={styles.eulaText}>
              Accept{" "}
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 5,
    width: 40,
    backgroundColor: colors.primary,
  },
  checkboxRow: {
    flexDirection: "row",
    alignSelf: "center",
    paddingTop: 10,
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
    marginTop: 80,
    borderColor: colors.green,
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "solid",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
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
    top: 200,
    paddingHorizontal: 30,
  },
  eulaText: {
    textAlign: "center",
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
  checkbox: {
    bottom: 1,
    margin: 8,
    width: 20,
    height: 20,
  },
  eulaInfoText: {
    color: colors.green,
  },
  keyLeft: {
    top: 60,
  }
});
