import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { login, register } from "../../../redux/actions";
import { useNavigation } from "@react-navigation/native";

import colors from "../../../../config/colors";

export default function AuthDetails({ authPage, setDetailsPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation;

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login(email, password))
      .then(() => {
        console.log("login successful");
      })
      .catch(() => {
        alert("Wrong email or password");
      });
  };
  const handleRegister = () => {
    dispatch(register(email, password))
      .then(() => {
        console.log("register successful");
      })
      .catch(() => {
        console.log("register unsuccessful");
        alert("register unsuccessful");
      });
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setDetailsPage(false)}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={28}
            color="lightgray"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image source={require("../../../../../app/assets/phlokk_logo.png")} />
      </View>

      <View style={styles.fields}>
        <TextInput
          style={styles.textInput}
          keyboardType="email-address"
          placeholderTextColor={"lightgray"}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
          maxLength={50}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
        />
        <TextInput
          style={styles.textInput}
          placeholderTextColor={"lightgray"}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
          maxLength={24}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          placeholder="Password"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => (authPage === 0 ? handleLogin() : handleRegister())}
        >
          <Text style={styles.buttonText}>
            {authPage === 0 ? "Sign In" : "Sign Up"}
          </Text>
        </TouchableOpacity>
        {authPage === 0 ? (
          <></>
        ) : (
          <Text style={styles.eulaText}>Accept "EULA" on sign-up!</Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 40,
    backgroundColor: colors.primary,
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
    borderColor: colors.secondary,
    borderWidth: 1,
    borderStyle: "solid",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.white,
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
    color: colors.danger,
  },
  welcomeText: {
    textAlign: "center",
    marginTop: 10,
    color: colors.white,
  },
  logoContainer: {
    alignItems: "center",
  },
});
