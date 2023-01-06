import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomAlert from "../../Alerts/CustomAlert";
import colors from "../../../../config/colors";
import { useTheme } from "../../../theme/context";

export default function ActivityNavBar(props) {
  const { theme, setTheme } = useTheme();

  const navigation = useNavigation();

  const [messages, setMessages] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={28}
          style={theme == "light" ? styles.chevron_light : styles.chevron_dark}
          onPress={() => navigation.goBack()}
        />
      </TouchableOpacity>

      <Text style={theme == "light" ? styles.title_light : styles.title_dark}>
        {props.title}
      </Text>

      <TouchableOpacity>
        <CustomAlert
          alertTitle={
            <Text>
              <MaterialIcons name="info" size={24} color={colors.green} />
            </Text>
          }
          customAlertMessage={<Text>Instant messages{"\n"}coming soon!</Text>}
          positiveBtn="Ok"
          modalVisible={messages}
          dismissAlert={setMessages}
          animationType="fade"
        />

        <MaterialCommunityIcons
          name="message-processing-outline"
          size={26}
          style={theme == "light" ? styles.message_light : styles.message_dark}
          onPress={() => setMessages(true)}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingVertical: 2,
  },

  title_light: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.black,
  },
  title_dark: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.secondary,
  },
  text: {
    color: colors.white,
  },
  chevron_light: {
    color: colors.black,
  },
  chevron_dark: {
    opacity: 0.6,
  },
  message_light: {
    color: colors.black,
  },
  message_dark: {
    color: colors.white,
  },
});
