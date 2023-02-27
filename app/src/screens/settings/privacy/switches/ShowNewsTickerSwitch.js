import React, { useState, useEffect } from "react";
import { View, Switch, StyleSheet } from "react-native";
import colors from "../../../../../config/colors";
import { userAtom } from "../../../../services/appStateAtoms";
import { useAtom } from "jotai";
import { getFromSecureStore, saveToSecureStore } from "../../../../components/common/SecureStoreFunction";
import { updateCreator } from "../../../../services/user";


function ShowNewsTickerSwitch() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDataNotSaved, setIsDataNotSaved] = useState(false);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    getFromSecureStore("tickerSwitch").then((data) => {
      setIsEnabled(data ? true : false)
    });
  }, []);

  const toggleTicker = async () => {
    // !isEnabled is the state of the switch when its set to true.
  
    setIsEnabled(!isEnabled);
    await saveToSecureStore(!isEnabled, "tickerSwitch");
    const updateObject = { disable_ticker: !isEnabled ? 1 : 0 };
    

    try {
      await updateCreator(updateObject);
      const updatedUser = { ...user, ...updateObject };
      setUser(updatedUser);
    } catch (error) {
      setIsDataNotSaved(true);
    }
  };

  return (
    <View>
      <View style={styles.postRowContainer}>
        <View style={styles.fieldItemContainer}>
          <View style={styles.fieldValueContainer}>
            <Switch
              style={styles.switch}
              trackColor={{ false: "grey", true: colors.green }}
              thumbColor={{ false: "f4f3f4", true: "f4f3f4" }}
              onValueChange={toggleTicker}
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

export default ShowNewsTickerSwitch;