import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import colors from "../../../config/colors";
import CustomAlert from "../../components/Alerts/CustomAlert";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

// import routes from "../../navigation/routes";
function SideIconOverlay() {
  // const navigation = useNavigation();
  const [isLive, setIsLive] = useState(false);
  const [speed, setSpeed] = useState(false);
  const [fX, setFx] = useState(false);


  return (
    <View style={styles.iconRow}>
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
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => setSpeed(true)}
        >
          <Octicons name="dashboard" size={24} color={colors.white} />
          <Text style={styles.iconText}>Speed</Text>
        </TouchableOpacity>
        <CustomAlert
          alertTitle={
            <Text>
              <MaterialIcons name="info" size={24} color={colors.green} />
            </Text>
          }
          customAlertMessage={<Text>FX{"\n"}coming soon!</Text>}
          positiveBtn="Ok"
          modalVisible={fX}
          dismissAlert={setFx}
          animationType="fade"
        />
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => setFx(true)}
        >
          <FontAwesome name="magic" size={24} color={colors.white} />
          <Text style={styles.iconText}>FX</Text>
        </TouchableOpacity>

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
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => setIsLive(true)}
        >
          <Feather name="video" size={24} color={colors.green} />
          <Text style={styles.iconText}>LIVE</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconRow: {
    justifyContent: "space-between",
    flex: 1,
    position: "absolute",
    top: 95,
   
  },
  iconText: {
    color: colors.white,
    fontSize: 7,
    marginTop: 10,
  },
  sideBarButton: {
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    
  },
  backBtn: {
    justifyContent: "center",
  },
});

export default SideIconOverlay;
