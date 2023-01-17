import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import routes from "../../../navigation/routes";
import { useAtom } from "jotai";
import { userAtom } from "../../../services/appStateAtoms";
import { forceRefreshAtom } from "../../../screens/videoFeed/VideoFeed";
import BlockAlert from "../../Alerts/BlockAlert";
import colors from "../../../../config/colors";
import { useIsFocused } from "@react-navigation/native";

const ReportUserModalScreen = ({ isCurrentUser, userProfile }) => {
  const navigation = useNavigation();
  const [forceRefresh, setForceRefresh] = useAtom(forceRefreshAtom);
  const [isBlockUserModalOpen, setIsBlockUserModalOpen] = useState(false);
  const [user, setUser] = useAtom(userAtom);

  const onBlockCompleted = async () => {
    setIsBlockUserModalOpen(false);
    setForceRefresh(true); // This will tell the video feed to refresh the post list, because we blocked someone
    navigation.goBack();
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    setIsBlockUserModalOpen(false);
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.topBar} horizontal={true}>
        {!isCurrentUser ? (
          <>
            <TouchableOpacity
              style={styles.fieldItemContainer}
              onPress={() => {
                navigation.navigate(routes.USER_REPORTS, {
                  profile: userProfile.username,
                });
              }}
            >
              <View style={styles.iconView}>
                <Feather name="flag" size={24} color={colors.secondary} />
              </View>
              <Text style={styles.text}>Report</Text>
            </TouchableOpacity>

            {!isCurrentUser && (
              <TouchableOpacity style={styles.fieldItemContainer}>
                <View style={styles.iconView}>
                  <MaterialIcons
                    onPress={() => setIsBlockUserModalOpen(true)}
                    name="block-flipped"
                    size={25}
                    color={colors.secondary}
                  />
                </View>
                <Text style={styles.text}>Block</Text>
              </TouchableOpacity>
            )}

            {/* Block modal */}
            <BlockAlert
              customAlertMessage={
                //   {userProfile.username}?
                <Text>
                  {user.username} would you like to block @
                  {userProfile.username}? This creator will not be able to send
                  you instant messages, see your content, or view or find your
                  profile. This user will not be notified that you have blocked
                  them.
                </Text>
              }
              positiveBtn="Block"
              negativeBtn="Cancel"
              modalVisible={isBlockUserModalOpen}
              dismissAlert={setIsBlockUserModalOpen}
              userIdToBlock={userProfile._id}
              onCompleted={onBlockCompleted}
            />
          </>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.modals,
    height: "12%",
  },
  text: {
    color: colors.secondary,
    bottom: 20,
    fontSize: 10,
    position: "absolute",
    top: 45,
    bottom: 0,
  },
  settingsText: {
    color: colors.secondary,
    textAlign: "center",
    paddingTop: 30,
  },
  fieldItemContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    marginLeft: 10,
  },
  fieldValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconView: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 45,
  },
  topBar: {
    marginTop: 10,
  },
});

export default ReportUserModalScreen;
