import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import routes from "../../../navigation/routes";
import * as Linking from "expo-linking";
import colors from "../../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../../App";
import CustomAlert from "../../../components/Alerts/customAlert";

export default function ProfileNavBar({ showFireIcon }) {
  const navigation = useNavigation();

  const [user, setUser] = useAtom(userAtom);
  const [isGifting, setIsGifting] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const reportEmail = "https://support.phlokk.com"



  return (
    <View style={styles.container}>
      <CustomAlert
        alertTitle={<Text><MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>Light It Up{"\n"}coming in Official release</Text>}
        positiveBtn="Ok"
        modalVisible={isGifting}
        dismissAlert={setIsGifting}
        animationType="fade"
      />
      <TouchableOpacity
        onPress={() => setIsGifting(true)}

        // onPress={() => navigation.navigate(routes.BUY_GIFTS)}
        disabled={!showFireIcon}
      >
        <MaterialCommunityIcons
          name="fire"
          size={22}
          color={colors.orange}
          style={{ opacity: showFireIcon ? 1 : 0 }}
        />
      </TouchableOpacity>

      <Text style={styles.middleText}>{user.creator_type}</Text>
        <TouchableOpacity>
          <MaterialIcons
            onPress={ () => Linking.openURL(reportEmail)}
            name="contact-support"
            size={20}
            color={colors.secondary}
          />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    paddingVertical: 2,
    marginTop: 8,
  },
  text: {
    fontSize: 16,
    color: colors.white,
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  middleText: {
    color: colors.secondary,
    flex: 1,
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
  },
});
