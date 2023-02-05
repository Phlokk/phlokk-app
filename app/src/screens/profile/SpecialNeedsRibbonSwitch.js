import React, { useState, useEffect } from "react";
import { View, Switch, StyleSheet } from "react-native";
import colors from "../../../config/colors";
import { updateCreator } from "../../services/user";
import { useIsFocused } from "@react-navigation/native";
import { userAtom } from "../../services/appStateAtoms";
import { useAtom } from "jotai";
import {
  getFromSecureStore,
  saveToSecureStore,
} from "../../components/common/SecureStoreFunction";

function SpecialNeedsRibbonSwitch() {
  const isFocused = useIsFocused();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDataNotSaved, setIsDataNotSaved] = useState(false);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    getFromSecureStore("ribbonSwitch").then((data) => {
      setIsEnabled(data ? true : false)
      console.log(data)
    });
  }, []);

  const toggleRibbon = async () => {
    // !isEnabled is the state of the switch when its set to true.
    let temp = null;
    if (!isEnabled) {
      temp = 1;
    } else {
      temp = 0;
    }
    setIsEnabled(!isEnabled);
    await saveToSecureStore(temp, "ribbonSwitch");

    const updateObject = { is_special_showing: temp };

    try {
      await updateCreator(updateObject);
      const updatedUser = { ...user, ...updateObject };
      setUser(updatedUser);
    } catch (error) {
      setIsDataNotSaved(true);
      console.log(error);
    }
  };

  return (
    <View style={styles.fieldsContainer}>
      <View style={styles.postRowContainer}>
        <View style={styles.fieldItemContainer}>
          <View style={styles.fieldValueContainer}>
            <Switch
              style={styles.switch}
              trackColor={{ false: "grey", true: colors.green }}
              thumbColor={{ false: "f4f3f4", true: "f4f3f4" }}
              onValueChange={toggleRibbon}
              value={isEnabled}
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

export default SpecialNeedsRibbonSwitch;
