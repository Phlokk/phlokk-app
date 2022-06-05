import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import RecordingNavBar from "../../components/general/navBar/recordingNav";
import { Entypo } from "@expo/vector-icons";
import colors from "../../../config/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

// native dep
// import TrackPlayer, {
//   Capability,
//   Event,
//   RepeatMode,
//   State,
//   usePlaybackState,
//   useProgress,
//   useTrackPlayerEvents
// } from "react-native-track-player";

const Sounds = [
  {
    id: 1,
    name: "Yellow Brick Road",
    artist: "Drama",
    duration: "1:00",
    url: require("../../../assets/songs/yellow explicit mix w fade radio.mp3"),
  },
  {
    id: 2,
    name: "Dead Inside",
    artist: "Drama",
    duration: "1:00",
    url: require("../../../assets/songs/dead inside explicit edit l2.wav"),
  },
  {
    id: 3,
    name: "Long Road",
    artist: "Drama",
    duration: "1:00",
    url: require("../../../assets/songs/long road final no phill.mp3"),
  },
];
// TrackPlayer.updateOptions({
//   stopWithApp: true,
//   capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
//   compactCapabilities: [
//     TrackPlayer.CAPABILITY_PLAY,
//     TrackPlayer.CAPABILITY_PAUSE,
//   ],
// });

export default function SoundScreen() {
  const navigation = useNavigation();

  // const setUpTrackPlayer = async () => {
  //   try {
  //     await TrackPlayer.setupPlayer();
  //     await TrackPlayer.add(tracks);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   setUpTrackPlayer();

  //   return () => TrackPlayer.destroy();
  // }, []);

  const ItemRender = ({ name, artist, duration }) => (
    <View style={styles.item}>
      <View>
        <Image
          style={styles.avatar}
          source={require("../../../assets/yellowbrickroad.png")}
        />
      </View>
      <TouchableWithoutFeedback>
        <Text>
          <Entypo
            onPress={() => TrackPlayer.play}
            name="controller-play"
            size={30}
            color={colors.secondary}
          />
        </Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Text style={styles.itemText}>{name}</Text>
        <Text style={styles.artistText}>{artist}</Text>
        <Text style={styles.mins}>{duration}</Text>
      </TouchableWithoutFeedback>
    </View>
  );

  const Separator = () => {
    return (
      <View
        style={{
          height: 1,
          width: 1,
          padding: 1,
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <RecordingNavBar title="Sound Bar" />
      <View>
        <FlatList
          data={Sounds}
          renderItem={({ item }) => (
            <ItemRender
              name={item.name}
              artist={item.artist}
              duration={item.duration}
            />
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={Separator}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: 25,
  },
  soundBarRow: {
    flexDirection: "row",
    margin: 5,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  text: {
    color: colors.secondary,
    textAlign: "center",
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    backgroundColor: colors.lightBlack,
    borderRadius: 15,
    padding: 10,
    color: colors.secondary,
    paddingHorizontal: 15,
    margin: 10,
    alignItems: "center",
  },
  itemText: {
    color: colors.white,
  },
  artistText: {
    color: colors.gray,
    fontSize: 10,
  },
  mins: {
    color: colors.gray,
    fontSize: 10,
  },
  avatar: {
    height: 35,
    width: 35,
  },
  playBtn: {
    // move play icon over album
  },
});
