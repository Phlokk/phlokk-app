import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import CustomAlert from "../../components/Alerts/customAlert";
import colors from '../../../config/colors';

export default function BottomMenu () {

  const navigation = useNavigation();
  const [isSeconds, setIsSeconds] = useState(false);
  const [isLive, setIsLive] = useState(false);


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.text}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons 
        name="keyboard-arrow-left" 
        size={28} 
        color="lightgray" />
      </TouchableOpacity>
      <CustomAlert
        alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>Seconds{"\n"}coming in Official release</Text>}
        positiveBtn="Ok"
        modalVisible={isSeconds}
        dismissAlert={setIsSeconds}
        animationType="fade"
      />
      <TouchableOpacity>
        <Text 
        onPress={() => setIsSeconds(true)}
        style={styles.text}>Secs
        </Text>
      </TouchableOpacity>
      <CustomAlert
        alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>LIVE{"\n"}coming in Official release</Text>}
        positiveBtn="Ok"
        modalVisible={isLive}
        dismissAlert={setIsLive}
        animationType="fade"
      />
      <TouchableOpacity >
        <Text 
        onPress={() => setIsLive(true)}
        style={styles.liveText}>LIVE</Text>
      </TouchableOpacity>
     
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
    height: 80,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    backgroundColor: colors.black,
      
    },
    text: {
    bottom: 20,
    color: colors.secondary,
    flexDirection: "row",
    },
    liveText: {
    bottom: 20,
    color: colors.secondary,
    flexDirection: "row",
    },
})

