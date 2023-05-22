
import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

import { useTheme } from "../../../theme/context";
import colors from "../../../../config/colors";
import SettingsContent from "./SetttingsContent"; 

export default function RoomSettings({parties, setParties,  open, onClose }) {
  const { theme, setTheme } = useTheme();
  const [loading ,setLoading] = useState(false)
 

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={open}
  >
    <View style={ styles.pressedModal}>
      <Pressable
        style={styles.pressedStyle}
        onPress={onClose}
      />
      <View style={loading ? styles.loading_screen : styles.modal_content}>
      <SettingsContent closeModal = {onClose}   parties={parties}  setParties={setParties} setLoading={setLoading} loading={loading} />

      </View>
      
    </View>
  </Modal>
  );
}

const styles = StyleSheet.create({
  pressedStyle: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  pressedModal: {
    flex: 1,
    justifyContent: "flex-end",  
  }, 
  modal_content:{
    height:"80%",
    backgroundColor:colors.red
  },
  loading_screen:{
    height:"100%",
    backgroundColor:colors.red
  }
});
