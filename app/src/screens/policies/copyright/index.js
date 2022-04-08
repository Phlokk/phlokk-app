import { StyleSheet } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";

import colors from "../../../../config/colors"

const COPYRIGHT = "https://www.websitepolicies.com/policies/view/dW4VKsnC";

export default function CopyrightPolicyScreen() {
  return (
    <WebView
      style={styles.container}
      originWhitelist={["*"]}
      source={{ uri: COPYRIGHT }}
      onLoad={console.log("Loaded")}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    paddingTop: 20,
  },

  policyText: {
    color: colors.white,
  },
});
