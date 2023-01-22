import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import colors from "../../../config/colors";
import CustomAlert from "../../components/Alerts/CustomAlert";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import routes from "../../navigation/routes";

function SideIconOverlay() {

  const navigation = useNavigation();
  const [isLive, setIsLive] = useState(false);
  const [speed, setSpeed] = useState(false);
  const [replies, setReplies] = useState(false);


  return (
    <View style={styles.iconRow}>
      <TouchableOpacity
            // onPress={() => navigation.navigate(routes.DRAFTS)}
            onPress={() => navigation.goBack()}
            style={styles.sideBarButton}
          > 
            <MaterialIcons style={styles.iconOpacity} name="arrow-left" size={28} color={colors.green} />
            
          </TouchableOpacity>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => setSpeed(true)}
        >
          <Octicons style={styles.iconOpacity} name="dashboard" size={18} color={colors.green} />
          <Text style={styles.iconText}>Speed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => setReplies(true)}
        >
          <MaterialIcons
          style={styles.iconOpacity}
            name="chat-bubble-outline"
            size={18}
            color={colors.green}
          />
          <Text style={styles.iconText}>Reply</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => navigation.navigate(routes.SOUNDS)}
        >
          <MaterialCommunityIcons style={styles.iconOpacity} name="waveform" size={18} color={colors.green}  />
          <Text style={styles.iconText}>Wav</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => setIsLive(true)}
        >
          <Feather style={styles.iconOpacity} name="video" size={18} color={colors.green} />
          <Text style={styles.iconText}>LIVE</Text>
        </TouchableOpacity>
        <CustomAlert
          alertTitle={
            <Text>
              <MaterialIcons name="info" size={24} color={colors.green} />
            </Text>
          }
          customAlertMessage={<Text>Speed{"\n"}coming soon!</Text>}
          positiveBtn="Ok"
          modalVisible={speed}
          dismissAlert={setSpeed}
          animationType="fade"
        />
        <CustomAlert
          alertTitle={
            <Text>
              <MaterialIcons name="info" size={24} color={colors.green} />
            </Text>
          }
          customAlertMessage={<Text>Reply{"\n"}coming soon!</Text>}
          positiveBtn="Ok"
          modalVisible={replies}
          dismissAlert={setReplies}
          animationType="fade"
        />
        <CustomAlert
          alertTitle={
            <Text>
              <MaterialIcons name="info" size={24} color={colors.green} />
            </Text>
          }
          customAlertMessage={<Text>LIVE{"\n"}coming soon!</Text>}
          positiveBtn="Ok"
          modalVisible={isLive}
          dismissAlert={setIsLive}
          animationType="fade"
        />
    </View>
  );
}

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    position: "absolute",
    top: 95,
   
  },
  iconText: {
    textAlign: "center",
    width: 30, 
    color: colors.green,
    fontSize: 7,
    
  },
  sideBarButton: {
    padding: 5,
    margin: 15,
    borderWidth: 0.7,
    borderColor: colors.secondary,
    borderRadius: 7,
    top: 30,
    paddingHorizontal: 10, 
    justifyContent: "space-between",
    alignItems: "center",
    
  },
  backBtn: {
    justifyContent: "center",
  },
  iconOpacity: {
    opacity: 0.7,
  },
});

export default SideIconOverlay;
