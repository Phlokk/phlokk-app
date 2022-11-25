import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../../App";
import { forceRefreshAtom } from "../../../screens/videoFeed/VideoFeed";
import BlockAlert from "../../Alerts/BlockAlert";
import { ThemeContext } from "../../../theme/context";

export default function ProfileNavBar({ userProfile, isCurrentUser }) {
  const navigation = useNavigation();
  const { theme, setTheme } = useContext(ThemeContext);
  const [user, setUser] = useAtom(userAtom);
  const [isGifting, setIsGifting] = useState(false);
  const [isBlockUserModalOpen, setIsBlockUserModalOpen] = useState(false);
  const [forceRefresh, setForceRefresh] = useAtom(forceRefreshAtom);

  const onBlockCompleted = async () => {
    setIsBlockUserModalOpen(false);
    setForceRefresh(true); // This will tell the video feed to refresh the post list, because we blocked someone
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={theme == "light" ? styles.middle_light : styles.middle_dark}>
        {userProfile?.creator_type || user.creator_type}
      </Text>

      {!isCurrentUser && (
        <TouchableOpacity style={styles.blockButton}>
          <MaterialIcons
            onPress={() => setIsBlockUserModalOpen(true)}
            name="block"
            size={18}
            color={colors.red}
          />
        </TouchableOpacity>
      )}
      {isCurrentUser && (
        <TouchableOpacity style={styles.blockButton}>
          <MaterialIcons
            onPress={() => navigation.openDrawer()}
            name="menu"
            size={23}
            style={theme == "light" ? styles.toggle_light : styles.toggle_dark}
          />
        </TouchableOpacity>
      )}

      {/* Block modal */}
      <BlockAlert
        customAlertMessage={
          <Text>
            {user.username} would you like to block @{userProfile.username}?
            This creator will not be able to send you instant messages, see your
            content, or view or find your profile. This user will not be
            notified that you have blocked them.
          </Text>
        }
        positiveBtn="Block"
        negativeBtn="Cancel"
        modalVisible={isBlockUserModalOpen}
        dismissAlert={setIsBlockUserModalOpen}
        userIdToBlock={userProfile._id}
        onCompleted={onBlockCompleted}
      />
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
  fireButton: {
    position: "absolute",
    top: 0,
    left: 12,
  },
  blockButton: {
    position: "absolute",
    top: 5,
    right: 12,
  },
});
