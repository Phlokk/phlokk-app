import { Text, View, StyleSheet } from "react-native";
import React from "react";

export default function NeumorphismButtons() {
  return (
      <View style={styles.buttonOuter}>
        <View style={styles.buttonInner}>
          <Text>click</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  buttonOuter: {
    width: 80,
    padding: 12,
    borderRadius: 50,
    shadowOffset: { width: 12, height: 12 },
    shadowColor: "#00afab",
    shadowOpacity: 1.0,
    shadowRadius: 18,
  },
  buttonInner: {
    backgroundColor: "#00CEC9",
    padding: 12,
    borderRadius: 50,
    shadowOffset: { width: -12, height: -12 },
    shadowColor: "#00ede7",
    shadowOpacity: 1.0,
    shadowRadius: 18,
  },
});
