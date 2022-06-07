import * as React from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { Audio } from "expo-av";
import colors from "../../../config/colors";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SampleTrack = require("../../../assets/songs/yellow_brick_road.mp3");

export default function PlaySoundScreen() {
  const [Loaded, SetLoaded] = React.useState(false);
  const [Loading, SetLoading] = React.useState(false);
  const sound = React.useRef(new Audio.Sound());

  React.useEffect(() => {
    LoadAudio();
  }, []);

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
          Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
          });
        }
      }
    } catch (error) {}
  };

  const ReplayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.replayAsync();
        }
      }
    } catch (error) {}
  };

  const LoadAudio = async () => {
    SetLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync(SampleTrack, {}, true);
        if (result.isLoaded === false) {
          SetLoading(false);
          console.log("Error in Loading Audio");
        } else {
          SetLoading(false);
          SetLoaded(true);
        }
      } catch (error) {
        console.log(error);
        SetLoading(false);
      }
    } else {
      SetLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.AudioPLayer}>
        {Loading ? (
          <ActivityIndicator size={"small"} color={"red"} />
        ) : (
          <>
            {Loaded === false ? (
              <>
                <ActivityIndicator />
                <Text>Loading Song</Text>
              </>
            ) : (
              <>
                <View style={{ flexDirection: "row" }}>
                  <Entypo
                    onPress={PlayAudio}
                    name="controller-play"
                    size={55}
                    color={colors.secondary}
                  />
                  <MaterialCommunityIcons
                    onPress={ReplayAudio}
                    name="replay"
                    size={55}
                    color={colors.secondary}
                  />
                </View>
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  AudioPLayer: {
    width: "100%",
    height: 50,
    alignItems: "center",
  },
  btnRow: {
    //   backgroundColor: "white",
    flexDirection: "row",
    //   marginHorizontal: 20,
  },
  plyBtn: {
    margin: 20,
  },
  pauseBtn: {
    margin: 20,
  },
});
