
import React from "react";
import MarketNavBar from "../../../components/general/phlokkMarket";
import { View, StyleSheet } from "react-native";

import colors from "../../../../config/colors"

export default function SubscriptionScreen() {
  return (
    <View style={styles.container}>
      <MarketNavBar title={"Subscriptions"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.primary,
  },
  text: {
      color: colors.secondary
  }
  
});
