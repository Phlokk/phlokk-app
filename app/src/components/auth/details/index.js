import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// import { useDispatch } from "react-redux";
// import { login, register } from "../../../redux/actions";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";
// import { LOGIN, REGISTER } from "@env";
import colors from "../../../../config/colors";

export default function AuthDetails({ authPage, setDetailsPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");


  const navigation = useNavigation;

  // const dispatch = useDispatch();

  const handleLogin = () => {
    axios
      .post("https://dev.phlokk.com/test/login", {
        email: email,
        password: password,
        // headers: {"Authorization": localStorage.getItem('token')}
      //   headers: {
      //     Authorization: 'Bearer '+token
      // }
      })
      .then(function (response) {
        // navigation.navigate("feed");
        // 2 seconds later...

        console.log("------------ Response XXX ---------");
        // console.log(response);
        console.log(response.data);
        console.log("------------ Response XXX ---------");
      })
      .catch(function (error) {
        console.log("------------ Back from Server ----------");
        console.log("------------ ERROR -------------");
        console.log(error);
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
        console.log("------------ Response XXX ---------");
        console.log(response.data);
        console.log("------------ Response XXX ---------");
      })
      .catch(function (error) {
        console.log("------------ Back from Server ----------");
        console.log("------------ ERROR -------------");
        console.log(error);
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
        />
      <TextInput
          style={styles.textInput}
          placeholderTextColor={"lightgray"}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={24}
          onChangeText={(text) => setUsername(text)}
          placeholder="Username"
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
