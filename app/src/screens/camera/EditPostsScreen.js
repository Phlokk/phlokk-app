import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Video, Audio } from "expo-av";
import { useIsFocused } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import CustomAlert from "../../components/Alerts/CustomAlert";
import colors from "../../../config/colors";
import IconOverlay from "./IconOverlay";


export default function EditPostsScreen({ route }) {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  // Video Trimmer State
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);


  const [videoResizeMode, setVideoResizeMode] = useState(
    Video.RESIZE_MODE_COVER
  );

  const videoUrl = route.params.source;

  const videoThumb = route.params.sourceThumb;

  useEffect(() => {
    const setupAudio = async () => {
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    };
    setupAudio();
  }, []);


  // Video Trimmer function
 
  // const trimVideo = (inputFile, outputFile, startTime, endTime) => {
  //   setProcessing(true);
  //   setError(null);
  //   return new Promise((resolve, reject) => {
  //     const ffmpegCommand = `${ffmpeg} -i ${inputFile} -ss ${startTime} -to ${endTime} -c copy ${outputFile}`;
  //     exec(ffmpegCommand, (error, stdout, stderr) => {
  //       setProcessing(false);
  //       if (error) {
  //         console.error(`Error: ${error}`);
  //         setError(error);
  //         reject(error);
  //       }
  //       resolve(outputFile);
  //     });
  //   });
  // };



  return (
    <View style={styles.container}>
      <Video
        isMuted={!isFocused}
        resizeMode={videoResizeMode}
        shouldPlay={true}
        style={styles.videoPlayer}
        source={{ uri: videoUrl }}
        isLooping
        onReadyForDisplay={(e) => {
          const orientation = e.naturalSize.orientation;
          if (orientation === "landscape") {
            setVideoResizeMode(Video.RESIZE_MODE_CONTAIN);
          } else {
            setVideoResizeMode(Video.RESIZE_MODE_COVER);
          }
        }}
      />
      <View style={styles.sideBarContainer}>
        <IconOverlay />
      </View>
      
      <View style={styles.buttonsContainer}>
          <TouchableOpacity
            // onPress={() => navigation.navigate(routes.DRAFTS)}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          > 
            <MaterialIcons name="arrow-left" size={24} color={colors.secondary} />
            <Text style={styles.backButtonText}>Back </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("savePost", { videoUrl, videoThumb })
            }
            style={styles.postButton}
          >
            <Text style={styles.postButtonText}>Next </Text>
            <MaterialIcons name="arrow-right" size={24} color={colors.green} />
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  sideBarContainer: {
    // flex: 1,
    position: "absolute",
    right: 2,
    top: 30,
    
  },
  iconText: {
    color: colors.white,
    fontSize: 8,
    marginTop: 1,
  },
  soundText: {
    color: colors.white,
  },
  postButtonText: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  videoPlayer: {
    flex: 1,
  },

  // Bottom Container Next Button
  buttonsContainer: {
    flexDirection: "row",
    margin: 20,
    left: 7,
    bottom: 10,
  },
  backButton: {
    alignItems: "center",
    flex: 1,
    borderColor: colors.secondary,
    borderWidth: 0.5,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 4,
    marginRight: 10,
  },
  postButton: {
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.black,
    borderColor: colors.green,
    borderWidth: 0.5,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 4,
    marginRight: 10,
  },
  backButtonText: {
    marginLeft: 5,
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
  },
  postButtonText: {
    marginLeft: 5,
    color: colors.green,
    fontWeight: "bold",
    fontSize: 16,
  },

  // Trimmer 
  videoTrimmer: {
    height: 20, 
  },
 
});
