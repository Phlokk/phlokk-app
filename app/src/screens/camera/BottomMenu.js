import { StyleSheet } from "react-native";
import React from "react";
import IconOverlay from "./IconOverlay";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BottomMenu() {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <IconOverlay />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    
  },
});
