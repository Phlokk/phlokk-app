import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import RecordingNavBar from "../../components/general/navBar/RecordingNavBar";
import colors from "../../../config/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchAudio from "./searchAudio/SearchAudio";
import SoundItem from "./SoundItem";
import { useAtom } from "jotai";
import { userAtom } from "../../../../App";
import {getAllSounds} from "../../services/sounds"
import { useIsFocused } from "@react-navigation/native";






export default function SoundScreen({ placeholder }) {
  const isFocused = useIsFocused();

  const [soundsList, setSoundsList] = useState([]);


  useEffect(() => {
    const soundBites = async () => {
      const soundsList = await getAllSounds();
      setSoundsList(soundsList);

    };

    if (isFocused) {
      soundBites();
    }
  }, [isFocused]);

  




  const [currentUser] = useAtom(userAtom);

  const keyExtractor = useCallback((item) => item._id);
  return (
    <SafeAreaView style={styles.container}>
      <RecordingNavBar title="Sound Bar" />
      <SearchAudio placeholder={placeholder} />
      <FlatList
        style={styles.paddingFlat}
        data={soundsList}
        renderItem={({ item, index }) => (
          <SoundItem
            item={item}
            index={index}
            currentUser={currentUser}
            soundsList={soundsList}
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
