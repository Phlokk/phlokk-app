import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../config/colors";
import CustomAlert from "../../components/Alerts/CustomAlert";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

// import uuid from 'uuid-random';

import routes from "../../navigation/routes";
const IconOverlay = () => {
  const navigation = useNavigation();

  const [textFrames, setTextFrames] = useState(false);
  const [trimming, setTrimming] = useState(false);
  const [fX, setFx] = useState(false);
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
    <View>

      <View style={styles.sideBarButtonView}>
      <TouchableOpacity
        style={styles.sideBarButton}
        onPress={() => setIsSeconds(true)}
      >
        <MaterialCommunityIcons
          style={styles.iconOpacity}
          name="movie-edit"
          size={18}
          color={colors.white}
        />
        <Text style={styles.iconText}>Edit</Text>
      </TouchableOpacity>

      
      <TouchableOpacity
        style={styles.sideBarButton}
        onPress={() => setTextFrames(true)}
      >
        <Feather
          style={styles.iconOpacity}
          name="align-left"
          size={18}
          color={colors.white}
        />
        <Text style={styles.iconText}>Text</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.sideBarButton}
        onPress={() => setTrimming(true)}
      >
        <Entypo
          style={styles.iconOpacity}
          name="scissors"
          size={18}
          color={colors.white}
        />
        <Text style={styles.iconText}>Trim</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.sideBarButton}
        onPress={() => setFx(true)}
      >
        <FontAwesome
          style={styles.iconOpacity}
          name="magic"
          size={18}
          color={colors.white}
        />
        <Text style={styles.iconTextFx}>FX</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.sideBarButton}
        // onPress={() => setSoundBar(true)}

        onPress={() => navigation.navigate(routes.SOUNDS)}
      >
        <MaterialCommunityIcons
          style={styles.iconOpacity}
          name="waveform"
          size={18}
          color={colors.white}
        />

        <Text style={styles.iconText}>Wav</Text>
      </TouchableOpacity>
      </View>
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
      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Timeline Editing{"\n"}coming soon!</Text>}
        positiveBtn="Ok"
        modalVisible={isSeconds}
        dismissAlert={setIsSeconds}
        animationType="fade"
      />
      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Trim video{"\n"}coming soon!</Text>}
        positiveBtn="Ok"
        modalVisible={trimming}
        dismissAlert={setTrimming}
        animationType="fade"
      />
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
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconText: {
    color: colors.white,
    fontSize: 7,
    marginTop: 1,
    width: 20,
  },
  iconTextFx: {
    color: colors.white,
    fontSize: 7,
    marginTop: 1,
    top: 2,
    
  },
 sideBarButton: {
    padding: 1,
    margin: 15,
    top: -5, 
    justifyContent: "space-between",
    alignItems: "center",
  },
  sideBarNextButton: {
    padding: 1,
    top: 10, 
    justifyContent: "space-between",
    alignItems: "center",
  },
  backBtn: {
    justifyContent: "center",
  },
  iconOpacity: {
    opacity: 0.7,
  },
  sideBarButtonView: {
    right: 10,
    backgroundColor: 'rgba(125, 125, 125, 0.2)',
    borderRadius: 50, 

  },
});

export default IconOverlay;
