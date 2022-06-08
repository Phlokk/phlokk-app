import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import routes from "../../../navigation/routes";
import colors from "../../../../config/colors";
import CustomAlert from "../../Alerts/customAlert"

export default function RecordingNavBar({
  title = "Edit profile",
  leftButton = { display: false },
}) {
  const navigation = useNavigation();
  const [isRecording, setIsRecording] = useState(false)
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="keyboard-arrow-left" size={28} color="lightgray" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>
      <CustomAlert
          alertTitle="Alert!"
          customAlertMessage="Custom Audio Center coming in official release. Record your own sounds!"
          positiveBtn="Ok"
          modalVisible={isRecording}
          dismissAlert={setIsRecording}
          animationType="fade"
        />
      <TouchableOpacity
        style={styles.button}
        onPress={() => (leftButton.display ? leftButton.action() : null)}
      >
        <MaterialCommunityIcons
          // onPress={() => navigation.navigate(routes.RECORDING_SCREEN)}
          onPress={() => setIsRecording(true)}
          name="microphone-settings"
          size={24}
          color={colors.secondary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.secondary,
  },
  text: {
    color: colors.black,
  },
});
