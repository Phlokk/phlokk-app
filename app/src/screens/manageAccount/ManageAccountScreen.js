import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import AccountNavBar from "../../components/general/manageAccount/AccountNavBar";
import colors from "../../../config/colors"
import AccountControl from "./AccountControl";

export default function ManageAccountScreen() {
 
  return (
    <SafeAreaView style={styles.container}>
      <AccountNavBar />
      <AccountControl />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.primary
  }, 
});