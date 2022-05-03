import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { USER_STATE_CHANGE } from "../../../redux/constants";
// import { LOGIN, REGISTER } from "@env";
import colors from "../../../../config/colors";


export default function AuthDetails({ authPage, setDetailsPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  

  function resetTextInput() {
    console.log("reset forum");
    setName("");
    setEmail("");
    setPassword("");
    setUsername("");
  }

  const handleLogin = () => {
    axios
      .post("https://dev.phlokk.com/api/sanctum/login", {
        email: email,
        password: password,
        device_name: "mobile",
      })
      .then((response) => {
        console.log('back from login')
        
        console.log(response.data);
        const user = response.data.user;
        user.token = response.data.token;

        setUser(user);
        SecureStore.setItemAsync('user', JSON.stringify(user));
        // console.log(user)
        dispatch({ type: USER_STATE_CHANGE, currentUser: user, loaded: true });
      })
      .catch((error) => {
        // console.log(error.response);
        Alert.alert('Wrong username or password!')
      });
  };

  const handleRegister = () => {
    console.log(email, password, username, name);
    axios
      .post("https://dev.phlokk.com/test/register", {
        name: name,
        username: username,
        email: email,
        password: password,
      })
      .then(function (response) {
        const user = response.data.user;
        user.token = response.data.token;
        
        console.log("------------ Response XXX ---------");
        // console.log(response.data);
        resetTextInput();
        setUser(user);
        console.log(user.token)
        SecureStore.setItemAsync('user', JSON.stringify(user));
        dispatch({ type: USER_STATE_CHANGE, currentUser: user, loaded: true });
      })
      .catch(function (error) {
        // console.log("------------ Back from Server ----------");
        // console.log("------------ ERROR -------------");
        // console.log(error);
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
        {authPage === 0 ? (
          <>
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
              value={email}
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
              value={password}
            />
          </>
        ) : (
          <>
            <TextInput
              style={styles.textInput}
              placeholderTextColor={"lightgray"}
              autoCapitalize="words"
              autoCorrect={false}
              maxLength={50}
              onChangeText={(text) => setName(text)}
              placeholder="Name"
              value={name}
            />
            <TextInput
              style={styles.textInput}
              placeholderTextColor={"lightgray"}
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
              placeholderTextColor={"lightgray"}
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
              placeholderTextColor={"lightgray"}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              maxLength={24}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              placeholder="Password"
              value={password}
            />
          </>
        )}
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
    width: 40,
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
    borderRadius: 10,
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
