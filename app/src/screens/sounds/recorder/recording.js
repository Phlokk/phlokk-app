import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";

//3rd party packages
import { Audio } from "expo-av";
import LinearGradient from "react-native-linear-gradient";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import routes from "../../../navigation/routes";
import colors from "../../../../config/colors";

const RecordingScreen = ({ navigation }) => {
  const [recording, setRecording] = useState();
  const [isPlaying, setPlaying] = useState(false);
  const [consTime, setConstTime] = useState(30);
  const [recordedTime, setRecordedTime] = useState(0);
  const [spinnerKey, setSpinnerKey] = useState(false);

  useEffect(() => {
    (async () => {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS:true,
        playsInSilentModeIOS: true,
      });
    })();
  }, []);

  const _onLongPress = async () => {
    try {
      console.log("Requesting permissions..");
      console.log("Starting recording..");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
      setPlaying(true);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };
  const _onPressOut = async () => {
    console.log("Stopping recording..");
    setPlaying(false);
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
        allowsRecordingIOS:false,
      });
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
    if (!!uri) {
      navigation.navigate(routes.AUDIO_PLAYER, {
        data: { uri: uri, time: recordedTime },
        
      });
    }
  };

 

  const checkTime = (time, elapsedTime) => {
    setRecordedTime(elapsedTime);
    if ((!isPlaying && time !== 30 && !!recording) || time == 0) {
      if (!!recording) {
        _onPressOut();
      }
    }
  };

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={consTime}
        key={spinnerKey}
        colors="#a29bfe"
      >
        {({ remainingTime, elapsedTime }) => (
          <Pressable onLongPress={_onLongPress} onPressOut={_onPressOut}>
            {checkTime(remainingTime, elapsedTime)}
            <LinearGradient
              colors={["#00cec9", "#00cec9"]}
              style={styles.linearGradient}
            >
              <Animated.Text style={styles.textStyle}>
                {remainingTime}
              </Animated.Text>
              <Text style={styles.secsStyle}>secs left</Text>
            </LinearGradient>
          </Pressable>
        )}
      </CountdownCircleTimer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  linearGradient: {
    width: 170,
    height: 170,
    borderRadius: 170 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 50,
    textAlign: "center",
    color: "white",
  },
  secsStyle: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    opacity: 0.7,
  },
  infotext: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  mic: {
    top: 45,
  },
  recordInfo: {
    color: colors.secondary,
    marginTop: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
  linearGradient: {
    width: 170,
    height: 170,
    borderRadius: 170 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RecordingScreen;
