import React, { useEffect, useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Video, Audio } from "expo-av";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import PostSingleOverlay from "../../components/general/post/overlay";
import UserProfileOverlay from "../../components/general/post/overlay/UserProfileOverlay";
import colors from "../../../config/colors";
import { LinearGradient } from "expo-linear-gradient";

const VideoItem = ({
  item,
  index,
  currentVideoIndex,
  feedItemHeight,
  setCurrentVideoPlayingStat,
}) => {
  const [shouldPlay, setShouldPlay] = useState(true);
  const isFocused = useIsFocused();

  // Set up audio play mode for iOS
  useEffect(() => {
    const setupAudio = async () => {
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    };
    setupAudio();
  }, []);

  // watches for index change upon scroll to reset the video status
  useEffect(() => {
    setShouldPlay(true);
  }, [currentVideoIndex]);

  //this is called to play or pause the video
  const playPauseVideo = () => {
    setShouldPlay(!shouldPlay);
  };

  const displayPauseIcon = () => (
    <FontAwesome5
      name="play"
      size={50}
      color={colors.white}
      style={styles.pauseIcon}
    />
  );

  return (
    <View style={{ height: feedItemHeight, backgroundColor: "black" }}>
      <Pressable style={{ flex: 1 }} onPress={playPauseVideo}>
        <Video
          source={{
            uri: item.media[0].original_url,
            type: item.media[0].mime_type,
          }}
          isMuted={currentVideoIndex !== index || !isFocused}
          resizeMode={Video.RESIZE_MODE_COVER}
          style={styles.videoRenderer}
          shouldPlay={currentVideoIndex === index && shouldPlay}
          isLooping
          usePoster
          posterSource={{ uri: item.poster }}
          posterStyle={{ resizeMode: "cover", height: "100%" }}
          onPlaybackStatusUpdate={(status) =>
            setCurrentVideoPlayingStat(status)
          }
        />
        {shouldPlay ? null : displayPauseIcon()}
      </Pressable>

      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 650,
        }}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.4)"]}
          style={{ height: 650, width: "100%" }}
        />
      </View>

      <UserProfileOverlay user={item.user} post={item} />
      <PostSingleOverlay user={item.user} post={item} />
    </View>
  );
};

const styles = StyleSheet.create({
  videoRenderer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  pauseIcon: {
    position: "absolute",
    opacity: 0.25,
    top: "45%",
    left: "45%",
  },
});

export default VideoItem;
