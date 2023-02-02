import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Linking } from "react-native";
import RecordingNavBar from "../../components/general/navBar/RecordingNavBar";
import colors from "../../../config/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchAudio from "./searchAudio/SearchAudio";
import SoundItem from "./SoundItem";
import { useAtom } from "jotai";
import { userAtom } from "../../services/appStateAtoms";
import { getAllSounds } from "../../services/sounds";
import { useIsFocused } from "@react-navigation/native";
import ImageCarousel from "../../components/common/ImageCarousel";
import { getAllCarouselImages } from "../../services/carousel";

export default function SoundScreen({ placeholder }) {
  const isFocused = useIsFocused();
  const [carouselList, setCarouselList] = useState([]);
  const [soundsList, setSoundsList] = useState([]);
  const [currentSound, setCurrentSound] = useState(null);

  useEffect(() => {
    const soundBites = async () => {
      const soundsList = await getAllSounds();
      setSoundsList(soundsList.sounds);
    };

    if (isFocused) {
      soundBites();
    }
  }, [isFocused]);

  useEffect(() => {
    const carouselImages = async () => {
      const carouselList = await getAllCarouselImages();
      setCarouselList(carouselList.carousel);
    };

    if (isFocused) {
      carouselImages();
    }
  }, [isFocused]);

  const renderItem = ({ item, index }) => {
    return (
      <SoundItem
        item={item}
        index={index}
        currentUser={currentUser}
        currentSound={currentSound}
        setCurrentSound={setCurrentSound}
      />
    );
  };

  const listHeader = ({ item, index }) => {
    return (
      <ImageCarousel
        onCarouselItemPress={(carouselItem) =>
          Linking.openURL(carouselItem.link)
        }
        carouselList={carouselList}
        autoScrollInterval={3000}
      />
    );
  };

  const [currentUser] = useAtom(userAtom);

  const keyExtractor = useCallback((item) => item._id);
  return (
    <SafeAreaView style={styles.container}>
      <RecordingNavBar title="Sound Bar" />
      <SearchAudio placeholder={placeholder} />

      <FlatList
        style={styles.paddingFlat}
        data={soundsList}
        renderItem={renderItem}
        ListHeaderComponent={listHeader}
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
});
