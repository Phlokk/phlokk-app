import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import colors from '../../../config/colors';

export default function BottomMenu () {

  const navigation = useNavigation();

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
      <TouchableOpacity>
        <Text style={styles.text}>Secs</Text>
      </TouchableOpacity>
      <TouchableOpacity >
        <Text style={styles.liveText}>LIVE</Text>
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

