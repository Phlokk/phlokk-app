// import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { Entypo } from '@expo/vector-icons'; 
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { Audio } from 'expo-av'
// import colors from '../../../../config/colors';

// const RecordingScreen = () => {
//     const [recording, setRecording] = useState();
//     const [recordings, setRecordings] = useState([]);
//     const [message, setMessage] = useState("");

  

//     async function startRecording() {
//         try {
//             const permission = await Audio.requestPermissionsAsync();

//             if(permission.status === "granted") {
//                 await Audio.setAudioModeAsync({
//                     allowsRecordingIOS: true,
//                     playsInSilentModeIOS: true

//                 });

//                 const { recording } = await Audio.Recording.createAsync(
//                     Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
//                 );
//                 setRecording(recording)
//             } else {
//                 setMessage("Please grant permission to app to access microphone");
//             }
//         } catch (err) {
//             console.error('Failed to start recording', err)
//         }
//     }

//     async function stopRecording() {
//         setRecording(undefined);
//         await recording.stopAndUnloadAsync();

//         let updateRecordings = [...recordings];
//         const { sound, status } = await recording.createNewLoadedSoundAsync();
//         updateRecordings.push({
//             sound: sound,
//             duration: getDurationFormatted(status.durationMillis),
//             file: recording.getURI()
//         });

//         setRecordings(updateRecordings);
//     }

//     function getDurationFormatted(millis) {
//         const minutes = millis / 1000 / 60;
//         const minutesDisplay = Math.floor(minutes);
//         const seconds = Math.round((minutes - minutesDisplay) * 60);
//         const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
//         return `${minutesDisplay}:${secondsDisplay}`;
//     }

//     function getRecordingInfo(){
//         return recordings.map((recordingInfo, index) => {
//             return (
//                 <View key={index} style={styles.row}>
//                     <Text style={styles.fill}>Recording {index + 1} - {recordingInfo.duration}</Text>
//                     <TouchableOpacity style={styles.playBtn} onPress={() => recordingInfo.sound.replayAsync()}>
//                         <Text style={styles.recText}>Play</Text>
//                     </TouchableOpacity>
//                 </View>
//             )
//         });
//     }

//   return (
//     <View style={styles.container}>
//       <Text>{message}</Text>
//       <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
//       <Text style={styles.recText}>{ recording ? <Text><MaterialCommunityIcons name="stop-circle-outline" size={40} color="red" /></Text> : <Text><Entypo name="controller-play" size={40} color={colors.secondary} /></Text>}</Text>
//       </TouchableOpacity>
//       {getRecordingInfo()}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: colors.primary,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     row: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     fill: {
//         flex: 1,
//         margin: 16,
//         color: colors.secondary,
//     },
//     playBtn: {
//         margin: 16,
//     },
//     recText:{
//         color: colors.secondary,
//         fontWeight: 'bold',
//         fontSize: 14,
//     }
// });

// export default RecordingScreen;