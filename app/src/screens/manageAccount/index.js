import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import AccountNavBar from "../../components/general/manageAccount";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import routes from "../../navigation/routes"
import colors from "../../../config/colors"



export default function ManageAccountScreen() {
  //   const auth = useSelector((state) => state.auth);
  const navigation = useNavigation();

  
  return (
    <SafeAreaView style={styles.container}>
      <AccountNavBar />

      <View style={styles.fieldsContainer}>
        <Text style={styles.socialText}>Account Information</Text>

        <TouchableOpacity
        onPress={() => (Alert.alert("Add Phone number", "Coming in beta version 3!"))}
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          
        >
          <Text style={styles.text}>
            <MaterialCommunityIcons
              name="cellphone-iphone"
              size={12}
              color="white"
            />{" "}
            Phone number
          </Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={28} color="gray" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => (Alert.alert("Edit Email", "Coming in beta version 3!"))}
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          
        >
          <Text style={styles.text}>
            <MaterialCommunityIcons
              name="email-outline"
              size={12}
              color="white"
            /> Email</Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={28} color="gray" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
         onPress={() => (Alert.alert("Edit Password", "Coming in beta version 3!"))}
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          
          
        >
          <Text style={styles.text}>
            <MaterialIcons name="lock-outline" size={12} color="white" />{" "}
            Password
          </Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={28} color="gray" />
          </View>
        </TouchableOpacity>

        <View style={styles.divider}></View>
        <Text style={styles.socialText}>Account control</Text>

        <TouchableOpacity style={styles.fieldItemContainer}
         onPress={() => (Alert.alert("Business & Analytics", "Coming in official release!"))}
        >
          <Text style={styles.text}>Switch to Business Account</Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={28} color="gray" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fieldItemContainer}
          onPress={() =>
            navigation.navigate(routes.DELETE_PROFILE, {
              title: "Delete account", }) }
        >
          <Text style={styles.text}>Delete account</Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={28} color="gray" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.primary
  },
  imageContainer: {
      alignItems: 'center',
      marginTop: 20
  },
  imageViewContainer: {
      backgroundColor: 'gray',
      height: 100,
      width: 100,
      borderRadius: 50,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center'
  },
  image: {
      height: 100,
      width: 100,
      position: 'absolute'
  },
  imageOverlay: {
      backgroundColor: 'rgba(0,0,0, 0.5)',
      ...StyleSheet.absoluteFill
  },

  fieldsContainer: {
      marginTop: 20,
      padding: 20,
      flex: 1
  },
  fieldItemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
  },
  fieldValueContainer: {
      flexDirection: 'row',
      alignItems: 'center'
  },
  text: {
      color: colors.white,
      fontSize: 12,
  },
  authText: {
      color: colors.secondary,
  },
   socialText: {
       color: colors.secondary,
       fontSize: 10,
       marginTop: 20,
   },
   divider: {
      borderBottomWidth: 0.3,
      borderColor: colors.secondary,
      marginTop: 10,
   },
   
});