import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'; 
import routes from "../../../navigation/routes";
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
            <MaterialCommunityIcons name="lead-pencil" size={12} color={colors.secondary} /> Report a problem</Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={28} color={colors.white} />
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
            <MaterialCommunityIcons name="shield-plus" size={12} color={colors.secondary} /> Help Center</Text>
          <View style={styles.fieldValueContainer}>
            <Feather name="chevron-right" size={28} color={colors.white} />
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
  fieldsContainer: {
    marginTop: 20,
    padding: 20,
    flex: 1,
  },
  fieldItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  fieldValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: colors.secondary,
    fontSize: 12,
  },
  socialText: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 8,
    marginTop: 20,
  },
});
