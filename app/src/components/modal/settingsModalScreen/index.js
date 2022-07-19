import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import routes from "../../../navigation/routes";
import CustomAlert from "../../Alerts/customAlert";
import colors from "../../../../config/colors";

function SettingsModalScreen({ user }) {
  const navigation = useNavigation();
  const [marketAlert, setMarketAlert] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.fieldItemContainer}
        onPress={() => {
          navigation.navigate(routes.SETTINGS_SCREEN);
        }}
      >
        <MaterialIcons
          name="settings-applications"
          size={17}
          color={colors.green}
        />
        <Text style={styles.text}> Settings and privacy</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.fieldItemContainer}
        onPress={() => {
          navigation.navigate(routes.EDIT, { user });
        }}
      >
        <Text style={styles.text}>
          <Text>
            <Feather name="user" size={14} color={colors.green} /> Edit profile
          </Text>
        </Text>
      </TouchableOpacity>

      <CustomAlert
        customAlertMessage={
          <Text>Phlokk Market{"\n"}coming in official release</Text>
        }
        positiveBtn="Ok"
        modalVisible={marketAlert}
        dismissAlert={setMarketAlert}
        animationType="fade"
      />
      <TouchableOpacity
        style={styles.fieldItemContainer}
        // onPress={() => { navigation.navigate(routes.MARKET)

        // }}
        onPress={() => setMarketAlert(true)}
      >
        <Text style={styles.text}>
          <Entypo name="shop" size={14} color={colors.green} /> Phlokk Market
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "30%",
    backgroundColor: colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  text: {
    color: colors.green,
  },
  textSettingsIcon: {
    color: colors.green,
  },

  fieldItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    padding: 5,
    marginLeft: 10,
    marginTop: 20,
    color: colors.green,
  },
});

export default SettingsModalScreen;
