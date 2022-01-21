import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { login, register } from "../../../redux/actions";

// const DismissKeys = ({ children }) => (
//     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss() }>
//         { children }
//     </TouchableWithoutFeedback>
// );

export default function AuthDetails({ authPage, setDetailsPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setDetailsPage(false)}>
        <MaterialIcons name="keyboard-arrow-left" size={28} color="lightgray" />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        keyboardType="email-address"
        placeholderTextColor={"lightgray"}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="emailAddress"
        maxLength={24}
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
    </View>
  );
}
