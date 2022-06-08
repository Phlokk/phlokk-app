import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, {useState} from "react";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import routes from "../../../navigation/routes";
import CustomAlert from "../../Alerts/customAlert"
import colors from "../../../../config/colors";

const SettingsModalScreen = (props) => {
  const navigation = useNavigation();
  const [marketAlert, setMarketAlert] = useState(false)
  const handleClosePress = () => props.bottomSheetRef.current.close();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.fieldItemContainer}
        autoCapitalize="none"
        onPress={() => {
          navigation.navigate(routes.SETTINGS_SCREEN);
          handleClosePress();
        }}
      >
        <Text style={styles.text}>
          <MaterialIcons name="settings" size={14} color={colors.green} /> Settings
          and privacy
        </Text>

        <View style={styles.fieldValueContainer}>
          <Feather name="chevron-right" size={28} color="#131313" />
        </View>
      </TouchableOpacity>
      <CustomAlert
          alertTitle="Alert!"
          customAlertMessage="Phlokk Market coming in official release!"
          positiveBtn="Ok"
          modalVisible={marketAlert}
          dismissAlert={setMarketAlert}
          animationType="fade"
        />
      <TouchableOpacity
        style={styles.fieldItemContainer}
        autoCapitalize="none"
        // onPress={() => { navigation.navigate(routes.MARKET)
        //   handleClosePress()

        // }}
        onPress={() =>
          setMarketAlert(true)
        }
      >
        <Text style={styles.text}>
          <Entypo name="shop" size={14} color={colors.green} /> Phlokk Market
        </Text>

        <View style={styles.fieldValueContainer}>
          <Feather name="chevron-right" size={28} color="#131313" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.green,
  },

  fieldItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    padding: 5,
    marginLeft: 10,
  },
  fieldValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SettingsModalScreen;
