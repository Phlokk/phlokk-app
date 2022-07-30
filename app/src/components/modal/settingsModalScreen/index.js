import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import routes from "../../../navigation/routes";
import CustomAlert from "../../Alerts/customAlert";
import colors from "../../../../config/colors";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";


function SettingsModalScreen({ user }) {
  const navigation = useNavigation();
  const [marketAlert, setMarketAlert] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView
      horizontal={true}
      >
      <TouchableWithoutFeedback
        style={styles.fieldItemContainer}
        onPress={() => {
          navigation.navigate(routes.SETTINGS_SCREEN);
        }}
      >
        <View style={styles.bubble}>
        <Ionicons
          name="settings-sharp"
          size={27}
          color={colors.secondary}
        />
        </View>
        <Text style={styles.text}> Settings</Text>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        style={styles.fieldItemContainer}
        onPress={() => {
          navigation.navigate(routes.EDIT, { user });
          
        }}
      >
        
        <View style={styles.bubble}>
            <Feather name="user" size={24} color={colors.secondary} /> 
        </View>
        <Text style={styles.text}> Edit profile</Text>
      </TouchableWithoutFeedback>

      <CustomAlert
        customAlertMessage={
          <Text>Phlokk Market{"\n"}coming in official release</Text>
        }
        positiveBtn="Ok"
        modalVisible={marketAlert}
        dismissAlert={setMarketAlert}
        animationType="fade"
      />
      <TouchableWithoutFeedback
        style={styles.fieldItemContainer}
        // onPress={() => { navigation.navigate(routes.MARKET)

        // }}
        onPress={() => setMarketAlert(true)}
      >
        <View style={styles.bubble}>
          <Entypo name="shop" size={24} color={colors.secondary} />
          </View>
        <Text style={styles.text}> Market</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        style={styles.fieldItemContainer}
        onPress={() => { navigation.navigate(routes.GUIDELINES)

        }}

      >
        <View style={styles.bubble}>
          <FontAwesome name="hand-stop-o" size={24} color={colors.secondary} />
          </View>
        <Text style={styles.text}> Guidelines</Text>
      </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "20%",
    backgroundColor: colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  text: {
    color: colors.secondary,
    paddingTop: 5,
    fontSize: 10,
  },
  textSettingsIcon: {
    color: colors.green,
  },

  fieldItemContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    padding: 5,
    marginLeft: 10,
  },
  bubble: {
    backgroundColor: colors.darkGrey,
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.secondary,
    opacity: 0.7,
  },
});

export default SettingsModalScreen;
