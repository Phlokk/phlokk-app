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
import uuid from "uuid-random";
import {
  FFmpegKit,
  FFprobeKit,
  FFmpegKitConfig, 
} from "ffmpeg-kit-react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as VideoThumbnails from "expo-video-thumbnails";
import * as FileSystem from "expo-file-system";
import { useIsFocused } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../../config/colors";
import { Circle } from "react-native-progress";
// import routes from "../../navigation/routes";
import SideIconOverlay from "./SideIconOverlay";
import CustomAlert from "../../components/Alerts/CustomAlert";
import { Audio, Video } from "expo-av";
import RNFS from "react-native-fs"; 

const mergeVideos = async (video1Url, video2Url) => {
  try { 
    const outputFilePath = '/var/mobile/Containers/Data/Application/12A14550-BF38-468F-8529-DC3B00C4D4B3/Documents/merged_video.mov';
        const localVideo1Path = `${RNFS.DocumentDirectoryPath}/video1.mov`;
    const localVideo2Path = video2Url;

    RNFS.downloadFile({
      fromUrl: video1Url,
      toFile: localVideo1Path,
    }).promise.then(() => {
      console.log("Video 1 downloaded");
    }); 
    RNFS.exists(video2Url)
    .then((exists) => {
      if (exists) {
        console.log('Camera video file exists');
      } else {
        console.log('Camera video file does not exist');
      }
    })
    .catch((error) => {
      console.log('Error checking camera video file:', error);
    }); 
    let cameraUrl = localVideo2Path.split("file://")

    console.log("the URLs",localVideo1Path, cameraUrl[1])
    const ffmpegCommand = `-i ${localVideo1Path} -i ${cameraUrl[1]} -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1" -strict -2 ${outputFilePath}`;

    const executionId = FFmpegKit.executeAsync(ffmpegCommand, FFmpegKitConfig.RETURN_ON_MAIN_THREAD, (session) => {
      console.log(`FFmpeg process started with sessionId ${session.getSessionId()}.`);
    }, (session) => {
      console.log(`FFmpeg process exited with sessionId ${session.getSessionId()}.`);
      const returnCode = session.getReturnCode();
      console.log(`FFmpeg process exited with returnCode ${returnCode}.`);
      if (returnCode === ReturnCode.SUCCESS) {
        console.log('Video merge completed successfully.');
      } else {
        console.log('Video merge failed.');
      }
      console.log('FFmpeg process output:');
      console.log(session.getAllLogsAsString());
      console.log('FFmpeg process statistics:');
      console.log(session.getStatistics().getSummary());
    });
   
    // const executionId = FFmpegKit.executeAsync(ffmpegCommand, FFmpegKitConfig.RETURN_ON_MAIN_THREAD, (session) => {
    //   console.log(`FFmpeg process started with sessionId ${session.getSessionId()}.`);
    // }, (session) => {
    //   console.log(`FFmpeg process exited with sessionId ${session.getSessionId()}.`);
    //   const returnCode = session.getReturnCode();
    //   console.log(`FFmpeg process exited with returnCode ${returnCode}.`);
    //   if (returnCode === 0) {
    //     console.log('Video merge completed successfully.');
    //   } else {
    //     console.log('Video merge failed.');
    //   }
    // });
    


    // const ffmpegCommand = `-i ${localVideo1Path} -i ${cameraUrl[1]} -filter_complex "[0:v:0]scale=640x480,setsar=1[l];[1:v:0]scale=640x480,setsar=1[r];[l][r]hstack=inputs=2[v];[0:a:0][1:a:0]amerge[a]" -map "[v]" -map "[a]" -ac 2 ${outputPath}`;

    // FFmpegKit.executeAsync(ffmpegCommand, false).then(executionId => {
    //   const returnCode = FFmpegKitConfig?.getLastReturnCode();
    //   console.log("executionId", returnCode, executionId)
    
    //   // if (returnCode === 0) {
    //   //   console.log('Videos combined successfully!', outputPath);
    //   //   // Play or upload the output video from the outputPath
    //   // } else {
    //   //   console.log('Error combining videos:', FFmpegKitConfig.getLastCommandOutput(executionId));
    //   // }
    // }).catch(error => {
    //   console.log('Error combining videos:', error);
    // });
    
  } catch (error) {
    console.error(error);
  }
};

const START_RECORDING_DELAY = 3000;
const MAX_DURATION = 120;
const RECORDING_TIME_TICK = 100; // This is used for the progress bar ticking every interval

const convertMillisToPercentage = (ms) => ms / 1000 / 120;
const convertMillisToSeconds = (ms) => Math.floor(ms / 1000);
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default function CameraScreen({ route }) {
  const duo = route?.params?.duo;
  const post = route?.params?.post;
  const [isUploaded, setIsUploaded] = useState(false);
  const [isGeneratedThumb, setIsGeneratedThumb] = useState(false);

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
  const [duration, setDuration] = useState(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

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
    setStartRecordingCountdown(3);
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
        if (duo) options.mute = true;
        if (Platform.OS === "ios") {
          options.codec = Camera.Constants.VideoCodec.H264;
        }

        const videoRecordPromise = cameraRef.recordAsync(options);
        setIsRecording(true);
        if (videoRecordPromise) {
          if (route.params !== undefined) {
            PlayAudio();
          }
          let cameraRecordedUri = null;
          await videoRecordPromise
            .then((data) => {
              cameraRecordedUri = data.uri;
              return data.uri;
            })
            .then(async (source) => {
              setIsRecording(false);
              clearInterval(recordingTimerRef.current);
              setRecordingTime(0);
              stopVideo();
              pauseAudio();
              const sourceThumb = await generateThumbnail(source);
              if (route.params === undefined) {
                navigation.navigate("editPosts", { source, sourceThumb });
              } else {
                await generateVideo(source).then(async (outputFilePath) => { 
                  //  await mergeVideos(
                  //   post?.media[1]?.original_url,
                  //   cameraRecordedUri
                  // ); 
                  navigation.navigate("editPosts", {
                    source: outputFilePath,
                    sourceThumb,
                  });
                });
              }
            });
        }
      } catch (error) {
        console.log("Error", error);
        clearInterval(recordingTimerRef.current);
        setRecordingTime(0);
        Alert.alert("Video cannot record");
        setIsRecording(false);
      }
    }
    setIsRecording(false);
  };
  useEffect(async () => {
    if (isVideoEnded) {
      await stopVideo();
    }
  }, [isVideoEnded]);
  const stopVideo = async () => {
    if (cameraRef) {
      await cameraRef.stopRecording();
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
      duration: 120000,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled && result.duration < 120000) {
      let sourceThumb = await generateThumbnail(result.uri);
      navigation.navigate("editPosts", { source: result.uri, sourceThumb });
    } else if (result.cancelled) {
      null;
    } else {
      setIsUploaded(true);
    }
  };

  const generateThumbnail = async (source) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(source, {
        time: 5000,
      });
      return uri;
    } catch (e) {}
  };

  const secondsToHms = (d) => {
    d = Number(d);

    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    return (
      ("0" + h).slice(-2) +
      ":" +
      ("0" + m).slice(-2) +
      ":" +
      ("0" + s).slice(-2)
    );
  };

  const generateVideo = async (source) => {
    const ext = Platform.OS === "ios" ? "mov" : "mp4";
    let ffmpegCommand = null;
    const outputFilePath =
      FileSystem.cacheDirectory + "Camera/" + uuid() + "." + ext;

    if (!duo) {
      const ffprobeCommand =
        "-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 " +
        source;
      await FFprobeKit.execute(ffprobeCommand).then(async (session) => {
        const state = FFmpegKitConfig.sessionStateToString(
          await session.getState()
        );
        const returnCode = await session.getReturnCode();
        const output = await session.getOutput();
        setDuration(output.trim());
        if (route?.params?.item?.sound_url) {
          if (
            route.params.item.sound_url.endsWith(".mp3") ||
            route.params.item.sound_url.endsWith(".aac")
          ) {
            ffmpegCommand =
              "-i " +
              source +
              " -ss 00:00:00.00 -t " +
              secondsToHms(output.trim()) +
              " -i " +
              route.params.item.sound_url +
              " -map 0:v -map 1:a -c:v copy -c:a copy " +
              outputFilePath +
              " -y";
          }
          if (
            route.params.item.sound_url.endsWith(".m4a") ||
            route.params.item.sound_url.endsWith(".ogg") ||
            route.params.item.sound_url.endsWith(".wav")
          ) {
            ffmpegCommand =
              "-i " +
              source +
              " -ss 00:00:00.00 -t " +
              secondsToHms(output.trim()) +
              " -i " +
              route.params.item.sound_url +
              " -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 " +
              outputFilePath +
              " -y";
          }
        }
      });
      await FFmpegKit.execute(ffmpegCommand);
    }
    return outputFilePath;
  };

  const sound = useRef(new Audio.Sound());

  const [Loading, SetLoading] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAudioError, setIsAudioError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [videoResizeMode, setVideoResizeMode] = useState(
    Video.RESIZE_MODE_COVER
  );

  const PlayAudio = async () => {
    try {
      await LoadAudio();
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          if (!showCountdown) {
            await delay(450);
          } else if (showCountdown) {
            await delay(450);
          }
          const playbackStatus = await sound.current.replayAsync();
          isLooping(true);
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

        if (result.isLoaded === false) {
          SetLoading(false);
        } else {
          SetLoading(false);
        }
      } catch (error) {
        setIsAudioPlaying(false);
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

  const onPressRecord = async () => {
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

      LoadAudio();
      PlayAudio();
    } else {
      stopVideo();
    }
  };

  const pauseAudio = async () => {
    const result = await sound.current.getStatusAsync();
    if (result.isLoaded) {
      if (result.isPlaying === true) {
        sound.current.unloadAsync();
      }
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
      pauseAudio();
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
    ]).start(() => {});
  };
  const handlePlayBackStatus = (status) => {
    if (status.didJustFinish) {
      setIsVideoEnded(true);
    }
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
    (
      <View style={duo ? styles.duoContainer : styles.container}>
        {hasCameraPermissions && isFocused ? (
          <Camera
            ref={(ref) => setCameraRef(ref)}
            style={duo ? styles.duoCamera : styles.camera}
            ratio={"16:9"}
            type={cameraType}
            flashMode={cameraFlash}
            onCameraReady={() => setIsCameraReady(true)}
            // zoom={0.02}
          />
        ) : null}
        {duo && (
          <Video
            source={{
              uri: post?.media[1]?.original_url,
              type: post?.media[1]?.mime_type,
            }}
            style={styles.duoVideoRenderer}
            shouldPlay={isRecording}
            resizeMode={videoResizeMode}
            onPlaybackStatusUpdate={(e) => handlePlayBackStatus(e)}
            onReadyForDisplay={(e) => {
              const orientation = e.naturalSize.orientation;
              if (orientation === "landscape") {
                setVideoResizeMode(Video.RESIZE_MODE_CONTAIN);
              } else {
                setVideoResizeMode(Video.RESIZE_MODE_COVER);
              }
            }}
          />
        )}

        {!isRecording && (
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
            {!duo && (
              <>
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
                <>
                  {!isRecording && (
                    <View
                      style={{
                        position: "absolute",
                        right: 0,
                        left: 0,
                        top: 140,
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
                        <Text style={styles.uploadText}>Upload</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
                <View style={styles.uploadView}>
                  <Text style={styles.iconText}>Upload</Text>
                </View>
              </>
            )}
          </View>
        )}

        <View style={[styles.bottomBarContainer]}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {!isRecording && (
              <SideIconOverlay
                duo={duo}
                isRecording={isRecording}
                pickFromGallery={pickFromGallery}
                uploadImgUri={galleryItems[0]?.uri}
              />
            )}

            <Text style={{ color: "white", paddingBottom: 5 }}>
              {secondsToHms(convertMillisToSeconds(recordingTime))}
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
                    { backgroundColor: colors.green },
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

            {!isRecording && !duo && (
              <View
                style={{
                  backgroundColor: "rgba(125, 125, 125, 0.4)",
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  position: "absolute",
                  right: 0,
                  left: 280,
                  top: 45,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                pointerEvents="box-none"
              >
                <TouchableOpacity onPress={() => {}}>
                  <MaterialIcons
                    name="settings-backup-restore"
                    size={35}
                    color={colors.white}
                  />
                </TouchableOpacity>
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
        <CustomAlert
          alertTitle={
            <Text>
              <AntDesign name="warning" size={24} color={colors.red} />
            </Text>
          }
          customAlertMessage={
            <Text>Video is too long! {"\n"} Max upload time = 2 mins</Text>
          }
          positiveBtn="Ok"
          modalVisible={isUploaded}
          dismissAlert={setIsUploaded}
          animationType="fade"
        />
        <CustomAlert
          alertTitle={
            <Text>
              <AntDesign name="warning" size={24} color={colors.red} />
            </Text>
          }
          customAlertMessage={<Text>Could not generate thumbnail!</Text>}
          positiveBtn="Ok"
          modalVisible={isGeneratedThumb}
          dismissAlert={setIsGeneratedThumb}
          animationType="fade"
        />
      </View>
    )
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
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 100,
    height: 80,
    width: 80,
    alignSelf: "center",
  },
  galleryButton: {
    borderWidth: 0.7,
    borderColor: colors.secondary,
    borderRadius: 7,
    overflow: "hidden",
    width: 30,
    height: 30,
  },
  galleryButtonImage: {
    width: 30,
    height: 30,
  },
  sideBarContainer: {
    top: 50,
    right: 5,
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
    height: 300,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  countdownText: {
    color: colors.white,
    fontSize: 175,
  },
  countdownWhitePulse: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
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
  cameraExtraBtn: {
    color: colors.white,
  },
  uploadText: {
    color: colors.white,
    top: 60,
    fontWeight: "bold",
  },
  uploadView: {
    top: 40,
  },
  duoCamera: {
    backgroundColor: colors.black,
    height: 370,
    flex: 1,
  },
  duoVideoRenderer: {
    height: 370,
    flex: 1,
  },
  duoContainer: {
    flex: 1,
    height: 370,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
  },
});
