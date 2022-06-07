import { Audio } from "expo-av";
import { Camera } from "expo-camera";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as VideoThumbnails from "expo-video-thumbnails";
import routes from "../../navigation/routes"
import { useIsFocused } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import colors from "../../../config/colors";

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
  // const [cameraVideoStabilization, setCameraVideoStabilization ] = useState(
  //   Camera.Constants.VideoStabilization.auto
  // )

  const [isCameraReady, setIsCameraReady] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();


  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermissions(cameraStatus.status == "granted");

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
          // console.log("data", data);
          const source = data.uri;
          let sourceThumb = await generateThumbnail(source);
          setIsRecording(false);
          // console.log(source)
          navigation.navigate("savePost", { source, sourceThumb });
        }
      } catch (error) {
        // console.log(error);
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
      mediaType: 'video',
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
    return <View></View>;
  }

  const onPressRecord = () => {
    if (!isRecording) {
      recordVideo();
    } else {
      stopVideo();
    }
  };

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
          <Feather name="refresh-ccw" size={24} color={colors.green} />
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
          <Feather name="zap" size={24} color={colors.green} />
          <Text style={styles.iconText}>Flash</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() =>
            Alert.alert("Text w/ keyframes", "Coming in beta version 3!")
          }
        >
          <Feather name="align-left" size={24} color={colors.green} />
          <Text style={styles.iconText}>Text</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() =>
            Alert.alert("Digital Timing", "Coming in beta version 3!")
          }
        >
          <MaterialCommunityIcons
            name="account-clock-outline"
            size={24}
            color={colors.green}
          />
          <Text style={styles.iconText}>Timing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => Alert.alert("Speed", "Coming in beta version 3!")}
        >
          <Octicons name="dashboard" size={24} color={colors.green} />
          <Text style={styles.iconText}>Speed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => Alert.alert("FX", "Coming in beta version 3!")}
        >
          <FontAwesome name="magic" size={24} color={colors.green} />
          <Text style={styles.iconText}>FX</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => Alert.alert("Replies", "Coming in beta version 3!")}
        >
          <MaterialIcons
            name="chat-bubble-outline"
            size={24}
            color={colors.green}
          />
          <Text style={styles.iconText}>Replies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => navigation.navigate(routes.SOUNDS)}
          // onPress={() => Alert.alert("Sound Bar", "Coming in beta version 3!")}
        >
          <Entypo name="beamed-note" size={24} color={colors.green} />
          <Text style={styles.iconText}>Sounds</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBarContainer}>
        <View style={{ flex: 1 }}></View>
        <View style={styles.recordButtonContainer}>
          <Pressable
            disabled={!isCameraReady}
            onPress={onPressRecord}
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
    bottom: 0,
    flexDirection: "row",
    marginBottom: 10,
  },
  recordButtonContainer: {
    flex: 1,
    marginBottom: 30,
    marginHorizontal: 30,
  },
  speedText: {
    color: colors.black,
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
});
