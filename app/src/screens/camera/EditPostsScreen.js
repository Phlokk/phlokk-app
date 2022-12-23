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
import { useNavigation } from "@react-navigation/native";
import BottomMenu from "./BottomMenu";
import colors from "../../../config/colors";

export default function EditPostsScreen({ route }) {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

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

      <TouchableOpacity
        style={styles.exitBtn}
        onPress={() => navigation.goBack()}
      >
        <Feather name="chevron-left" size={24} color={colors.secondary} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.nextText}
        onPress={() =>
          navigation.navigate("savePost", { videoUrl, videoThumb })
        }
      >
        <Text style={styles.postButtonText}>Next</Text>
      </TouchableOpacity>

      <View style={styles.bottomBarContainer}>
        <BottomMenu />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  bottomBarContainer: {
    flex: 1,
    backgroundColor: colors.black,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  nextText: {
    backgroundColor: colors.red,
    borderRadius: 4,
    paddingHorizontal: 8,
    padding: 3,

    position: "absolute",
    bottom: 100,
    left: 370,
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
  exitBtn: {
    position: "absolute", 
    alignItems: "center",
    borderRadius: 50,
    top: 50, 
    right: 380, 
    backgroundColor: colors.red,
  },
});
