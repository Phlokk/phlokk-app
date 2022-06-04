import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Entypo } from "@expo/vector-icons";

//3rd party packages
import { Audio } from "expo-av";
import colors from "../../../../config/colors";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const AudioPlay = ({ navigation, route }) => {
  const { data } = route.params;
  const [constTime, setConstTime] = useState(data?.time);
  const [isPlaying, setPlaying] = useState(false);
  const [sound, setSound] = useState(null);

  const playAudio = async () => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: data.uri },
      { shouldPlay: false }.uri
    );
    setSound(sound);
    setPlaying(true);
    console.log("Playing Sound");
    await sound.playAsync();
  };

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        key={isPlaying}
        isPlaying={isPlaying}
        duration={constTime}
        colors={colors.green}
        onComplete={() => setPlaying(false)}
      >
        {({ remainingTime, elapsedTime }) => (
          <Pressable onPress={playAudio}>
            <Text style={styles.wave}>
              <MaterialCommunityIcons
                name="waveform"
                size={30}
                color={colors.green}
              />
            </Text>
            <Animated.Text style={styles.textStyle}>
              {remainingTime}
            </Animated.Text>
            <Text style={styles.secsStyle}>seconds</Text>
          </Pressable>
        )}
      </CountdownCircleTimer>
      <View>
        <TouchableOpacity style={styles.saveBtn}>
          <MaterialCommunityIcons
            // onPress={() => saveAudioFile()} // not created function yet
            name="cloud-upload-outline"
            size={50}
            color={colors.secondary}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.saveFileTxt}>Upload to custom audio center</Text>
      </View>
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
    fontSize: 12,
    textAlign: "center",
    color: "white",
    opacity: 0.7,
  },
  saveBtn: {
    marginTop: 30,
  },
  saveFileTxt: {
    color: colors.green,
    fontWeight: "bold",
    textAlign: "center",
  },
  wave: {
      textAlign: "center",
  }
});
export default AudioPlay;
