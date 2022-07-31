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
  Alert
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as VideoThumbnails from "expo-video-thumbnails";
import { useIsFocused } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import BottomMenu from "./bottomMenu";
import colors from "../../../config/colors";


const START_RECORDING_DELAY = 3000;

export default function CameraScreen() {
  const [hasCameraPermissions, setHasCameraPermissions] = useState(false);
  const [hasAudioPermissions, setHasAudioPermissions] = useState(false);
  const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
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

  // const [cameraVideoStabilization, setCameraVideoStabilization ] = useState(
  //   Camera.Constants.VideoStabilization.auto
  // )

  const [isCameraReady, setIsCameraReady] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    /*  */
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
      try {
        const options = {
          maxDuration: 60,
          quality: Camera.Constants.VideoQuality["720p"],
        };
        if (Platform.OS === "ios") {
          options.codec = Camera.Constants.VideoCodec.H264;
        }
        const videoRecordPromise = cameraRef.recordAsync(options);

        setIsRecording(true);
        if (videoRecordPromise) {
          const data = await videoRecordPromise;
          const source = data.uri;
          let sourceThumb = await generateThumbnail(source);
          setIsRecording(false);
          navigation.navigate("savePost", { source, sourceThumb });
        }
      } catch (error) {
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
      navigation.navigate("savePost", { source: result.uri, sourceThumb });
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

  if (!hasCameraPermissions || !hasAudioPermissions || !hasGalleryPermissions) {
    return <View><Text>You did not give permissions.{"\n"} Please check camera settings in device.</Text></View>;
  }

  const onPressRecord = () => {
    if (!isRecording) {
      //recordVideo();
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

  const fadeOutCounter = () => {};

  return (
    <View style={styles.container}>
      {isFocused ? (
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
              cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            )
          }
        >
          <Feather name="refresh-ccw" size={24} color={colors.secondary} />
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
          <Feather name="zap" size={24} color={colors.secondary} />
          <Text style={styles.iconText}>Flash</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomBarContainer}>
        <View style={{ flex: 1 }}></View>
        <View style={styles.recordButtonContainer}>
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
        </View>
        <View style={{ flex: 1 }}>
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
        </View>
      </View>
      <BottomMenu />

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
    alignItems: "center",
    position: "absolute",
    bottom: 60,
    flexDirection: "row",
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
    bottom: 15,
  },
  galleryButtonImage: {
    width: 50,
    height: 50,
  },
  sideBarContainer: {
    top: 60,
    right: 0,
    marginHorizontal: 20,
    position: "absolute",
  },
  iconText: {
    color: colors.white,
    fontSize: 6,
    marginTop: 1,
  },
  sideBarButton: {
    alignItems: "center",
    marginBottom: 25,
  },
  soundText: {
    color: colors.white,
  },
  exitBtn: {
    color: colors.white,
    fontSize: 12,
    // flexDirection: "row-reverse",
    // justifyContent: "flex-start"
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
});
