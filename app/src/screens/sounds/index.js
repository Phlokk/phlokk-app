import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import RecordingNavBar from "../../components/general/navBar/recordingNav";
import { Entypo } from "@expo/vector-icons";
import colors from "../../../config/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SampleTrack = require("../../../assets/songs/yellow_brick_road.mp3");

const Sounds = [
  {
    id: 1,
    name: "Yellow Brick Road",
    artist: "Drama",
    duration: "1:00",
    url: require("../../../assets/songs/yellow_brick_road.mp3"),
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
        const result = await sound.current.loadAsync(Sounds[0].id.url, {}, true);
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

  const ItemRender = ({ name, artist, duration, artwork }) => (
    <View style={styles.item}>
      <View>
        <Image style={styles.avatar} source={artwork} />
      </View>
      <TouchableWithoutFeedback>
        {Loading ? (
          <ActivityIndicator size={"small"} color={colors.secondary} />
        ) : (
          <>
            {Loaded === false ? (
              <>
                <ActivityIndicator />
                <Text style={styles.itemLoad}>Loading</Text>
              </>
            ) : (
              <>
                 <View style={{flexDirection: 'row'}}>
                  <Entypo
                    onPress={PlayAudio}
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
              artwork={item.artwork}
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
  itemLoad: {
    color: colors.white,
    marginHorizontal: 30,
    textAlign: "center",
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
