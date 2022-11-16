import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import routes from "../../../navigation/routes";
import colors from "../../../../config/colors";
import SettingsNavBar from "../../../components/general/settings/SettingsNavBar";

export default function PrivacyScreen() {
  const auth = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [blocking, setBlocking] = useState(false);
  const [security, setSecurity] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <SettingsNavBar title="Privacy" />
      <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.BLOCKED_LIST_SCREEN, {
              title: "Blocked Accounts",
            })
          }
          style={styles.fieldItemContainer}
          autoCapitalize="none"
        >
          <Text style={styles.text}>Blocked Accounts</Text>
          <View style={styles.fieldValueContainer}>
            <Feather
              style={styles.chevron}
              name="chevron-right"
              size={20}
              color={colors.secondary}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  fieldsContainer: {
    marginTop: 20,
    padding: 10,
    flex: 1,
  },
  rowContainer: {
    padding: 20,
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
    // textAlign: "center",
    color: colors.white,
    fontSize: 12,
  },
  chevron: {
    opacity: 0.6,
  },
});
