import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import ProfileHeader from "../../profile/header/"


import routes from "../../../navigation/routes";
import colors from "../../../../config/colors"
import { useSelector } from "react-redux";

export default function ProfileNavBar({ user }) {
  const navigation = useNavigation();
  const auth = useSelector((state) => state.auth);

  return (
    <View style={styles.container}>
      {auth.currentUser.user === user ? ( 
        <TouchableOpacity>
          <Entypo
            name="shop"
            size={26}
            color={colors.white}
            // onPress={() => navigation.navigate(routes.MARKET)}
            onPress={() => (Alert.alert("Phlokk Market", "Coming in beta version 3!"))}
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
      <Text style={styles.middleText}>{auth.currentUser.creator_type}</Text>
      {auth.currentUser.user === user ? (
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
    alignSelf: 'center',
    fontWeight: "bold",
  },
});
