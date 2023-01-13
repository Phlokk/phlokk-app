import React, { useCallback } from "react";
import { StyleSheet, FlatList } from "react-native";
import RecordingNavBar from "../../components/general/navBar/RecordingNavBar";
import colors from "../../../config/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchAudio from "./searchAudio/SearchAudio";
import SoundItem from "./SoundItem";
import { useAtom } from "jotai";
import { userAtom } from "../../../../App";

const Sounds = [
  {
    id: 1,
    songName: "Yellow Brick Road",
    artist: "Drama",
    duration: "1:00",
    url: require("../../../assets/songs/dead_inside.wav"),
    artwork: require("../../../assets/yellowbrickroad.png"),
  },
  {
    id: 2,
    songName: "Dead Inside",
    artist: "Drama",
    duration: "1:00",
    url: require("../../../assets/songs/dead_inside.wav"),
    artwork: require("../../../assets/yellowbrickroad.png"),
  },
  {
    id: 3,
    songName: "Long Road",
    artist: "Drama",
    duration: "1:00",
    url: require("../../../assets/songs/long_road.mp3"),
    artwork: require("../../../assets/yellowbrickroad.png"),
  },
];

export default function SoundScreen({ placeholder }) {
  const [currentUser] = useAtom(userAtom);

  const keyExtractor = useCallback((item) => item.id);
  return (
    <SafeAreaView style={styles.container}>
      <RecordingNavBar title="Sound Bar" />
      <SearchAudio placeholder={placeholder} />
      <FlatList
        style={styles.paddingFlat}
        data={Sounds}
        renderItem={({ item, index }) => (
          <SoundItem
            item={item}
            index={index}
            currentUser={currentUser}
          />
        )}
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
    justifyContent: "center",
    alignItems: "center",
  },
  activity: {
    top: -45,
    zIndex: 9999,
  },
});
