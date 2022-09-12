import { useRef, useState } from "react";
import {
  Button,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { NodeCameraView } from "react-native-nodemediaclient";
import colors from "../../../../config/colors";
import { useIsFocused } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/native";
import routes from "../../../navigation/routes";
import LiveBottomMenu from "../liveBottomMenu/liveBottomMenu";
import CustomAlert from "../../../components/Alerts/customAlert";

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ],
      {
        title: "Camera And Microphone Permission",
        message:
          "Phlokk App needs access to your camera " + "so you can go LIVE.",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (
      granted["android.permission.CAMERA"] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted["android.permission.RECORD_AUDIO"] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log("Access to camera granted");
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
  const [share, setShare] = useState(false);
  const isFocused = useIsFocused();

  const [recordingTime, setRecordingTime] = useState(0);
  const recordingTimerRef = useRef();
  const navigation = useNavigation();

  const flipCamera = async () => {
    cameraRef.switchCamera();
  };
  const toggleStream = async () => {
    isLive ? stopStream() : startStream();
  };

  const startStream = async () => {
    // Start LIVE
    clearInterval(recordingTimerRef.current);
    cameraRef.start();
    console.log("started");
    setIsLive(true);
  };
  const stopStream = async () => {
    cameraRef.stop();
    console.log("stopped");
    setIsLive(false);
  };

  const deviceId = "demo_" + (Math.floor(Math.random() * (999 - 100)) + 100);

  return (
    <View style={styles.container}>
      {isFocused ? (
        <NodeCameraView
          style={{ height: "91%", width: "100%" }}
          ref={(ref) => setCameraRef(ref)}
          outputUrl={"rtmp://88.97.6.186/live/" + deviceId}
          camera={{ cameraId: cameraType, cameraFrontMirror: true }}
          audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
          video={{
            preset: 6,
            bitrate: 500000,
            profile: 2,
            fps: 30,
            videoFrontMirror: false,
          }}
          denoise={true}
          smoothSkinLevel={5}
          autopreview={true}
          onStatus={(code, msg) => {
            console.log("onStatus=" + code + " msg=" + msg);
          }}
        />
      ) : null}

      <View style={styles.sideBarContainer}>
        <TouchableOpacity style={styles.sideBarButton} onPress={flipCamera}>
          <Feather name="refresh-ccw" size={24} color={colors.white} />
          <Text style={styles.iconText}>Flip</Text>
        </TouchableOpacity>
        <CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={<Text>Share LIVE{"\n"}coming in official release</Text>}
            positiveBtn="Ok"
            modalVisible={share}
            dismissAlert={setShare}
            animationType="fade"
          />
          <TouchableOpacity
            style={styles.sideBarButton}
            onPress={() => setShare(true)}
          >
            <MaterialCommunityIcons name="share" size={29} color={colors.white} />
            <Text style={styles.iconText}>Share</Text>
          </TouchableOpacity>

        <TouchableOpacity
          style={{ position: "absolute", top: 0, right: 360 }}
          onPress={() => navigation.navigate(routes.FEED)}
        >
          <Feather name="x" size={25} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={[styles.bottomBarContainer]}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={{ flex: 1 }}>
            <Pressable
              style={({ pressed }) => {
                return [
                  styles.recordButton,
                  { backgroundColor: isLive ? colors.red : colors.green },
                  { borderWidth: 3 },
                  { borderColor: isLive ? colors.danger : colors.white },
                ];
              }}
            />
            <Text onPress={toggleStream} style={styles.goLiveTxt}>Go LIVE</Text>
          </View>
        </View>
      </View>

      <LiveBottomMenu />
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
    height: 60,
    width: 220,
    alignSelf: "center",
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
  goLiveTxt: {
    position: "absolute",
    top: 20,
    bottom: 0,
    left: 70,
    right: 0,

    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
