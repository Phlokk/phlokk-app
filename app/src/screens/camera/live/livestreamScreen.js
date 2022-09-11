import React, {useRef, useState} from "react";
import {Button, Image, PermissionsAndroid, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {  NodeCameraView } from 'react-native-nodemediaclient';
import colors from '../../../../config/colors'
import {Camera} from "expo-camera";
import {Feather} from "@expo/vector-icons";
import routes from "../../../navigation/routes";
import { useIsFocused } from "@react-navigation/core";
import BottomMenu from "../bottomMenu";
import {Circle} from "react-native-progress";



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
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraType, setCameraType] = useState(1); // 0 = back; 1 = front;
  const [isLive, setIsLive] = useState(false);
  const isFocused = useIsFocused();

  const flipCamera = async () => {
      cameraRef.switchCamera()
  }
  const toggleStream = async() => {
      (isLive) ? stopStream() : startStream();
  }

  const startStream = async () => {
    cameraRef.start();
    console.log('started');
    setIsLive(true);
  };
  const stopStream = async () => {
    cameraRef.stop();
    console.log('stopped');
    setIsLive(false);
  };

  const deviceId = 'demo_' + (Math.floor(Math.random() * (999 - 100)) + 100);
  // return (
    // <View style={styles.container}>
    //   <NodeCameraView
    //       style={{ height: '80%', width: '100%' }}
    //       ref={(ref) => setCameraRef(ref)}
    //       outputUrl = {"rtmp://88.97.6.186/live/" + deviceId}
    //       camera={{ cameraId: 1, cameraFrontMirror: true }}
    //       audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
    //       video={{ preset: 6, bitrate: 500000, profile: 2, fps: 30, videoFrontMirror: false }}
    //       denoise={true}
    //       smoothSkinLevel={5}
    //       autopreview={true}
    //       onStatus={(code, msg) => {
    //           console.log("onStatus=" + code + " msg=" + msg);
    //       }}
    //   />
    //   <Button onPress={startStream} title="Start"></Button>
    //   <Button onPress={stopStream} title="Stop"></Button>
    // </View>

    return (
        <View style={styles.container}>
            {isFocused ? (
                <NodeCameraView
                  style={{ height: '91%', width: '100%' }}
                  ref={(ref) => setCameraRef(ref)}
                  outputUrl = {"rtmp://88.97.6.186/live/" + deviceId}
                  camera={{ cameraId: cameraType, cameraFrontMirror: true }}
                  audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
                  video={{ preset: 6, bitrate: 500000, profile: 2, fps: 30, videoFrontMirror: false }}
                  denoise={true}
                  smoothSkinLevel={5}
                  autopreview={true}
                  onStatus={(code, msg) => {
                      console.log("onStatus=" + code + " msg=" + msg);
                  }}
                />
            ) : null}

            <View style={styles.sideBarContainer}>
                <TouchableOpacity
                    style={styles.sideBarButton}
                    onPress={flipCamera}
                >
                    <Feather name="refresh-ccw" size={24} color={colors.white} />
                    <Text style={styles.iconText}>Flip</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ position: "absolute", top: 0, right: 360 }}
                    onPress={() => navigation.navigate(routes.FEED)}
                >
                    <Feather name="x" size={25} color={colors.white} />
                </TouchableOpacity>
            </View>

            <View
                style={[
                    styles.bottomBarContainer,
                    {
                        transform: [{ scale: isLive ? 1.5 : 1 }],
                    },
                ]}
            >
                <View
                    style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
                >
                    <View style={{ flex: 1 }}>
                        <Pressable
                            onPress={toggleStream}
                            // onLongPress={onLongPress}
                            // onPressOut={onPressOut}
                            style={({ pressed }) => {
                                return [
                                    styles.recordButton,
                                    { backgroundColor: isLive ? colors.red : colors.green },
                                    { borderWidth: isLive ? 4 : 3 },
                                    { borderColor: isLive ? colors.danger : colors.white },
                                ];
                            }}
                        />
                    </View>
                </View>
            </View>

            <BottomMenu />
        </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        backgroundColor: colors.black,
    },
    bottomBarContainer: {
        position: "absolute",
        bottom: 120,
        flexDirection: "row",
        alignItems: "center",
    },
    recordButtonContainer: {
        flex: 1,
        marginBottom: 30,
        marginHorizontal: 30,
    },
    recordButton: {
        borderWidth: 3,
        borderColor: colors.white,
        borderRadius: 100,
        height: 80,
        width: 80,
        alignSelf: "center",
    },
    galleryButton: {
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 10,
        overflow: "hidden",
        width: 50,
        height: 50,
        marginLeft: 200,
    },
    galleryButtonImage: {
        width: 50,
        height: 50,
    },
    sideBarContainer: {
        top: 48,
        right: 0,
        marginHorizontal: 20,
        position: "absolute",
    },
    iconText: {
        color: colors.white,
        fontSize: 8,
        marginTop: 1,
    },
    sideBarButton: {
        alignItems: "center",
        marginBottom: 25,
    },
    soundText: {
        color: colors.white,
    },
    countdownWrapper: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    countdownBackground: {
        backgroundColor: colors.green,
        height: 200,
        width: 200,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
    },
    countdownText: {
        color: colors.white,
        fontSize: 120,
    },
    countdownWhitePulse: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: colors.white,
        borderRadius: 100,
    },
    errorView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: colors.primary,
    },
    cameraErrorText: {
        margin: 20,
        textAlign: "center",
        color: colors.green,
    },
    uploadText: {
        fontSize: 8,
        fontWeight: "bold",
        color: colors.white,
        position: "absolute",
        right: 88,
        bottom: 2,
    },
});
