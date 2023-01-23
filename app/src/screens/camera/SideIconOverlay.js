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
      <View style={styles.sideBarButtonView}>
      <TouchableOpacity

            onPress={() => navigation.goBack()}
            style={styles.sideBarBackButton}
          > 
            <MaterialIcons name="arrow-left" size={28} color={colors.red} />
            
      </TouchableOpacity>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => setSpeed(true)}
        >
          <Octicons name="dashboard" size={18} color={colors.white} />
          <Text style={styles.iconText}>Speed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => setReplies(true)}
        >
          <MaterialIcons
        
            name="chat-bubble-outline"
            size={18}
            color={colors.white}
          />
          <Text style={styles.iconText}>Reply</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => navigation.navigate(routes.SOUNDS)}
        >
          <MaterialCommunityIcons name="waveform" size={18} color={colors.white}  />
          <Text style={styles.iconText}>Wav</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => setIsLive(true)}
        >
          <Feather name="video" size={18} color={colors.white} />
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
    color: colors.white,
    fontSize: 7,
    
  },
  sideBarButton: {
    padding: 1,
    margin: 15,
    // borderWidth: 0.7,
    // borderColor: colors.secondary,
    // borderRadius: 7,
    
    paddingHorizontal: 10, 
    justifyContent: "space-between",
    alignItems: "center",
    
  },
  sideBarBackButton: {
    
    margin: 15,
    borderWidth: 0.7,
    borderColor: colors.secondary,
    borderRadius: 50,
    
    paddingHorizontal: 10, 
    justifyContent: "space-between",
    alignItems: "center",
    
  },
  backBtn: {
    justifyContent: "center",
  },
  sideBarButtonView: {
    top: 30,
    flexDirection: "row",
    backgroundColor: 'rgba(125, 125, 125, 0.2)',
    borderRadius: 50, 

  },
  
});

export default SideIconOverlay;
