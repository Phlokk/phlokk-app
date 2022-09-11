import axios from "axios";
import { Video } from "expo-av";
import { useRef, useState } from "react";
import {
  Button,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../../../config/colors";

export default function LiveStreamURLScreen() {
  // const { streamList, setStreamList } = useState({});
  // axios.get("http://88.97.6.186:8088/index.php").then(async (response) => {
  // setStreamList(response.data);
  // });

  return (
    <View style={styles.container}>
      <Video
        source={{
          uri: "http://88.97.6.186:8088/hls/demo_620.m3u8",
        }}
        rate={1.0}
        volume={1.0}
        resizeMode="cover"
        shouldPlay
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
