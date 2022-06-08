import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../config/colors";
import CustomAlert from "../../components/Alerts/customAlert";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";


import routes from "../../navigation/routes";
function IconOverlay() {
  const navigation = useNavigation();

  const [textFrames, setTextFrames] = useState(false);
  const [digitalTiming, setDigitalTiming] = useState(false);
  const [speed, setSpeed] = useState(false);
  const [fX, setFx] = useState(false);
  const [replies, setReplies] = useState(false);
  return (
    <View>
      <CustomAlert
        alertTitle={<Text> <MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>Text w/ keyframes{"\n"}coming in beta 3</Text>}
        positiveBtn="Ok"
        modalVisible={textFrames}
        dismissAlert={setTextFrames}
        animationType="fade"
      />
      <TouchableOpacity
        style={styles.sideBarButton}
        onPress={() => setTextFrames(true)}
      >
        <Feather name="align-left" size={24} color={colors.green} />
        <Text style={styles.iconText}>Text</Text>
      </TouchableOpacity>
      <CustomAlert
        alertTitle={<Text> <MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>Digital Timing{"\n"}coming in beta 3</Text>}
        positiveBtn="Ok"
        modalVisible={digitalTiming}
        dismissAlert={setDigitalTiming}
        animationType="fade"
      />
      <TouchableOpacity
        style={styles.sideBarButton}
        onPress={() => setDigitalTiming(true)}
      >
        <MaterialCommunityIcons
          name="account-clock-outline"
          size={24}
          color={colors.green}
        />
        <Text style={styles.iconText}>Timing</Text>
      </TouchableOpacity>
      <CustomAlert
        alertTitle={<Text> <MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>Speed{"\n"}coming in beta 3</Text>}
        positiveBtn="Ok"
        modalVisible={speed}
        dismissAlert={setSpeed}
        animationType="fade"
      />
      <TouchableOpacity
        style={styles.sideBarButton}
        onPress={() => setSpeed(true)}
      >
        <Octicons name="dashboard" size={24} color={colors.green} />
        <Text style={styles.iconText}>Speed</Text>
      </TouchableOpacity>
      <CustomAlert
        alertTitle={<Text> <MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>FX{"\n"}coming in beta 3</Text>}
        positiveBtn="Ok"
        modalVisible={fX}
        dismissAlert={setFx}
        animationType="fade"
      />
      <TouchableOpacity
        style={styles.sideBarButton}
        onPress={() => setFx(true)}
      >
        <FontAwesome name="magic" size={24} color={colors.green} />
        <Text style={styles.iconText}>FX</Text>
      </TouchableOpacity>
      <CustomAlert
        alertTitle={<Text> <MaterialIcons name="info" size={24} color={colors.green} /></Text>}
        customAlertMessage={<Text>Replies{"\n"}coming in beta 3</Text>}
        positiveBtn="Ok"
        modalVisible={replies}
        dismissAlert={setReplies}
        animationType="fade"
      />
      <TouchableOpacity
        style={styles.sideBarButton}
        onPress={() => setReplies(true)}
      >
        <MaterialIcons
          name="chat-bubble-outline"
          size={24}
          color={colors.green}
        />
        <Text style={styles.iconText}>Replies</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sideBarButton}
        onPress={() => navigation.navigate(routes.SOUNDS)}
        // onPress={() => Alert.alert("Sound Bar", "Coming in beta version 3!")}
      >
        <Entypo name="beamed-note" size={24} color={colors.green} />
        <Text style={styles.iconText}>Sounds</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconText: {
    color: colors.white,
    fontSize: 6,
    marginTop: 1,
  },
  sideBarButton: {
    alignItems: "center",
    marginBottom: 25,
  },
  
});

export default IconOverlay;
