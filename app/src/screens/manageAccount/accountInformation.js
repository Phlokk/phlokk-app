import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../config/colors"
import CustomAlert from "../../components/Alerts/customAlert"

const AccountInformation = () => {
  const [phoneNumber, setPhoneNumber] = useState(false)
  const [email, setEmail] = useState(false)
  const [password, setPassword] = useState(false)
 
  return (
    <View>
      <Text style={styles.socialText}>Account Information</Text>
      <CustomAlert
        alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>Add phone number{"\n"}coming in beta 3</Text>}
        positiveBtn="Ok"
        modalVisible={phoneNumber}
        dismissAlert={setPhoneNumber}
        animationType="fade"
      />
        <TouchableOpacity
        onPress={() => setPhoneNumber(true)}
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
        <CustomAlert
        alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>Edit email{"\n"}coming in beta 3</Text>}
        positiveBtn="Ok"
        modalVisible={email}
        dismissAlert={setEmail}
        animationType="fade"
      />
        <TouchableOpacity
        onPress={() => setEmail(true)}
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
        <CustomAlert
        alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>Edit password{"\n"}coming in beta 3</Text>}
        positiveBtn="Ok"
        modalVisible={password}
        dismissAlert={setPassword}
        animationType="fade"
      />
        <TouchableOpacity
         onPress={() =>setPassword(true)}
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