import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Video, Audio } from "expo-av";
import { useIsFocused } from "@react-navigation/core";
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import colors from "../../../config/colors";
import IconOverlay from "./IconOverlay";


export default function EditPostsScreen({ route }) {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  // Video Trimmer State
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);


  const [videoResizeMode, setVideoResizeMode] = useState(
    Video.RESIZE_MODE_COVER
  );
  

  const videoThumb = route.params.sourceThumb;

  useEffect(() => {
    console.log("editposts screen console log ",route.params)
    // const outputFilePath =  (Platform.OS === "android" ? route.params.outputFilePath : route.params.outputFilePath.replace('file:///', ''))
    setVideoUrl(route.params.source );
    const setupAudio = async () => {
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    };
    setupAudio();
  }, []);





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
            <MaterialIcons name="arrow-left" size={24} color={colors.white} />
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
    position: "absolute",
    top: 40,
    bottom: 0,
    right: 0,
    left: 350,
    flex: 1, 
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
    backgroundColor: 'rgba(125, 125, 125, 0.1)',
    borderRadius: 50, 
    borderWidth: 0.5,
    borderColor: colors.secondary,
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "center",
    marginRight: 10,
  },
  postButton: {
    alignItems: "center",
    flex: 1,
    backgroundColor: 'rgba(125, 125, 125, 0.1)',
    borderRadius: 50, 
    borderWidth: 0.5,
    borderColor: colors.green,
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "center",
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
