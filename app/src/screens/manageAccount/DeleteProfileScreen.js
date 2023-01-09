import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { types } from "../../redux/constants";
import axios from "../../redux/apis/axiosDeclaration";
import routes from "../../navigation/routes";
import colors from "../../../config/colors";
import { useNavigation } from "@react-navigation/native";
import NavBarGeneral from "../../components/general/navBar/NavBarGeneral";
import { useTheme } from "../../theme/context";

export default function DeleteProfileScreen() {
  const [user, setUser] = useState("");
  const navigation = useNavigation();
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const handleDelete = async (user_id) => {
    axios
      .delete("/creators/delete" + user_id)
      .then((response) => {
        setUser(null);
        SecureStore.deleteItemAsync("user");
        dispatch({
          type: types.USER_STATE_CHANGE,
          currentUser: null,
          loaded: true,
        });
      })
      .catch((error) => {
        setUser(null);
        SecureStore.deleteItemAsync("user");
        dispatch({
          type: types.USER_STATE_CHANGE,
          currentUser: null,
          loaded: true,
        });
      });
  };

  return (
    <SafeAreaView
      style={theme == "light" ? styles.container_light : styles.container_dark}
    >
      <NavBarGeneral title={"Account deletion"} />
      <TouchableWithoutFeedback>
        <View
          style={styles.reportView}
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.reportView}>
            <Text
              style={
                theme == "light"
                  ? styles.selectText_light
                  : styles.selectText_dark
              }
            >
              If you delete your user account you will lose all services stated
              in our{" "}
              <Text
                onPress={() => navigation.navigate(routes.TERMS)}
                style={styles.termsText}
              >
                (Terms Of Service)
              </Text>{" "}
              agreement. We recommend that you download all of your data before
              permanently deleting your account. {"\n"}Your content, links &
              user profile will be unaccesible to other users once you have
              deleted your account. After 30 days of an inactive account, all of
              your data will no longer exist on our servers.
            </Text>
          </View>
          <View style={styles.divider_light}></View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.submitBtnView}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => handleDelete()}
        >
          <Text style={styles.text}>Delete account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container_dark: {
    flex: 1,
    backgroundColor: colors.black,
  },
  container_light: {
    flex: 1,
    backgroundColor: colors.white,
  },
  danger: {
    color: colors.green,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    justifyContent: "center",
  },
  warningWhite: {
    marginBottom: 30,
    color: colors.white,
  },
  termsText: {
    color: colors.green,
    fontWeight: "bold",
  },

  text: {
    color: colors.white,
    padding: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  selectText_light: {
    color: colors.black,
    marginBottom: 10,
    fontSize: 12,
    marginHorizontal: 5,
  },
  selectText_dark: {
    color: colors.secondary,
    marginBottom: 10,
    fontSize: 12,
    marginHorizontal: 5,
  },
  reportText_light: {
    color: colors.black,
    marginBottom: 10,
    fontSize: 10,
    marginHorizontal: 5,
  },
  reportText_dark: {
    color: colors.secondary,
    marginBottom: 10,
    fontSize: 10,
    marginHorizontal: 5,
  },
  submitBtnView: {
    padding: 20,
  },
  reportView: {
    marginTop: 5,
    marginBottom: 40,
    padding: 10,
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
    borderRadius: 7,
    backgroundColor: colors.red,
  },
  divider_light: {
    top: 20,
    borderBottomWidth: 0.3,
    borderColor: colors.secondary,
    marginTop: 10,
    opacity: 0.2,
    // width: '80%',
  },
});
