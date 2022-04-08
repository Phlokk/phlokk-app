import React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";

import colors from "../../../../config/colors"


const TERMS = "https://www.websitepolicies.com/policies/view/im5eMPMr";

export default function TermsOfServiceScreen() {
  return (
    <WebView
      style={styles.container}
      originWhitelist={["*"]}
      source={{ uri: TERMS }}
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

  termsText: {
      color: colors.white,

  },
  
});
