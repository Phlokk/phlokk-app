import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {Video, Audio} from 'expo-av';
import { useIsFocused } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BottomMenu from "./BottomMenu";
import colors from "../../../config/colors";

export default function EditPostsScreen({route}) {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [shouldPlay, setShouldPlay] = useState(true);

  const [videoResizeMode, setVideoResizeMode] = useState(
		Video.RESIZE_MODE_COVER
	);

  const videoUrl = (
    route.params.source
  );

  const videoThumb = (
    route.params.sourceThumb
  );

  useEffect(() => {
		const setupAudio = async () => {
			await Audio.setAudioModeAsync({playsInSilentModeIOS: true});
		};
		setupAudio();
	}, []);
  

  console.log(videoUrl);

  return (
    <View style={styles.container}>
      
      
      <Video 
      isMuted={!isFocused}
      resizeMode={videoResizeMode}
      shouldPlay={true}
      style={styles.videoPlayer} 
      source={{ uri: videoUrl }}
      isLooping 
      onReadyForDisplay={e => {
        const orientation = e.naturalSize.orientation;
        if (orientation === 'landscape') {
          setVideoResizeMode(Video.RESIZE_MODE_CONTAIN);
        } else {
          setVideoResizeMode(Video.RESIZE_MODE_COVER);
        }
      }}
      />
     
      <TouchableOpacity
        style={{ position: "absolute", top: 50, right: 380 }}
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left-circle" size={25} color={colors.secondary} />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.savePostsArrow}
        onPress={() =>
          navigation.navigate("savePost", { videoUrl, videoThumb })
        }
      >
        <Feather name="arrow-right-circle" size={25} color={colors.green} />
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
  savePostsArrow: {
    position: "absolute",
    bottom: 100,
    left: 360,
  },
  iconText: {
    color: colors.white,
    fontSize: 8,
    marginTop: 1,
  },

  soundText: {
    color: colors.white,
  },
  videoPlayer: {
    flex: 1,

  },
});
