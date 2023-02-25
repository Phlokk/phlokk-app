import * as React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function SupportCenter() {
  return <WebView source={{ uri: "https://phlokk.com/support" }} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 50,
    marginBottom: 15,
  },
});
