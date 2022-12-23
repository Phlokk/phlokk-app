import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
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
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [cameraFlash, setCameraFlash] = useState(
    Camera.Constants.FlashMode.off
  );

// Leaving this code here for the time being until I am ready to work on it. Still trying to figure out the local storage issue of why i cannot write to it. 

  // const randNum = uuid().toString();

 
  //   const SpeedUpVideo = () => {
  //     // Assume that the file 'original.mp4' is in the project directory
  //     const inputPath = 'original.mp4';
  //     const outputPath = randNum.mp4
  //     const speed = 2;  // This will speed up the video by a factor of 2
      
  //     // Use the ffmpeg-static package to create the command for speeding up the video
  //     const cmd = `-i ${inputPath} -filter_complex "[0:v]setpts=${1/speed}*PTS[v];[0:a]atempo=${speed}[a]" -map "[v]" -map "[a]" ${outputPath}`;
      
  //     // Execute the command using the ffmpeg-static package
  //     ffmpeg.ffmpeg(cmd, (err, data) => {
  //       if (err) {
  //         console.error(err);
  //       } else {
  //         console.log(data);
  //       }
  //     });
  //   }

  return (
    <View style={styles.iconRow}>
      <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() =>
            setCameraType(
              cameraType === Camera.Constants.Type.front
                ? Camera.Constants.Type.back
                : Camera.Constants.Type.front
            )
          }
        >
          <Feather name="refresh-ccw" size={24} color={colors.white} />
          <Text style={styles.iconText}>Flip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() =>
            setCameraFlash(
              cameraFlash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            )
          }
        >
          <Feather name="zap" size={24} color={colors.white} />
          <Text style={styles.iconText}>Flash</Text>
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
    top: -25,
    left: 1,
    
  },
  iconText: {
    color: colors.white,
    fontSize: 7,
    marginTop: 1,
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
