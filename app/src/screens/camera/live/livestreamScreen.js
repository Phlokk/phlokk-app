import {useRef} from "react";
import {Button, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {  NodeCameraView } from 'react-native-nodemediaclient';
import colors from '../../../../config/colors'



const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.CAMERA,PermissionsAndroid.PERMISSIONS.RECORD_AUDIO],
        {
          title: "Camera And Microphone Permission",
          message:
              "Phlokk App needs access to your camera " +
              "so you can go LIVE.",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
    );
    if (granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED && granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};



export default function LiveStreamScreen() {
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
          style={{ height: '80%', width: '100%' }}
          ref={vb}
          outputUrl = {"rtmp://88.97.6.186/live/" + deviceId}
          camera={{ cameraId: 1, cameraFrontMirror: true }}
          audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
          video={{ preset: 6, bitrate: 500000, profile: 2, fps: 30, videoFrontMirror: false }}
          denoise={true}
          smoothSkinLevel={5}
          autopreview={true}
          onStatus={(code, msg) => {
              console.log("onStatus=" + code + " msg=" + msg);
          }}
      />
      <Button onPress={startStream} title="Start"></Button>
      <Button onPress={stopStream} title="Stop"></Button>
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
