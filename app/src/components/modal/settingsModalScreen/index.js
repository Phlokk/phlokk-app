import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import routes from "../../../navigation/routes";
import CustomAlert from "../../Alerts/customAlert";
import colors from "../../../../config/colors";

const SettingsModalScreen = (props) => {
  const navigation = useNavigation();
  const [marketAlert, setMarketAlert] = useState(false);
  const handleClosePress = () => props.bottomSheetRef.current.close();

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.fieldItemContainer}
        onPress={() => {
          navigation.navigate(routes.SETTINGS_SCREEN);
          handleClosePress();
        }}
      >
          <MaterialIcons name="settings-applications" size={17} color={colors.green} /> 
          <Text style={styles.text}> Settings and privacy</Text>
       
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.fieldItemContainer}
        onPress={() => {
          navigation.navigate(routes.EDIT);
          handleClosePress();
        }}
      >
        <Text style={styles.text}>
        <Text><Feather name="user" size={14} color={colors.green} /> Edit profile</Text>
          </Text>
      </TouchableOpacity>

      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
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
        //   handleClosePress()

        // }}
        onPress={() => setMarketAlert(true)}
      >
        <Text style={styles.text}>
          <Entypo name="shop" size={14} color={colors.green} /> Phlokk Market</Text>
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
  textSettingsIcon:{
    color: colors.green,
  },

  fieldItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    padding: 5,
    marginLeft: 10,
    marginTop: 20,
    color: colors.green
  },
});

export default SettingsModalScreen;
