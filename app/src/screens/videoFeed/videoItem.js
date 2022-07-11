import React, { useEffect, useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons'; 
import { Video } from "expo-av";
import { useIsFocused } from "@react-navigation/native";

import PostSingleOverlay from "../../components/general/post/overlay";
import colors from "../../../config/colors";

const VideoItem = ({
  item,
  index,
  currentVideoIndex,
  feedItemHeight,
  setCurrentVideoPlayingStat,
}) => {
  const [shouldPlay, setShouldPlay] = useState(true);

  /*
  - create a function to navigate to user profile
  - the function can be either here and passed to the overlay
  - to it can be in the overlay and pass the playPauseVideo function
  - when the use clicks on the account icon {
      step one is to run the playPauseVideo()
      step two is to navigate the user
  }
  */

  const isFocused = useIsFocused();

  // watches for index change upon scroll to reset the video status
  useEffect(() => {
    setShouldPlay(true);
  }, [currentVideoIndex]);

  //this is called to play or pause the video
  const playPauseVideo = () => {
    setShouldPlay(!shouldPlay);
  };

  const displayPauseIcon = () => (
    <Ionicons
      name="ios-pause-circle-outline"
      size={100}
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
          // setNativeControls={false}
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
          /*  */
        />
        {shouldPlay ? null : displayPauseIcon()}
        <PostSingleOverlay user={item.user} post={item} />
      </Pressable>
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
    opacity: 0.5,
    top: "40%",
    left: "40%",
  },
  // overlay: {
  //   zIndex: 0,
  // }
});

export default VideoItem;
