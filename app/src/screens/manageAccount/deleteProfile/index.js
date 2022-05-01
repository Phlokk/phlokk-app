import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavBar from "../../../components/general/manageAccount";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { USER_STATE_CHANGE } from "../../../redux/constants";
import axios from "axios";
import colors from "../../../../config/colors";

export default function DeleteProfileScreen() {
  const [user, setUser] = useState("");
  const dispatch = useDispatch();

  const handleDelete = async () => {
    console.log("delete account");
    let user = await SecureStore.getItemAsync("user");
    user = JSON.parse(user);
    console.log(user.token);

    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    axios
      .post("https://dev.phlokk.com/api/delete")
      .then((response) => {
        console.log("back from delete");
        setUser(null);
        SecureStore.deleteItemAsync("user");
        dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true });
      })
      .catch((error) => {
        setUser(null);
        SecureStore.deleteItemAsync("user");
        dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true });
        console.log(error.response);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AccountNavBar title={"Account deletion"} />

      <View style={styles.fieldsContainer}>
        <Text style={styles.text}>
          If you delete your account, you will lose the services stated in our
          Terms Of Service agreement permanently. All data will be deleted. You
          will not be able to recover it.
        </Text>

        <TouchableOpacity
          style={styles.fieldItemContainer}
          onPress={() => handleDelete()}
        >
          <View style={styles.fieldValueContainer}>
            <Text style={styles.text}>
              <Text style={styles.danger}>Delete account!</Text>
            </Text>

            <MaterialCommunityIcons
              name="delete-circle"
              size={40}
              color={colors.red}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  fieldItemContainer: {
    flexDirection: "row",
  },
  fieldsContainer: {
    marginTop: "50%",
    padding: 20,
    alignItems: "center",
  },
  fieldValueContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.white,
    padding: 10,
  },
  danger: {
    color: colors.red,
    fontWeight: "bold",
    fontSize: 18,
  },
  warningWhite: {
    marginBottom: 30,
    color: colors.white,
  },
});
