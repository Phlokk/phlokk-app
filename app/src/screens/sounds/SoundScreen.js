import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Pressable
} from "react-native";
import { Audio } from "expo-av";
import RecordingNavBar from "../../components/general/navBar/recordingNav";
import { Entypo } from "@expo/vector-icons";
import colors from "../../../config/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchAudio from "./searchAudio/SearchAudio";
// import { openSettingsAudioModal } from "../../redux/actions/modal";
import SettingsAudioModalScreen from "../../components/modal/settingsAudioModalScreen/SettingsAudioModalScreen"

const smallLogo = require("../../../assets/pmd_logo_green.png");
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

export default function SoundScreen({placeholder, user}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [Loaded, SetLoaded] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const sound = useRef(new Audio.Sound());

  const [openSettingsAudioModal, setOpenSettingsAudioModal] = useState(false)

  // useEffect(() => {
  //   LoadAudio();
  // }, []);

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
        } else {
          SetLoading(false);
          SetLoaded(true);
        }
      } catch (error) {
        SetLoading(false);
      }
    } else {
      SetLoading(false);
    }
  };

  {
    <View>
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
        </View>
  }

  // onPress goes on text component in itemRender
  // const getItem = (songName) => {

  //   Alert.alert(songName);
  // onPress={()=> getItem(songName)}

  // }

  const ItemRender = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.albumRow}>
        <Image style={styles.album} source={item.artwork} />
      </View>
      <View style={styles.albumInfoRow}>
      <TouchableWithoutFeedback>

        <Text  style={styles.itemInfo}>
          <View style={styles.logoRow}
          
          >
            <Image style={styles.logo} 
            source={smallLogo} 
            cache='only-if-cached'
            />
          </View>
          {item.songName}
        </Text>

        <Text style={styles.artistText}>{item.artist}</Text>
        <Text style={styles.mins}>{item.duration}</Text>
      </TouchableWithoutFeedback>
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
            <SettingsAudioModalScreen user={user} /> 
          </View>
          </Modal>
          </View>
      </View>
    </View>
  );

  ItemSeparator = () => {
    return <View style={styles.seperator}></View>;
  };

  const keyExtractor = useCallback((item) => item.id);

  return (
    <SafeAreaView style={styles.container}>
      <RecordingNavBar title="Sound Bar" />
      <SearchAudio placeholder={placeholder} />
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
    paddingBottom: 10,
    width: 70,
    justifyContent: "center",
    alignItems: "center",

  },
  albumInfoRow: {
    flex: 1
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
    opacity: 0.1,
    backgroundColor: colors.secondary,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 10,
    
  },
  infoDots: {
    opacity: 0.3,
  },
  dotRow: {
    flexDirection: 'row-reverse',
    bottom: 25,
  }
});
