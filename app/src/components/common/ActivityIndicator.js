import { MotiView } from 'moti'
import { View, Text } from "react-native";
import React from "react";
import colors from "../../../config/colors";

const LoadingIndicator = () => {
  return (
    <MotiView
    from={{
        width: 30,
        height: 30,
        borderRadius: 30,
        borderWidth: 0.9,
        shadowOpacity: 0.5,
    }}
    animate={{
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        borderWidth: 3,
        shadowOpacity: 1,
    }}
    transition={{
        type: "timing",
        duration: 750,
        repeat: Infinity,
    }}
      style={{
        width: 30,
        height: 30,
        borderRadius: 30,
        borderWidth: 5,
        borderColor: colors.green,
        shadowColor: colors.green,
        shadowOffset: {width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 4,
      }}
    />
  );
};

export default function CustomActivityIndicator() {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}>
      <LoadingIndicator />
    </View>
  );
}
