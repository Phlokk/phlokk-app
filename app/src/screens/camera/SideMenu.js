import { StyleSheet } from "react-native";
import React from "react";
import SideIconOverlay from "./SideIconOverlay";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SideMenu() {
  return (
    <SafeAreaView style={styles.container}>
      <SideIconOverlay />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    
    
  },
});
