import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../../config/colors";
import SettingsAudioModalScreen from "../../components/modal/settingsAudioModalScreen/SettingsAudioModalScreen";
import { Audio } from "expo-av";
import CustomAlert from "../../components/Alerts/CustomAlert";

const smallLogo = require("../../../assets/pmd_logo_green.png");


const SoundItem = ({ currentUser, soundsList }) => {
  const [Loaded, SetLoaded] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const [isAudioError, setIsAudioError] = useState(false);

  const [openSettingsAudioModal, setOpenSettingsAudioModal] = useState(false);
  const [audioStatus, setAudioStatus] = useState(false);


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
        }
      }
    } catch (error) {}
  };

  const PauseAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
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
          require("../../../assets/songs/long_road.mp3"),
          {},
          true
        );
        if (result.isLoaded === false) {
          SetLoading(false);
          setIsAudioError(true);
        } else {
          SetLoading(false);
          SetLoaded(true);
        }
      } catch (error) {
        setIsAudioError(true);
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
    <View style={styles.item}>
      <View style={styles.albumRow}>
        <View style={styles.playBtnView}>
          {!audioStatus ? (
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
          <Image style={styles.album} source={soundsList.artwork_url} />
        </View>
      </View>
      <View style={styles.albumInfoRow}>
        <View>
          <Text style={styles.itemInfo}>
            <View style={styles.logoRow}>
              <Image
                style={styles.logo}
                source={smallLogo}
                cache="only-if-cached"
              />
            </View>
            {soundsList.song_name}
          </Text>

          <Text style={styles.artistText}>{soundsList.artist}</Text>
          <Text style={styles.mins}>{soundsList.duration}</Text>
        </View>
        <View style={styles.divider_light}></View>
        <View style={styles.dotRow}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              style={styles.infoDots}
              name="dots-vertical"
              size={30}
              color={colors.secondary}
              onPress={() => setOpenSettingsAudioModal(true)}
            />
          </TouchableOpacity>
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
              <SettingsAudioModalScreen currentUser={currentUser} />
            </View>
          </Modal>
        </View>
      </View>
      <CustomAlert
        alertTitle={
          <Text>
            <Entypo
              style={styles.note}
              name="beamed-note"
              size={15}
              color={colors.green}
            />
          </Text>
        }
        customAlertMessage={<Text>Error in Loading Audio</Text>}
        positiveBtn="Ok"
        modalVisible={isAudioError}
        dismissAlert={setIsAudioError}
        animationType="fade"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnRow: {
    flexDirection: "row",
    zIndex: -9999,
    top: -50,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    color: colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    marginTop: 5,
  },
  itemInfo: {
    color: colors.green,
    fontWeight: "bold",
    bottom: 3,
    fontSize: 11,
    paddingLeft: 5,
  },
  itemLoad: {
    color: colors.white,
  },
  artistText: {
    top: 6,
    color: colors.gray,
    paddingLeft: 10,
    fontSize: 10,
  },
  mins: {
    top: 20,
    color: colors.gray,
    paddingLeft: 10,
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
    top: 25,
    flex: 1,
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
  infoDots: {
    opacity: 0.3,
  },
  dotRow: {
    flexDirection: "row-reverse",
    bottom: 25,
  },
  playBtnView: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    zIndex: 9999,
    top: 50,
    bottom: 10,
  },
  divider_light: {
    top: 20,
    borderBottomWidth: 0.3,
    borderColor: colors.secondary,
    marginTop: 10,
    opacity: 0.2,
    // width: '80%',
  },
});

export default SoundItem;
