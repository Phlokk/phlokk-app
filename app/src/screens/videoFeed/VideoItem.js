import React, { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Video, Audio } from "expo-av";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import PostSingleOverlay from "../../components/general/post/overlay/PostSingleOverlay";
import UserProfileOverlay from "../../components/general/post/overlay/UserProfileOverlay";
import colors from "../../../config/colors";
import LinearGradient from "react-native-linear-gradient";
import Slider from "@react-native-community/slider";
import axios from "../../redux/apis/axiosDeclaration";
import { apiUrls } from "../../globals";

const VideoItem = ({
  item,
  index,
  currentVideoIndex,
  itemHeight,
  currentUser,
  areTabsShowing,
}) => {
  const [shouldPlay, setShouldPlay] = useState(true);
  const isFocused = useIsFocused();
  const [playbackStatus, setPlaybackStatus] = useState();
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [videoResizeMode, setVideoResizeMode] = useState();
  // Video.RESIZE_MODE_COVER
  const videoPlayerRef = useRef();

  const [isMarkedPlayed, setIsMarkedPlayed] = useState(false);
  const [isPlayCountInc, setIsPlayCountInc] = useState(false);
  const [videoReady, setVideoReady]= useState(false)
  useEffect(() => {
    const setupAudio = async () => {
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    };
    setupAudio();
  }, []);
  useEffect(async () => {
    setIsPlayCountInc(false);
   try{
     if(videoPlayerRef && videoReady) await videoPlayerRef?.current?.setStatusAsync({ positionMillis: 0 });
   }catch(e){
    console.log("Error while resetting video", e)
   }
  }, [currentVideoIndex, index]);
  // watches for index change upon scroll to reset the video status
  useEffect(() => {
    setShouldPlay(true);
  }, [currentVideoIndex]);

  //this is called to play or pause the video
  const playPauseVideo = () => {
    setShouldPlay(!shouldPlay);
  };

  if (
    playbackStatus?.positionMillis >=
      playbackStatus?.playableDurationMillis / 2 &&
    !isMarkedPlayed
  ) {
    setIsMarkedPlayed(true);
  }
  const updatePlayCount = async (status) => {
    const duration = status?.durationMillis / 1000;
    const position = status?.positionMillis / 1000;
    if (!isNaN(duration) && !isNaN(position) && !isPlayCountInc) {
      if (shouldUpdateCount(duration, position)) {
        await updateCount();
        setIsPlayCountInc(true);
      }
    }
  };
  const updateCount = async () => {
    try {
      const response = await axios.post(`/api/posts/play-count/${item._id}`);
      return response;
    } catch (e) {
    }
  };
  const shouldUpdateCount = (duration, position) => {
    if (duration > 0 && duration < 119) {
      if (position > duration / 2) {
        return true;
      }
    } else if (position > 40) {
      return true;
    }
  };

  return (
    <View style={{ height: itemHeight, backgroundColor: "black" }}>
      <Pressable style={{ flex: 1 }} onPress={playPauseVideo}>
        <Video
          ref={videoPlayerRef}
          source={{
            uri: item.media[1].original_url,
            type: item.media[1].mime_type,
          }}
          isMuted={currentVideoIndex !== index || !isFocused}
          resizeMode={videoResizeMode}
          style={styles.videoRenderer}
          shouldPlay={currentVideoIndex === index && shouldPlay && isFocused}
          isLooping
          usePoster
          posterSource={{ uri: item.poster }}
          posterStyle={{ resizeMode: "cover", height: "100%" }}
          onPlaybackStatusUpdate={(status) => {
            updatePlayCount(status);
            setPlaybackStatus(status);
          }}
          onReadyForDisplay={(e) => {
            setVideoReady(true)
            const orientation = e.naturalSize.orientation;
            if (orientation === "landscape") {
              setVideoResizeMode(Video.RESIZE_MODE_CONTAIN);
            } else {
              setVideoResizeMode(Video.RESIZE_MODE_COVER);
            }
          }}
        />

        {!shouldPlay && (
          <FontAwesome5
            name="play"
            size={50}
            color={colors.white}
            style={styles.pauseIcon}
          />
        )}
      </Pressable>

      <View pointerEvents="none" style={styles.bottomGradientWrapper}>
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.4)"]}
          style={{ height: 650, width: "100%" }}
        />
      </View>
      <UserProfileOverlay
        user={item.user}
        post={item}
        currentUser={currentUser}
        areTabsShowing={areTabsShowing}
      />

      <PostSingleOverlay
        user={item.user}
        post={item}
        isCurrentUser={item.user.username === currentUser.username}
      />

      <Slider
        style={[styles.timelineSlider, areTabsShowing && { bottom: 0 }]}
        minimumValue={0}
        maximumValue={playbackStatus?.durationMillis}
        value={!isScrubbing && playbackStatus?.positionMillis}
        onSlidingStart={() => setIsScrubbing(true)}
        onSlidingComplete={async (val) => {
          await videoPlayerRef.current.setPositionAsync(val, {
            toleranceMillisAfter: 100,
            toleranceMillisBefore: 100,
          });
          setIsScrubbing(false);
        }}
        minimumTrackTintColor={colors.green}
        thumbTintColor="transparent"
      />
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
    top: "50%",
    left: "45%",
  },
  playView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    borderRadius: 50,
    padding: 5,
    flex: 1,
    width: 150,
    backgroundColor: "rgba(125, 125, 125, 0.2)",
    top: Platform.OS === "android" ? "4%" : "6%",
    left: "32%",
  },
  bottomGradientWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 650,
  },
  timelineSlider: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 20,
    marginHorizontal: -4,
  },
  viewCount: {
    color: colors.white,
  },
  playCountBtn: {
    marginRight: 6,
  },
});

export default VideoItem;
