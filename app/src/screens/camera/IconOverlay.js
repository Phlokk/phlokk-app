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
function IconOverlay() {
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
    <View style={styles.iconRow}>
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
        <Feather
          style={styles.iconOpacity}
          name="align-left"
          size={18}
          color={colors.white}
        />
        <Text style={styles.iconText}>Text</Text>
      </TouchableOpacity>
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
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconRow: {
    top: -10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  iconText: {
    color: colors.white,
    fontSize: 7,
    marginTop: 1,
  },
  iconTextFx: {
    color: colors.white,
    fontSize: 7,
    marginTop: 1,
    top: 2,
  },
  sideBarButton: {
    padding: 5,
    borderWidth: 0.7,
    borderColor: colors.secondary,
    borderRadius: 7,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  backBtn: {
    justifyContent: "center",
  },
  iconOpacity: {
    opacity: 0.7,
  },
});

export default IconOverlay;
