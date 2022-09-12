import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LiveIconOverlay from "./liveIconOverlay";
import colors from "../../../../config/colors";

export default function LiveBottomMenu() {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <LiveIconOverlay />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.black,
  },
});
