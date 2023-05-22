import React, { useState, useEffect } from "react";
import { View, Switch, StyleSheet } from "react-native";
import colors from "../../../../config/colors";

function CustomSwitch({value, setValue = () =>{}}) { 

  return (
    <View>
      <View style={styles.postRowContainer}>
        <View style={styles.fieldItemContainer}>
          <View style={styles.fieldValueContainer}>
            <Switch
              style={styles.switch}
              trackColor={{ false: "grey", true: colors.green }}
              thumbColor={{ false: "f4f3f4", true: "f4f3f4" }}
              onChange={(e)=> setValue(!value) }
              value={value}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fieldItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  marketRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  //
  fieldValueContainer: {
    marginRight: 10,
  },

  shareContainer: {
    flexDirection: "row",
    top: 30,
  },
  settingsText: {
    color: colors.secondary,
    fontSize: 12,
    marginLeft: 20,
    marginHorizontal: 8,
    opacity: 0.9,
  },
});

export default CustomSwitch;
