import {useRef} from "react";
import {Button, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View, Pressable} from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import {  NodeCameraView } from 'react-native-nodemediaclient';
import colors from '../../../../config/colors'
import { color } from "react-native-reanimated";



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
      <Pressable style={styles.stopIcon} onPress={stopStream} >
       <Text style={styles.stopText}>Stop</Text></Pressable>

      <View style={styles.iconRow}>
      <Pressable style={styles.btnIcon} onPress={startStream} >
       <Text style={styles.goLiveTxt}>Go LIVE</Text></Pressable>
       </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  btnIcon: {
    backgroundColor: colors.green,
    color: colors.white,
    width: 250,
    height: 60, 
    bottom: 10,
    margin: 60, 
    borderRadius: 50, 
    alignItems: 'center',
  },
  goLiveTxt: {
    fontSize: 16, 
    top: 20,
    color: colors.white,
    fontWeight: "bold",
  },
  stopText: {
    color: colors.white,
    fontWeight: "bold",
    
  },
  stopIcon: {
    position: "absolute",
    top: 50,
    bottom: 0,
    left: 10,
    right: 0,
  },

 
 
});
