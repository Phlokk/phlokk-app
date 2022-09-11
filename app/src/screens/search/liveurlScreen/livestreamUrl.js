import {useRef} from "react";
import {Button, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {  NodeCameraView } from 'react-native-nodemediaclient';
import colors from '../../../../config/colors'



// const requestCameraPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.CAMERA,PermissionsAndroid.PERMISSIONS.RECORD_AUDIO],
//         {
//           title: "Camera And Microphone Permission",
//           message:
//               "Phlokk App needs access to your camera " +
//               "so you can go LIVE.",
//           buttonNegative: "Cancel",
//           buttonPositive: "OK"
//         }
//     );
//     if (granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED && granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log("You can use the camera");
//     } else {
//       console.log("Camera permission denied");
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };



export default function LiveStreamURLScreen() {
  const vb = useRef(null);
  let isStreaming = useRef(false);

  const startStream = async () => {
    vb.current.start();
    console.log('started');
    isStreaming.current = true;
  };
  const stopStream = async () => {
    vb.current.stop();
    console.log('stopped');
    isStreaming.current = false;
  };

  const deviceId = 'demo_' + (Math.floor(Math.random() * (999 - 100)) + 100);
  return (
    <View style={styles.container}>
      <NodeCameraView
          style={{ height: '90%', width: '100%' }}
          ref={vb}
          outputUrl = {"rtmp:http://88.97.6.186:8088/index.php" + deviceId}
          camera={{ cameraId: 1, cameraFrontMirror: true }}
          audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
          video={{ preset: 12, bitrate: 400000, profile: 2, fps: 30, videoFrontMirror: false }}
          denoise={true}
          smoothSkinLevel={5}
          autopreview={true}
      />

        <TouchableOpacity onPress={startStream}><Text>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={startStream}><Text>Stop</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});