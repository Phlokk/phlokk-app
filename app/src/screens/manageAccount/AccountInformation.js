import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../config/colors"
import CustomAlert from "../../components/Alerts/CustomAlert"

const AccountInformation = () => {
  const [phoneNumber, setPhoneNumber] = useState(false)
  const [email, setEmail] = useState(false)
  const [password, setPassword] = useState(false)

 
  return (
    <View>
      <Text style={styles.socialText}>ACCOUNT INFORMATION</Text>
      <CustomAlert
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
          <Text style={styles.text}>Phone number</Text>
          <View style={styles.fieldValueContainer}>
            <Feather style={styles.chevron} name="chevron-right" size={20} color={colors.secondary} />
          </View>
        </TouchableOpacity>
        <CustomAlert
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
          <Text style={styles.text}>Email</Text>
          <View style={styles.fieldValueContainer}>
            <Feather style={styles.chevron} name="chevron-right" size={20} color={colors.secondary} />
          </View>
        </TouchableOpacity>
        <CustomAlert
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
          <Text style={styles.text}>Password</Text>
          <View style={styles.fieldValueContainer}>
            <Feather style={styles.chevron} name="chevron-right" size={20} color={colors.secondary} />
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
        color: colors.white,
        fontSize: 12,
    },
     socialText: { 
      color: colors.white,
      fontWeight: 'bold',
      fontSize: 8,
      marginTop: 20,
      opacity: 0.5
     },
     chevron: {
      opacity: 0.6,
     }
  });

export default AccountInformation;