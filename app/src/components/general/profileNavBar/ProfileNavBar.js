import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../../App";
import CustomAlert from "../../Alerts/CustomAlert";
import { blockUserById } from "../../../services/user";
import { forceRefreshAtom } from "../../../screens/videoFeed/VideoFeed";
import BlockAlert from "../../Alerts/BlockAlert";

export default function ProfileNavBar({ userProfile, isCurrentUser }) {
  const navigation = useNavigation();

  const [user, setUser] = useAtom(userAtom);
  const [isGifting, setIsGifting] = useState(false);
  //const [isSupportAlert, setIsSupportAlert] = useState(false);
  const [isBlockUserModalOpen, setIsBlockUserModalOpen] = useState(false);
  const [forceRefresh, setForceRefresh] = useAtom(forceRefreshAtom);

  const onBlockCompleted = async () => {
    setIsBlockUserModalOpen(false);
    setForceRefresh(true); // This will tell the video feed to refresh the post list, because we blocked someone
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.middleText}>
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
            color={colors.secondary}
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
  text: {
    fontSize: 16,
    color: colors.white,
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  middleText: {
    color: colors.secondary,
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
