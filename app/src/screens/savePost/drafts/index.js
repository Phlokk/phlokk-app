import React from "react";
import { View, StyleSheet } from "react-native";
import DraftsNavBar from "../../../components/general/draftsNav";

import colors from "../../../../config/colors"

export default function DraftsScreen() {
  return (
    <View style={styles.container}>
      <DraftsNavBar title={"Drafts"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.primary,
  },
  activityContainer: {
      flex: 1,
  },
  text: {
   color: colors.white,
   marginTop: 30,
   

  },
      
});

