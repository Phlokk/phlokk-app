import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import colors from "../../../../config/colors";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { types } from "../../../redux/constants/index";
import axios from "../../../redux/apis/axiosDeclaration";
import { userAtom } from "../../../services/appStateAtoms";
import { useAtom } from "jotai";

const BannedModalScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useAtom(userAtom);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    axios
      .post("/api/logout")
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
    <View style={styles.container}>
      <ScrollView style={styles.topBar} horizontal={true}>
        <TouchableOpacity
          style={styles.fieldItemContainer}
          onPress={handleLogout}
        >
          <View style={styles.iconView}>
            <MaterialIcons name="logout" size={25} style={styles.icon_dark} />
          </View>
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.modals,
    height: "12%",
  },
  text: {
    color: colors.secondary,
    bottom: 20,
    fontSize: 10,
    position: "absolute",
    top: 45,
    bottom: 0,
  },
  settingsText: {
    color: colors.secondary,
    textAlign: "center",
    paddingTop: 30,
  },
  fieldItemContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    marginLeft: 10,
  },
  fieldValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconView: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 45,
  },
  topBar: {
    marginTop: 10,
  },
  icon_dark: {
    color: colors.white,
  },
});

export default BannedModalScreen;
