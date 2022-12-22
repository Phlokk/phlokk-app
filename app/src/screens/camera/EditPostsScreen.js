import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {Video, Audio} from 'expo-av';
import { useIsFocused } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BottomMenu from "./BottomMenu";
import colors from "../../../config/colors";

export default function EditPostsScreen(sourceThumb, source) {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  console.log(source);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ position: "absolute", top: 50, right: 360 }}
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left-circle" size={25} color={colors.secondary} />
      </TouchableOpacity>
      <Video style={styles.videoPlayer} source={{ uri: source }} />
      <TouchableOpacity
        style={styles.savePostsArrow}
        onPress={() =>
          navigation.navigate("savePost", { source: result.uri, sourceThumb })
        }
      >
        <Feather name="arrow-right-circle" size={25} color={colors.green} />
      </TouchableOpacity>

      <View style={styles.bottomBarContainer}>
        <BottomMenu />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  bottomBarContainer: {
    flex: 1,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  savePostsArrow: {
    position: "absolute",
    bottom: 100,
    left: 360,
  },
  iconText: {
    color: colors.white,
    fontSize: 8,
    marginTop: 1,
  },

  soundText: {
    color: colors.white,
  },
  videoPlayer: {
    flex: 1,

  },
});
