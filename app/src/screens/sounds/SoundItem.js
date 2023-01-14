import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  Platform,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import colors from "../../../config/colors";
import SettingsAudioModalScreen from "../../components/modal/settingsAudioModalScreen/SettingsAudioModalScreen";
import { Audio } from "expo-av";


const brandingLogo = {
  logo: require('../../../assets/pmd_logo_green.png'),
}



const SoundItem = ({ currentUser, item }) => {
  const [Loaded, SetLoaded] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const [isAudioError, setIsAudioError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();


  const [openSettingsAudioModal, setOpenSettingsAudioModal] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);


  const sound = useRef(new Audio.Sound());


  useEffect(() => {
    LoadAudio();
  }, []);

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
          setIsAudioPlaying(true);
        }
      }
    } catch (error) {

    }
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

  const LoadAudio = async () => {
    SetLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync(
          { uri: item.sound_url },
          {shouldPlay: false},
          false
        );
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
        setErrorMessage("No longer available")
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
    <>
    <View style={styles.item}>
      <View style={styles.albumRow}>
        <View style={styles.playBtnView}>
          {!isAudioPlaying ? (
            <Entypo
              onPress={PlayAudio}
              name="controller-play"
              size={35}
              color={colors.secondary}
            />
          ) : (
            <Ionicons
              onPress={PauseAudio}
              name="pause-sharp"
              size={34}
              color={colors.secondary}
            />
          )}
        </View>
        <View>
          <Image style={styles.album} source={item.artwork_url} />
        </View>
      </View>
      <View style={styles.albumInfoRow}>
        <View>
          <Text style={styles.itemInfo}>
            <View style={styles.logoRow}>
              <Image
                style={styles.logo}
                source={brandingLogo.logo}
              />
            </View>
            {item.song_name}
            
          </Text>
          <Text style={styles.genreText}>Genre: {item.genre}</Text>
          {errorMessage &&  (
            <View style={styles.audioErrorView}>
            <Text style={styles.warningText}>{errorMessage}</Text>
            </View>
          )}
          <Text style={styles.artistText}>{item.artist}</Text>
          <Text style={styles.mins}>{item.duration}</Text>
        </View>
        </View>
        </View>
        <View style={styles.dotRow}>
            <AntDesign 
              style={styles.infoDots} 
              name="bars" 
              size={30} 
              color={colors.secondary}
              onPress={() => setOpenSettingsAudioModal(true)}/>
        </View>
        <Modal
            animationType="slide"
            transparent={true}
            visible={openSettingsAudioModal}
          >
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Pressable
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                }}
                onPress={() => setOpenSettingsAudioModal(false)}
              />
              <SettingsAudioModalScreen item={item} currentUser={currentUser} />
            </View>
          </Modal>
          
      <View>
      
      </View>
      </>
  );
};

const styles = StyleSheet.create({
 
  item: {
    flexDirection: "row",
    color: colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    marginTop: 5,
    width: "90%",
  },
  itemInfo: {
    color: colors.green,
    fontWeight: "bold",
    bottom: 3,
    fontSize: 11,
    right: 14,
  },
  itemLoad: {
    color: colors.white,
  },
  artistText: {
    top: 3,
    color: colors.gray,
    paddingLeft: 5,
    fontSize: 10,
  },
  genreText: {
    top: -2,
    left: -7,
    color: colors.gray,
    paddingLeft: 10,
    fontSize: 10,
  },
  mins: {
    top: 15,
    color: colors.gray,
    paddingLeft: 6,
    fontSize: 10,
  },
  album: {
    height: 65,
    width: 65,
  },
  albumRow: {
    paddingBottom: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  albumInfoRow: {
    paddingHorizontal: 5,
    left: 12,
    top: -5,
    flex: 1,
  },
  logo: {
    right: 5,
    bottom: -2,
    height: 12,
    width: 12,
  },
  logoRow: {
    bottom: 12,
    paddingLeft: 5,
  },
  infoDots: {
    opacity: 0.3,
  },
  dotRow: {
    right: Platform == "ios" ? 0 : 20, 
    flexDirection: "row-reverse",
    bottom: 54,
  },
  playBtnView: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    top: 50,
    bottom: 10,
  },
  warningText: {
    right: 18,
    color: colors.danger,
    fontSize: 10,
  },
  audioErrorView: {
    left: 23,


  },
});

export default SoundItem;
