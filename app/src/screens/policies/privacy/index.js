import { StyleSheet } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";

import colors from "../../../../config/colors"


const PRIVACY = "https://www.websitepolicies.com/policies/view/oVF5j3aw";

export default function PrivacyPolicyScreen() {
  return (
    <WebView
      style={styles.container}
      originWhitelist={["*"]}
      source={{ uri: PRIVACY }}
      onLoad={console.log("Loaded")}
    />
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.primary,
      alignItems: 'center',
      paddingTop: 20,
  },

  policyText: {
      color: colors.white,

  },

  
});
