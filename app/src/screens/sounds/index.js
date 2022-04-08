import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../../../config/colors"

export default function SoundScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <NavBarGeneral title={"Sounds"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.primary,
      paddingVertical: 2,
      paddingTop: 25,
      
      
  },
  
});
