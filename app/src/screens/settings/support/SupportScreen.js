import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
// import routes from "../../../navigation/routes";
import colors from "../../../../config/colors";
import CustomAlert from "../../../components/Alerts/customAlert";

export default function SupportScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [knowledgeBase, setKnowledgeBase] = useState(false);
  const [report, setReport] = useState(false);




  return (
    <View>
        <CustomAlert
        customAlertMessage={<Text>Reports{"\n"}coming in beta 2</Text>}
        positiveBtn="Ok"
        modalVisible={report}
        dismissAlert={setReport}
        animationType="fade"
      />
        <TouchableOpacity
         onPress={() =>setReport(true)}
          style={styles.fieldItemContainer}
          autoCapitalize="none"
        >
          <Text style={styles.text}>
            <MaterialCommunityIcons name="lead-pencil" size={14} color={colors.white} />   Report a problem</Text>
          <View style={styles.fieldValueContainer}>
            <Feather style={styles.chevron} name="chevron-right" size={20} color={colors.secondary} />
          </View>
        </TouchableOpacity>

        <CustomAlert
        customAlertMessage={<Text>Knowledge Base{"\n"}coming in official release</Text>}
        positiveBtn="Ok"
        modalVisible={knowledgeBase}
        dismissAlert={setKnowledgeBase}
        animationType="fade"
      />
        <TouchableOpacity
         onPress={() =>setKnowledgeBase(true)}
          style={styles.fieldItemContainer}
          autoCapitalize="none"
        >
          <Text style={styles.text}>
            <MaterialCommunityIcons name="shield-plus" size={14} color={colors.white} />   Help Center</Text>
          <View style={styles.fieldValueContainer}>
            <Feather style={styles.chevron} name="chevron-right" size={20} color={colors.secondary} />
          </View>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  fieldItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    color: colors.white,
    fontSize: 12,
  },
  divider: {
    borderBottomWidth: 0.3,
    borderColor: colors.secondary,
    marginTop: 10,
    opacity: 0.1,
  },
  chevron:{
    opacity: 0.6,

  },
});
