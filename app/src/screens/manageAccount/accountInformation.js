import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../config/colors"

const AccountInformation = () => {
 
  return (
    <View>
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
              color={colors.green}
            /> Phone number</Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={28} color={colors.white} />
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
              color={colors.green}
            /> Email</Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={28} color={colors.white} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
         onPress={() => (Alert.alert("Edit Password", "Coming in beta version 3!"))}
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          
          
        >
          <Text style={styles.text}>
            <MaterialIcons name="lock-outline" size={12} color={colors.green} /> Password</Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={28} color={colors.white} />
          </View>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
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
        color: colors.green,
        fontSize: 12,
    },
     socialText: { 
         color: colors.secondary,
         fontWeight: 'bold',
         fontSize: 10,
         marginTop: 20,
     },
  });

export default AccountInformation;