import { useNavigation } from "@react-navigation/native";
import React from "react";
import MarketNavBar from "../../components/general/profileNavBar/market";
import { View, StyleSheet } from "react-native";

import colors from "../../../config/colors"

export default function Market() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MarketNavBar title={"Phlokk Market"} />
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