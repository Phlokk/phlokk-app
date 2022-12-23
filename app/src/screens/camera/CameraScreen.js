import { Audio } from "expo-av";
import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  Platform,
  StyleSheet,
  Animated,
  Alert,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as VideoThumbnails from "expo-video-thumbnails";
import { useIsFocused } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import colors from "../../../config/colors";
import { Circle } from "react-native-progress";
import routes from "../../navigation/routes";
import CustomAlert from "../../components/Alerts/CustomAlert";
import SideIconOverlay from "./SideIconOverlay";


const START_RECORDING_DELAY = 3000;
const MAX_DURATION = 60;
const RECORDING_TIME_TICK = 100; // This is used for the progress bar ticking every interval

const convertMillisToPercentage = (ms) => ms / 1000 / 60;
const convertMillisToSeconds = (ms) => Math.floor(ms / 1000);

export default function CameraScreen() {
  const [hasCameraPermissions, setHasCameraPermissions] = useState();
  const [hasAudioPermissions, setHasAudioPermissions] = useState();
  const [hasGalleryPermissions, setHasGalleryPermissions] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [cameraFlash, setCameraFlash] = useState(
    Camera.Constants.FlashMode.off
  );
  const [startRecordingCountdown, setStartRecordingCountdown] = useState(
    START_RECORDING_DELAY / 1000
  );
  const [showCountdown, setShowCountdown] = useState();
  const [isLongPressRecording, setIsLongPressRecording] = useState();
  const countdownTimerRef = useRef();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const whitePulseAnim = useRef(new Animated.Value(1)).current;
  const whitePulseOpacity = useRef(new Animated.Value(0.9)).current;

  const [recordingTime, setRecordingTime] = useState(0);
  const recordingTimerRef = useRef();

  const [isCameraReady, setIsCameraReady] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();


  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermissions(cameraStatus.status == "granted");
      /*  */
      const audioStatus = await Audio.requestPermissionsAsync();
      setHasAudioPermissions(audioStatus.status == "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermissions(galleryStatus.status == "granted");

      if (galleryStatus.status == "granted") {
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({
          sortBy: ["creationTime"],
          mediaType: ["video"],
        });
        setGalleryItems(userGalleryMedia.assets);
      }
    })();
  }, []);

  useEffect(() => {
    if (startRecordingCountdown === 0) {
      clearInterval(countdownTimerRef.current);
      setStartRecordingCountdown(START_RECORDING_DELAY / 1000);
      setShowCountdown(false);
      recordVideo();
    }
  }, [startRecordingCountdown]);

  const recordVideo = async () => {
    if (cameraRef) {
      // Start up the timer to display the circle progress bar
      clearInterval(recordingTimerRef.current);
      setRecordingTime(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + RECORDING_TIME_TICK);
      }, RECORDING_TIME_TICK);

      try {
        const options = {
          maxDuration: MAX_DURATION,
          quality: Camera.Constants.VideoQuality["720p"],
        };
        if (Platform.OS === "ios") {
          options.codec = Camera.Constants.VideoCodec.H264;
        }
        const videoRecordPromise = cameraRef.recordAsync(options);

        // setIsRecording(true);
        // if (videoRecordPromise) {
        //   const data = await videoRecordPromise;
        //   const source = data.uri;
        //   let sourceThumb = await generateThumbnail(source);
        //   setIsRecording(false);
        //   clearInterval(recordingTimerRef.current);
        //   setRecordingTime(0);
        //   navigation.navigate("savePost", { source, sourceThumb });
        // }

        setIsRecording(true);
        if (videoRecordPromise) {
          const data = await videoRecordPromise;
          const source = data.uri;
          let sourceThumb = await generateThumbnail(source);
          setIsRecording(false);
          clearInterval(recordingTimerRef.current);
          setRecordingTime(0);
          navigation.navigate("editPosts", { source, sourceThumb });
        }
      } catch (error) {
        clearInterval(recordingTimerRef.current);
        setRecordingTime(0);
        Alert.alert("Video cannot record");
        setIsRecording(false);
      }
    }
    setIsRecording(false);
  };

  const stopVideo = async () => {
    if (cameraRef) {
      cameraRef.stopRecording();
    }
    clearInterval(recordingTimerRef.current);
    setRecordingTime(0);
    setIsRecording(false);
  };

  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      includeBase64: true,
      mediaType: "video",
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.cancelled) {
      let sourceThumb = await generateThumbnail(result.uri);
      navigation.navigate("editPosts", { source: result.uri, sourceThumb });
    }
  };

  const generateThumbnail = async (source) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(source, {
        time: 5000,
      });
      return uri;
    } catch (e) {
      console.warn(e);
    }
  };

  const onPressRecord = () => {
    if (!isRecording) {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
      setShowCountdown(true);
      runPulse();

      countdownTimerRef.current = setInterval(() => {
        runPulse();
        setStartRecordingCountdown((prev) => {
          return prev - 1;
        });
      }, 1000);
    } else {
      stopVideo();
    }
  };

  const onLongPress = () => {
    setIsLongPressRecording(true);
    recordVideo();
  };

  const onPressOut = () => {
    if (isLongPressRecording) {
      setIsLongPressRecording(false);
      stopVideo();
    }
  };

  const runPulse = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),

      Animated.sequence([
        Animated.timing(whitePulseAnim, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(whitePulseAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(whitePulseOpacity, {
            toValue: 0,
            duration: 25,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start(() => whitePulseOpacity.setValue(0.9));
  };

  if (
    hasCameraPermissions === false ||
    hasAudioPermissions === false ||
    hasGalleryPermissions === false
  ) {
    return (
      <SafeAreaView style={styles.errorView}>
        <MaterialIcons name="error-outline" size={40} color={colors.yellow} />
        <Text style={styles.cameraErrorText}>
          PERMISSIONS ERROR {"\n"}
          You did not give permissions.
          {"\n"}Please check camera settings in device.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {hasCameraPermissions && isFocused ? (
        <Camera
          ref={(ref) => setCameraRef(ref)}
          style={styles.camera}
          ratio={"16:9"}
          type={cameraType}
          flashMode={cameraFlash}
          onCameraReady={() => setIsCameraReady(true)}
        />
      ) : null}

      <View style={styles.sideBarContainer}>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() =>
            setCameraType(
              cameraType === Camera.Constants.Type.front
                ? Camera.Constants.Type.back
                : Camera.Constants.Type.front
            )
          }
        >
          <Feather name="refresh-ccw" size={24} color={colors.white} />
          <Text style={styles.iconText}>Flip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() =>
            setCameraFlash(
              cameraFlash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            )
          }
        >
          <Feather name="zap" size={24} color={colors.white} />
          <Text style={styles.iconText}>Flash</Text>
        </TouchableOpacity>
        <SideIconOverlay />
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
            transform: [{ scale: isRecording ? 1.5 : 1 }],
          },
        ]}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: "white" }}>
            {convertMillisToSeconds(recordingTime)}
          </Text>
          <View style={{ flex: 1 }}>
            <Pressable
              disabled={!isCameraReady}
              onPress={onPressRecord}
              onLongPress={onLongPress}
              onPressOut={onPressOut}
              style={({ pressed }) => {
                return [
                  styles.recordButton,
                  { backgroundColor: isRecording ? colors.red : colors.green },
                  { borderWidth: isRecording ? 4 : 3 },
                  { borderColor: isRecording ? colors.danger : colors.white },
                ];
              }}
            />
            <View
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
              pointerEvents="none"
            >
              <Circle
                size={80}
                thickness={4}
                fill="transparent"
                progress={convertMillisToPercentage(recordingTime)}
                color={colors.red}
                unfilledColor="white"
                borderWidth={0}
              />
            </View>
          </View>
          {!isRecording && (
            <View
              style={{
                position: "absolute",
                right: 0,
                left: 0,
                top: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
              pointerEvents="box-none"
            >
              <TouchableOpacity
                onPress={() => pickFromGallery()}
                style={styles.galleryButton}
              >
                {galleryItems[0] == undefined ? (
                  <></>
                ) : (
                  <Image
                    style={styles.galleryButtonImage}
                    source={{ uri: galleryItems[0].uri }}
                  />
                )}
              </TouchableOpacity>
              <Text style={styles.uploadText}>Upload</Text>
            </View>
          )}
        </View>
      </View>


      {showCountdown && (
        <Animated.View
          style={[
            styles.countdownWrapper,
            { transform: [{ scale: pulseAnim }] },
          ]}
          pointerEvents="box-none"
        >
          <View>
            <Animated.View
              style={[
                styles.countdownWhitePulse,
                {
                  opacity: whitePulseOpacity,
                  transform: [{ scale: whitePulseAnim }],
                },
              ]}
            />
            <View style={styles.countdownBackground}>
              <Text style={styles.countdownText}>
                {startRecordingCountdown}
              </Text>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

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
    right: 90,
    bottom: 7,
  },
});
