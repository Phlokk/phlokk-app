import React, { useState } from "react";
import { View, Text } from "react-native";
import axios from "../redux/apis/axiosDeclaration";
import { MaterialIcons } from "@expo/vector-icons";

export const getAllSounds = async () => {
  try {
    const result = await axios.get(`/api/features/sounds`);
    return result.data;
  } catch (e) {
    console.log("Error", e)
    setSoundError(true);
  }
};

const sounds = () => {
  const [soundError, setSoundError] = useState(false);
  return (
    <View>
      <Text>sounds</Text>
      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>No sounds could be found!</Text>}
        positiveBtn="Ok"
        modalVisible={soundError}
        dismissAlert={setSoundError}
        animationType="fade"
      />
    </View>
  );
};

export default sounds;
