import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../../App";
import { useIsFocused } from "@react-navigation/native";
import { ThemeContext } from "../../../theme/context";
import ReportUserModalScreen from "../../modal/reportModal/ReportUserModalScreen";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileNavBar({ userProfile, isCurrentUser }) {
  const navigation = useNavigation();
  const { theme, setTheme } = useContext(ThemeContext);
  const [user, setUser] = useAtom(userAtom);

  const [isReportModalScreenOpen, setIsReportModalScreenOpen] = useState(false);

  const isFocused = useIsFocused();
  useEffect(() => {
    setIsReportModalScreenOpen(false);
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={theme == "light" ? styles.middle_light : styles.middle_dark}>
        {userProfile?.creator_type || user.creator_type}
      </Text>

      {!isCurrentUser && (
        <TouchableOpacity style={styles.drawerBtn}>
          <Ionicons
            name="ellipsis-horizontal-sharp"
            size={28}
            style={theme == "light" ? styles.toggle_light : styles.toggle_dark}
            onPress={() => setIsReportModalScreenOpen(true)}
          />
        </TouchableOpacity>
      )}
      {isCurrentUser && (
        <TouchableOpacity style={styles.drawerBtn}>
          <MaterialIcons
            onPress={() => navigation.openDrawer()}
            name="menu"
            size={23}
            style={theme == "light" ? styles.toggle_light : styles.toggle_dark}
          />
        </TouchableOpacity>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isReportModalScreenOpen}
      >
        <View style={styles.pressedModal}>
          <Pressable
            style={styles.pressedStyle}
            onPress={() => setIsReportModalScreenOpen(false)}
          />
          <ReportUserModalScreen
            userProfile={userProfile}
            user={user}
            isCurrentUser={isCurrentUser}
          />
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
    top: 5,
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
