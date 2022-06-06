import React, { useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Audio } from "expo-av";
import RecordingNavBar from "../../components/general/navBar/recordingNav";
import { Entypo } from "@expo/vector-icons";
import colors from "../../../config/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const smallLogo = require("../../../assets/pmd_logo_green.png");
const Sounds = [
  {
    id: 1,
    name: "Yellow Brick Road",
    artist: "Drama",
    duration: "1:00",
    url: require("../../../assets/songs/dead_inside.wav"),
    artwork: require("../../../assets/yellowbrickroad.png"),
  },
  {
    id: 2,
    name: "Dead Inside",
    artist: "Drama",
    duration: "1:00",
    url: require("../../../assets/songs/dead_inside.wav"),
    artwork: require("../../../assets/yellowbrickroad.png"),
  },
  {
    id: 3,
    name: "Long Road",
    artist: "Drama",
    duration: "1:00",
    url: require("../../../assets/songs/long_road.mp3"),
    artwork: require("../../../assets/yellowbrickroad.png"),
  },
];

export default function SoundScreen() {
  const navigation = useNavigation();
  const [Loaded, SetLoaded] = React.useState(false);
  const [Loading, SetLoading] = React.useState(false);
  const sound = React.useRef(new Audio.Sound());
  let currentPlayingIndex = 0; // 0 is default

  React.useEffect(() => {
    LoadAudio();
  }, []);

  const PlayAudio = async (soundIndex) => {
    currentPlayingIndex = soundIndex;
    try {
      await UnloadAudio();
      await LoadAudio(soundIndex);
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          await sound.current.playAsync();
          Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
          });
        }
      }
    } catch (error) {}
  };

  const UnloadAudio = async () => {
    await sound.current.unloadAsync();
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

  // let isPlayingSound = async (soundIndex) => {
  //   return currentPlayingIndex === soundIndex;
  // };

  let LoadAudio = async (soundIndex = 0) => {
    SetLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync(
          Sounds[soundIndex].url,
          {},
          true
        );
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

  const ItemRender = ({ name, artist, duration, artwork, soundIndex }) => (
    <View style={styles.item}>
      <View style={styles.albumRow}>
        <Image style={styles.album} source={artwork} />
        <View>
          {Loading ? (
            <ActivityIndicator
            style={styles.activity}
            size={"small"}
            color={colors.secondary} />
          ) : (
            <>
              {Loaded === false ? (
                <>
                  <ActivityIndicator />
                </>
              ) : (
                <>
                  <View style={styles.btnRow}>
                      <Entypo
                        onPress={() => PlayAudio(soundIndex)}
                        name="controller-play"
                        size={30}
                        color={colors.secondary}
                      />
                      <MaterialCommunityIcons
                        onPress={ReplayAudio}
                        name="replay"
                        size={30}
                        color={colors.secondary}
                      />
                    
                  </View>
                </>
              )}
            </>
          )}
        </View>
      </View>

      <TouchableWithoutFeedback>
        <Text style={styles.itemText}>
        <View style={styles.logoRow}>
        <Image style={styles.logo} source={smallLogo} />
        </View>
        {name}</Text>
        <Text style={styles.artistText}>{artist}</Text>
        <Text style={styles.mins}>{duration}</Text>
      </TouchableWithoutFeedback>
    </View>
  );

  

  const renderItem = useCallback(({ item, index }) => (
    <ItemRender
      name={item.name}
      artist={item.artist}
      duration={item.duration}
      artwork={item.artwork}
      soundIndex={index}
    />
  ));

  const keyExtractor = useCallback((item) => item.id);

  return (
    <SafeAreaView style={styles.container}>
      <RecordingNavBar title="Sound Bar" />
        <FlatList
          data={Sounds}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
        />
     
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    
  },
  btnRow: {
    flexDirection: "row",
    zIndex: -9999,
    top: -50,
    justifyContent: 'center',
    alignItems: "center",

  },
  text: {
    color: colors.secondary,
    textAlign: "center",
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    color: colors.secondary,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  itemText: {
    color: colors.green,
    fontWeight: 'bold',
    bottom: 26,
    fontSize: 11,
    paddingLeft: 5,
  },
  itemLoad: {
    color: colors.white,
  },
  artistText: {
    bottom: 15,
    color: colors.gray,
    paddingLeft: 10,
    fontSize: 10,
  },
  mins: {
    bottom: 10,
    color: colors.gray,
    paddingLeft: 10,
    fontSize: 10,
  },
  album: {
    height: 65,
    width: 65,

  },
  logo: {
    height: 12,
    width: 12,

  },
  logoRow:{
    bottom: 12,
    paddingLeft: 5,

  },
  topBarPadding: {
    marginTop: 40,
  },
  activity: {
    top: -45,
    zIndex: 9999,
  },

});
