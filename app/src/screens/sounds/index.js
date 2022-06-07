import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  {
    id: 4,
    name: "Long Road",
    artist: "Drama",
    duration: "1:00",
    url: require("../../../assets/songs/long_road.mp3"),
    artwork: require("../../../assets/yellowbrickroad.png"),
  },
];

export default function SoundScreen() {
  const navigation = useNavigation();
  const [Loaded, SetLoaded] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const sound = useRef(new Audio.Sound());

  useEffect(() => {
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

  {
    /* <View>
          {Loading ? (
            <ActivityIndicator
              style={styles.activity}
              size={"small"}
              color={colors.secondary}
            />
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
        </View> */
  }

  const ItemRender = ({ soundIndex, item }) => (
    <View style={styles.item}>
      <View style={styles.albumRow}>
        <Image style={styles.album} source={item.artwork} />
      </View>

      <TouchableWithoutFeedback>
        <Text style={styles.itemText}>
          <View style={styles.logoRow}>
            <Image style={styles.logo} source={smallLogo} />
          </View>
          {item.name}
        </Text>
        <Text style={styles.artistText}>{item.artist}</Text>
        <Text style={styles.mins}>{item.duration}</Text>
      </TouchableWithoutFeedback>
    </View>
  );

  ItemSeparator = () => {
    return <View style={styles.seperator}></View>;
  };

  const keyExtractor = useCallback((item) => item.id);

  return (
    <SafeAreaView style={styles.container}>
      <RecordingNavBar title="Sound Bar" />
      <FlatList
        style={styles.paddingFlat}
        data={Sounds}
        renderItem={ItemRender}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  paddingFlat: {
    paddingTop: 35,
  },
  btnRow: {
    flexDirection: "row",
    zIndex: -9999,
    top: -50,
    justifyContent: "center",
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
    fontWeight: "bold",
    bottom: 12,
    fontSize: 11,
    paddingLeft: 5,
  },
  itemLoad: {
    color: colors.white,
  },
  artistText: {
    bottom: 2,
    color: colors.gray,
    paddingLeft: 10,
    fontSize: 10,
  },
  mins: {
    top: 7,
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
  logoRow: {
    bottom: 12,
    paddingLeft: 5,
  },
  activity: {
    top: -45,
    zIndex: 9999,
  },
  seperator: {
    height: 1,
    width: "90%",
    opacity: 0.2,
    backgroundColor: "#CCC",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
});
