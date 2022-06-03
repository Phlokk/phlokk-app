import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import routes from "../../../navigation/routes";
import { useSelector, useDispatch } from "react-redux";
import colors from "../../../../config/colors";
import { fetchUserData } from "../../../redux/actions/users";

export default function ProfileNavBar() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.userReducer.user);
  // const loading = useSelector(state => state.userReducer.user);
  // const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {users !== null || !undefined ? (
        <TouchableOpacity>
          <Entypo
            name="shop"
            size={26}
            color={colors.white}
            onPress={() => navigation.navigate(routes.MARKET)}
            // onPress={() =>
            //   Alert.alert("Phlokk Market", "Coming in beta version 3!")
            // }
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={28}
            color={colors.white}
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
      )}
      {users && users.map((user, i) => <Text style={styles.middleText} key={i}>{user.creator_type}</Text>)}
      {users !== null ? (
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="menu"
            size={28}
            color={colors.white}
            onPress={() => navigation.navigate(routes.EDIT)}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <Ionicons
            name="ellipsis-horizontal"
            size={28}
            color={colors.white}
            onPress={() => navigation.navigate("edit")}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    paddingVertical: 2,
  },
  text: {
    fontSize: 16,
    color: colors.white,
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  middleText: {
    color: colors.secondary,
    flex: 1,
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
  },
});
