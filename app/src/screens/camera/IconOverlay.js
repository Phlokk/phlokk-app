import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../config/colors";
import CustomAlert from "../../components/Alerts/CustomAlert";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
// import uuid from 'uuid-random';

import routes from "../../navigation/routes";
function IconOverlay() {
  const navigation = useNavigation();

  const [textFrames, setTextFrames] = useState(false);
  const [digitalTiming, setDigitalTiming] = useState(false);

  const [replies, setReplies] = useState(false);
  const [soundbar, setSoundBar] = useState(false);
  const [isSeconds, setIsSeconds] = useState(false);
  const [isLive, setIsLive] = useState(false);



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
      <ScrollView >
        <CustomAlert
          alertTitle={
            <Text>
              <MaterialIcons name="info" size={24} color={colors.green} />
            </Text>
          }
          customAlertMessage={<Text>Seconds{"\n"}coming soon!</Text>}
          positiveBtn="Ok"
          modalVisible={isSeconds}
          dismissAlert={setIsSeconds}
          animationType="fade"
        />
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => setIsSeconds(true)}
        >
          <Ionicons name="timer-outline" size={24} color={colors.white} />
          <Text style={styles.iconText}>Secs</Text>
        </TouchableOpacity>

        <CustomAlert
          alertTitle={
            <Text>
              <MaterialIcons name="info" size={24} color={colors.green} />
            </Text>
          }
          customAlertMessage={<Text>Text w/ keyframes{"\n"}coming soon!</Text>}
          positiveBtn="Ok"
          modalVisible={textFrames}
          dismissAlert={setTextFrames}
          animationType="fade"
        />
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => setTextFrames(true)}
        >
          <Feather name="align-left" size={24} color={colors.white} />
          <Text style={styles.iconText}>Text</Text>
        </TouchableOpacity>
        <CustomAlert
          alertTitle={
            <Text>
              <MaterialIcons name="info" size={24} color={colors.green} />
            </Text>
          }
          customAlertMessage={<Text>Digital Timing{"\n"}coming soon!</Text>}
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
            color={colors.white}
          />
          <Text style={styles.iconText}>Timing</Text>
        </TouchableOpacity>
        
        <CustomAlert
          alertTitle={
            <Text>
              <MaterialIcons name="info" size={24} color={colors.green} />
            </Text>
          }
          customAlertMessage={<Text>Replies{"\n"}coming soon!</Text>}
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
            color={colors.white}
          />
          <Text style={styles.iconText}>Replies</Text>
        </TouchableOpacity>
        <CustomAlert
          alertTitle={
            <Text>
              <MaterialIcons name="info" size={24} color={colors.green} />
            </Text>
          }
          customAlertMessage={<Text>Sound Bar{"\n"}coming soon!</Text>}
          positiveBtn="Ok"
          modalVisible={soundbar}
          dismissAlert={setSoundBar}
          animationType="fade"
        />
        <TouchableOpacity
          style={styles.sideBarButton}
          // onPress={() => setSoundBar(true)}

          onPress={() => navigation.navigate(routes.SOUNDS)}
        >
          <Entypo name="beamed-note" size={24} color={colors.white} />
          <Text style={styles.iconText}>Sounds</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // iconRow: {
  //   paddingTop: 20,
  // },
  iconText: {
    color: colors.white,
    fontSize: 7,
    marginTop: 1,
  },
  sideBarButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  backBtn: {
    justifyContent: "center",
  },
});

export default IconOverlay;
