import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
//3rd party packages
import { Audio } from 'expo-av';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import routes from "../../../navigation/routes"
import colors from '../../../../config/colors';


const RecordingScreen = ({ navigation }) => {
const [recording, setRecording] = useState();
const [isPlaying, setPlaying] = useState(false);
const [consTime, setConstTime] = useState(60)
const [recordedTime, setRecordedTime] = useState(0)
const [spinnerKey, setSpinnerKey] = useState(false)

useEffect(() => {
    const blur = navigation.addListener('blur', async () => {
        if (!!recording) {
            await recordedTime.stopAndUnloadAsync();
        }
        setSpinnerKey(true)
    })
    const focus = navigation.addListener('focus', async () => {
        if (!!recording) {
            await recordedTime.stopAndUnloadAsync();
        }
        setSpinnerKey(true)
    })
    return blur, focus;
}, [navigation])


const _onPressIn = async () => {
    try {
        console.log('Requesting permissions..');
        console.log('Starting recording..');
        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await recording.startAsync();
        setRecording(recording);
        setPlaying(true)
        console.log('Recording started');
    } catch (err) {
        console.error('Failed to start recording', err);
    }
}
const _onPressOut = async () => {
    console.log('Stopping recording..');
    setPlaying(false)
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log(uri);
    if (!!uri) {
        navigation.navigate(routes.AUDIO_PLAYER, { data: { uri: uri, time: recordedTime } })
    }
}

useEffect(() => {
    (async () => {
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true
        })
    })();
}, [])

const checkTime = (time, elapsedTime) => {
    setRecordedTime(elapsedTime)
    if (!isPlaying && time !== 60 && !!recording || time == 0) {
        if (!!recording) {
            _onPressOut()
        }
    }
}

return (
    <View style={styles.container}>
        <View style={styles.infoRow}>
        <Text style={styles.mic}>
        <MaterialCommunityIcons 
            name="microphone-settings" 
            size={20} 
            color={colors.secondary} /></Text>
            
        </View>
        <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={consTime}
            key={spinnerKey}
            colors={colors.red}
        >
            {({ remainingTime, elapsedTime }) => (
                <Pressable
                    onPressIn={_onPressIn}
                    onPressOut={_onPressOut}
                >
                    {checkTime(remainingTime, elapsedTime)}
                        <Animated.Text style={styles.textStyle}>
                            {remainingTime}
                        </Animated.Text>
                        <Text style={styles.secsStyle}>secs left</Text>
                    {/* </LinearGradient> */}
                </Pressable>
            )}
        </CountdownCircleTimer>
        <View>
        <Text style={styles.recordInfo}>Create audio file</Text>
      </View>
    </View>
);
};


const styles = StyleSheet.create({
container: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
infoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
},
linearGradient: {
    width: 170,
    height: 170,
    borderRadius: 170 / 2,
    alignItems: 'center',
    justifyContent: 'center'
},
textStyle: {
    fontSize: 50,
    textAlign: "center",
    color: 'white',
    
},
secsStyle: {
    fontSize: 18,
    textAlign: "center",
    color: 'white',
    opacity: 0.7,
    
},
infotext: {
    color: colors.secondary,
    fontWeight: 'bold',

},
mic: {
    top: 45,
},
recordInfo: {
    color: colors.secondary,
    marginTop: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default RecordingScreen;
