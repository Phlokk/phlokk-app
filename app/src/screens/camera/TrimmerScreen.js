import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import Trimmer from "react-native-trimmer";
import { MaterialIcons } from "@expo/vector-icons";

import colors from "../../../config/colors";
import routes from "../../navigation/routes";

const TrimmerScreen = ({ route }) => {


  // https://stackoverflow.com/questions/32254818/generating-a-waveform-using-ffmpeg

  const navigation = useNavigation();
  const item = route?.params?.item;
  const maxTrimDuration = 60000;

  const [Loaded, SetLoaded] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const [isAudioError, setIsAudioError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [openSettingsAudioModal, setOpenSettingsAudioModal] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [playing, setPlaying] = useState(false);

  const [trimmerLeftHandlePosition, setTrimmerLeftHandlePosition] = useState(0);
  const [trimmerRightHandlePosition, setTrimmerRightHandlePosition] =
    useState(5000);

  const onHandleChange = ({ leftPosition, rightPosition }) => {
    setTrimmerRightHandlePosition(rightPosition);
    setTrimmerLeftHandlePosition(leftPosition);
  };

  const [scrubInterval, setScrubInterval] = useState(50);

  const [clearInterval, setClearInterval] = useState(false);
  const [interval, setInterval] = useState(false);

  const [scrubberPosition, setScrubberPosition] = useState(1);

  const minimumTrimDuration = 1000;
  const [totalDuration, setTotalDuration] = useState(180000);

  const playScrubber = async () => {
    setPlaying(true);
  };

  const scrubberInterval = () => {
    setInterval(scrubberPosition + scrubInterval);
  };

  const pauseScrubber = async () => {
    setClearInterval(scrubberInterval);
    setPlaying(false);
    setScrubberPosition(trimmerLeftHandlePosition);
    await PauseAudio();
  };

  const PauseAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
          setIsAudioPlaying(false);
        }
      }
    } catch (error) {}
  };

  const onScrubbingComplete = (newValue) => {
    setPlaying(false);
    setScrubberPosition(newValue);
  };

  const sound = useRef(new Audio.Sound());

  useEffect(async () => {
    await LoadAudio();
  }, []);

  const PlayAudio = async () => {
    try {
      await LoadAudio();
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
          playScrubber();
        }
      }
    } catch (error) {}
  };

  const LoadAudio = async () => {
    SetLoading(true);

    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync(
          { uri: route.params.item.sound_url },
          { shouldPlay: false, isLooping: false },

          false
        );
        setTotalDuration(result.playableDurationMillis);
        setScrubInterval(result.progressUpdateIntervalMillis);

        if (result.isLoaded === false) {
          SetLoading(false);
          setIsAudioError(true);
        } else {
          SetLoading(false);
          SetLoaded(true);
        }
      } catch (error) {
        setIsAudioPlaying(false);
        setIsAudioError(true);
        setErrorMessage("No longer available");
        SetLoading(false);
      }
    } else {
      SetLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      sound.current && sound.current.unloadAsync();
    };
  }, [sound.current]);

  return (
    <View style={styles.container}>
      <View style={styles.trimmerView}>
        <View style={styles.playBtnView}>
          {playing ? (
            <TouchableOpacity onPress={pauseScrubber}>
              <Ionicons name="pause-sharp" size={49} color={colors.secondary} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={PlayAudio}>
              <Entypo name="controller-play" size={50} color={colors.green} />
            </TouchableOpacity>
          )}
        </View>
        <Trimmer
          onHandleChange={onHandleChange}
          totalDuration={totalDuration}
          trimmerLeftHandlePosition={trimmerLeftHandlePosition}
          trimmerRightHandlePosition={trimmerRightHandlePosition}
          minimumTrimDuration={minimumTrimDuration}
          maxTrimDuration={maxTrimDuration}
          maximumZoomLevel={200}
          zoomMultiplier={20}
          initialZoomValue={2}
          scaleInOnInit={false}
          tintColor={colors.green}
          markerColor={colors.white}
          trackBackgroundColor={colors.black}
          trackBorderColor={colors.green}
          scrubberColor={colors.white}
          scrubberPosition={scrubberPosition}
          onScrubbingComplete={onScrubbingComplete}
        />
      </View>
      

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-left" size={24} color={colors.secondary} />
          <Text style={styles.backButtonText}>Back </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(routes.CAMERA, { item: item });
          }}
          style={styles.postButton}
        >
          <Text style={styles.postButtonText}>Next </Text>
          <MaterialIcons name="arrow-right" size={24} color={colors.green} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    flex: 1,
  },
  iconRow: {
    justifyContent: "space-between",
    flex: 1,
    position: "absolute",
    top: 95,
  },
  iconText: {
    textAlign: "center",
    width: 30,
    color: colors.white,
    fontSize: 7,
    marginTop: 10,
  },
  sideBarButton: {
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  backBtn: {
    justifyContent: "center",
  },
  trimmerView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  nextBtn: {
    justifyContent: "center",
    alignItems: "center",
    bottom: 50,
  },

  // Btns
  postButtonText: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 14,
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
  playBtnView: {
    top: 300,
  },
});

export default TrimmerScreen;
