import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React, {useState} from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomAlert from "../../Alerts/CustomAlert";
import routes from "../../../navigation/routes";
import colors from "../../../../config/colors";

export default function ActivityNavBar(props) {
  const navigation = useNavigation();

  const [messages, setMessages] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={28}
          color="lightgray"
          onPress={() => navigation.goBack()}
        />
      </TouchableOpacity>

      <Text style={styles.title}>{props.title}</Text>

      <TouchableOpacity>
      <CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={
              <Text>Instant messages{"\n"}coming in beta 3</Text>
            }
            positiveBtn="Ok"
            modalVisible={messages}
            dismissAlert={setMessages}
            animationType="fade"
          />

        <MaterialCommunityIcons
          name="message-processing-outline"
          size={26}
          color="lightgray"
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

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.secondary,
  },
  text: {
    color: colors.white,
  },
});
