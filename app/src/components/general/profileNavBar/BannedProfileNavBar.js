import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import colors from "../../../../config/colors";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import BannedModalScreen from "../../modal/BannedSettingsScreen/BannedModalScreen";

export default function BannedProfileNavBar() {
  const [isBannedModalScreenOpen, setIsBannedModalScreenOpen] = useState(false);

  const isFocused = useIsFocused();
  useEffect(() => {
    setIsBannedModalScreenOpen(false);
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.middle_dark}>Account banned</Text>
      <TouchableOpacity style={styles.drawerBtn}>
        <Ionicons
          name="ellipsis-horizontal-sharp"
          size={28}
          style={styles.toggle_dark}
          onPress={() => setIsBannedModalScreenOpen(true)}
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBannedModalScreenOpen}
      >
        <View style={styles.pressedModal}>
          <Pressable
            style={styles.pressedStyle}
            onPress={() => setIsBannedModalScreenOpen(false)}
          />
          <BannedModalScreen />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    paddingVertical: 5,
    marginTop: 8,
  },
  toggle_light: {
    color: colors.black,
  },
  toggle_dark: {
    color: colors.white,
  },
  text: {
    fontSize: 16,
    color: colors.white,
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  middle_light: {
    color: colors.black,
    fontSize: 12,
    flex: 1,
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
  },
  middle_dark: {
    color: colors.secondary,
    fontSize: 12,
    flex: 1,
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
    opacity: 0.5,
  },
  drawerBtn: {
    position: "absolute",
    top: 0,
    right: 12,
  },
  pressedStyle: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  pressedModal: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
