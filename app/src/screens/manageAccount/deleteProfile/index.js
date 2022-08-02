import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { types } from "../../../redux/constants";
import axios from "../../../redux/apis/axiosDeclaration";
import routes from "../../../navigation/routes";
import colors from "../../../../config/colors";
import { useNavigation } from "@react-navigation/native";
import NavBarGeneral from "../../../components/general/navBar";

export default function DeleteProfileScreen() {
  const [user, setUser] = useState("");
  const navigation = useNavigation();
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
    <SafeAreaView style={styles.container}>
      <NavBarGeneral title={"Account deletion"} />

      <View style={styles.fieldsContainer}>
        <Text style={styles.text}>
          If you delete your user account you will lose all services stated in
          our{" "}
          <Text
            onPress={() => navigation.navigate(routes.TERMS)}
            style={styles.termsText}
          >
            (Terms Of Service)
          </Text>{" "}
          agreement. We recommend that you download all of your data before permanently deleting your
          account. {"\n"}Your content, links & user profile will be unaccesible to other users once you have deleted your
          account. After 30 days of an inactive account, all of your data will no longer exist on our servers.
        </Text>

        <TouchableOpacity
          style={styles.fieldItemContainer}
          onPress={() => handleDelete()}
        >
          <View style={styles.fieldValueContainer}>
            <Text style={styles.text}>
              <Text style={styles.red}>Delete account</Text>
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
    width: "80%",
    borderRadius: 15,
  },
  fieldsContainer: {
    width: "90%",
    marginTop: "25%",
    padding: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  fieldValueContainer: {
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.white,
    padding: 10,
    
  },
  danger: {
    color: colors.green,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
  },
  warningWhite: {
    marginBottom: 30,
    color: colors.white,
  },
  termsText: {
    color: colors.green,
    fontWeight: 'bold',
  },
});
