import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../../config/colors";
import CustomAlert from "../../../components/Alerts/CustomAlert";
import { useTheme } from "../../../theme/context";
import { useAtom } from "jotai";
import { userAtom } from "../../../services/appStateAtoms";
// import routes from "../../../navigation/routes";


export default function SupportScreen() {
  const { theme, setTheme } = useTheme();
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [knowledgeBase, setKnowledgeBase] = useState(false);
  const [report, setReport] = useState(false);

  return (
    <View>
      <CustomAlert
        customAlertMessage={<Text>Reports{"\n"}coming soon!</Text>}
        positiveBtn="Ok"
        modalVisible={report}
        dismissAlert={setReport}
        animationType="fade"
      />
      <TouchableOpacity
        onPress={() => setReport(true)}
        // onPress={() =>
        //   navigation.navigate(routes.REPORT_PROBLEM, {
        //     title: "Report",
        //     field: "report",
        //     value: currentUser.username,
        //   })
        // }
        style={styles.fieldItemContainer}
        autoCapitalize="none"
      >
        <Text style={theme == "light" ? styles.text_light : styles.text_dark}>
          <MaterialCommunityIcons
            name="lead-pencil"
            size={14}
            style={theme == "light" ? styles.icon_light : styles.icon_dark}
          />{" "}
          Report a problem
        </Text>
        <View style={styles.fieldValueContainer}>
          <Feather
            style={
              theme == "light" ? styles.chevron_light : styles.chevron_dark
            }
            name="chevron-right"
            size={20}
            color={colors.secondary}
          />
        </View>
      </TouchableOpacity>

      <CustomAlert
        customAlertMessage={
          <Text>Knowledge Base{"\n"}coming in official release</Text>
        }
        positiveBtn="Ok"
        modalVisible={knowledgeBase}
        dismissAlert={setKnowledgeBase}
        animationType="fade"
      />
      <TouchableOpacity
        onPress={() => setKnowledgeBase(true)}
        style={styles.fieldItemContainer}
        autoCapitalize="none"
      >
        <Text style={theme == "light" ? styles.text_light : styles.text_dark}>
          <MaterialCommunityIcons
            name="shield-plus"
            size={14}
            style={theme == "light" ? styles.icon_light : styles.icon_dark}
          />{" "}
          Help Center
        </Text>
        <View style={styles.fieldValueContainer}>
          <Feather
            style={
              theme == "light" ? styles.chevron_light : styles.chevron_dark
            }
            name="chevron-right"
            size={20}
            color={colors.secondary}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fieldItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  text_light: {
    color: colors.black,
    fontSize: 12,
  },
  text_dark: {
    color: colors.white,
    fontSize: 12,
  },
  divider: {
    borderBottomWidth: 0.3,
    borderColor: colors.secondary,
    marginTop: 10,
    opacity: 0.1,
  },
  chevron_light: {
    color: colors.black,
  },
  chevron_dark: {
    opacity: 0.6,
  },
  icon_light: {
    color: colors.black,
  },
  icon_dark: {
    color: colors.white,
  },
});
