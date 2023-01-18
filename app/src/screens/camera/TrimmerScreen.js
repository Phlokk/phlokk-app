import { View, Text, Button, TouchableOpacity, Dimensions, StyleSheet} from 'react-native'
import React, {useState, useRef, useEffect} from 'react'
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
import Trimmer from 'react-native-trimmer'


import colors from "../../../config/colors"

const TrimmerScreen = ({route}) => {
const navigation = useNavigation();

const [Loaded, SetLoaded] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const [isAudioError, setIsAudioError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const [openSettingsAudioModal, setOpenSettingsAudioModal] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const [trimmerLeftHandlePosition,setTrimmerLeftHandlePosition ] = useState(0);
  const [trimmerRightHandlePosition, setTrimmerRightHandlePosition] = useState(5000);

  const [playing, setPlaying] = useState(false);
  const [scrubInterval, setScrubInterval] = useState(50);

  const [clearInterval, setClearInterval] = useState(false);
  const [interval, setInterval] = useState(false);

  const [scrubberPosition, setScrubberPosition] = useState(false);

  const minimumTrimDuration = 5000;
  const [totalDuration, setTotalDuration] = useState(1)

  


  
  const onLeftHandleChange = (newLeftHandleValue) => {
    setTrimmerLeftHandlePosition(newLeftHandleValue)
  }
 
  const onRightHandleChange = (newRightHandleValue) => {
    setTrimmerRightHandlePosition(newRightHandleValue)
  }

  const playScrubber = async  () => {
    setPlaying(true);
    }
 
    const scrubberInterval = () =>  {
      setInterval( scrubberPosition + scrubInterval)
  }
 
  const pauseScrubber = async () => {
    setClearInterval(scrubberInterval)
    setPlaying(false)
    setScrubberPosition(trimmerLeftHandlePosition);
    await PauseAudio();
  }

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

  const onScrubbingComplete = (newValue) => {
    setPlaying(false)
    setScrubberPosition(newValue)
  }




  const sound = useRef(new Audio.Sound());

useEffect( async () => {
  await LoadAudio()
  
}, [])



  const PlayAudio = async () => {
    
    console.log(sound.current.playableDurationMillis, "playableDurationMillis")
    console.log(sound.current.progressUpdateIntervalMillis, "progressUpdateIntervalMillis")
    console.log(sound.current.durationMillis, "durationMillis")
    try {
      await LoadAudio();
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
          playScrubber();

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
          { uri: route.params.item.sound_url },
          { shouldPlay: false, isLooping: false },

          false
        );
        setTotalDuration (result.playableDurationMillis);
        setScrubInterval(result.progressUpdateIntervalMillis);
        
        console.log(result, "result");
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
        setErrorMessage("No longer available");
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
    <View style={styles.container}>
      <View style={styles.trimmerView}>
      {
          playing
            ? <Button title="Pause" color="#f638dc" onPress={pauseScrubber}/>
            : <Button title="Play" color="#f638dc" onPress={PlayAudio}/>
        }
        <Trimmer
          style={styles.trimmer}
          onLeftHandleChange={onLeftHandleChange}
          onRightHandleChange={onRightHandleChange}
          totalDuration={totalDuration}
          trimmerLeftHandlePosition={trimmerLeftHandlePosition}
          trimmerRightHandlePosition={trimmerRightHandlePosition}
          minimumTrimDuration={minimumTrimDuration}
          maxTrimDuration={totalDuration}
          maximumZoomLevel={20}
          zoomMultiplier={2}
          initialZoomValue={1}
          scaleInOnInit={false}
          tintColor="#00CEC9"
          markerColor="#5a3d5c"
          trackBackgroundColor="#382039"
          trackBorderColor="#5a3d5c"
          scrubberColor="#00CEC9"
          scrubberPosition={scrubberPosition}
          onScrubbingComplete={onScrubbingComplete}
          onLeftHandlePressIn={() => console.log('onLeftHandlePressIn')}
          onRightHandlePressIn={() => console.log('onRightHandlePressIn')}
          onScrubberPressIn={() => console.log('onScrubberPressIn')}
        />
        </View>
      
       
     <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              navigation.navigate(routes.CAMERA, {item: item })}}
          >
            <View style={styles.bubble}>
              <MaterialCommunityIcons
                name="playlist-music-outline"
                size={29}
                color={colors.green}
              />
            </View>
          </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    flex: 1,
  },
  iconRow: {
    justifyContent: "space-between",
    flex: 1,
    position: "absolute",
    top: 95,
   
  },
  iconText: {
    textAlign: "center",
    width: 30, 
    color: colors.white,
    fontSize: 7,
    marginTop: 10,
  },
  sideBarButton: {
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    
  },
  backBtn: {
    justifyContent: "center",
  },
  // Trimmer
  trimmer: {
    width: "70%",
  },

  trimmerView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1, 
  }
});

export default TrimmerScreen;