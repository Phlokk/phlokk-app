import React from "react";
import MarketNavBar from "../../../components/general/phlokkMarket";
import { View, StyleSheet } from "react-native";

import colors from "../../../../config/colors"

export default function ReviewScreen() {
  return (
    <View style={styles.container}>
      <MarketNavBar title={"Reviews"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.primary,
  },
  mainContainer: {
      padding: 20,
      
      
  },
  divider: {
      backgroundColor: 'gray',
  },
  info: {
      color: colors.secondary,
      fontSize: 12,
  },
  infoTextGreen: {
      color: 'green',
  },
  
  title: {
      color: 'gray',
      
  },
  infoView: {
      paddingHorizontal: 20,
      
  },
  
});