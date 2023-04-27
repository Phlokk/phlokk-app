import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import * as VideoThumbnails from "expo-video-thumbnails";
import React, { useState, useEffect } from "react";
import colors from "../../../config/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
const SelectThumbnail = ({ route }) => {
  const navigation = useNavigation();
  const { videoUrl, setThumbUrl, duration } = route.params;
  const [thumbs, setThumbs] = useState([]);
  const [selectedThumb, setSelectedThumb] = useState(null);
  useEffect(async () => {
    setThumbs(await getThumbnails(videoUrl));
  }, [route.params]);

  async function getThumbnails(videoUri, numThumbnails = 10) {
    const videoDuration = duration;
    const interval = videoDuration / (numThumbnails + 1);
    const timestamps = Array.from(
      { length: numThumbnails },
      (_, i) => (i + 1) * interval
    );
    const thumbnails = await Promise.all(
      timestamps.map(async (time) => {
        const thumbnail = await getThumbnailAsync(videoUri, time * 1000);
        return thumbnail;
      })
    );
    setSelectedThumb(thumbnails[0]);
    return thumbnails;
  }
  const getThumbnailAsync = async (videoUri, time) => {
    const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
      time,
    });
    return uri;
  };
  const ImageItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.mediaItem}
        onPress={() => setSelectedThumb(item)}
      >
        <Image
          source={{ uri: item }}
          style={
            selectedThumb === item
              ? { ...styles.mediaPreview, ...styles.selectedThumbBorder }
              : { ...styles.mediaPreview }
          }
        />
      </TouchableOpacity>
    );
  };
  const handleSave = () => {
    if(!selectedThumb) return;
    setThumbUrl(selectedThumb);
    navigation.navigate("savePost", { videoUrl, videoThumb: selectedThumb,duration })
  }
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.postButton} onPress={handleSave}>
          <Text style={styles.postButtonText}>Save </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
      <Image source={{ uri: selectedThumb }} style={styles.selectedThumb} />
      </View>
     

      <View style={styles.listContainerScreen}>
        <View style={styles.listContainer}>
        <Text style={styles.text}>Select a cover photo</Text>
          <FlatList
            data={thumbs}
            renderItem={({ item }) => <ImageItem item={item} />}
            keyExtractor={(item) => item}
            horizontal={true}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  buttonContainer: {
    top: 50,
    right: 0,
    marginHorizontal: 20,
    position: "absolute",
    zIndex: 999,
  },
  imageContainer: {
    top: 125,
    left: 50,
  },
  postButtonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 14,
  },
  postButton: {
    alignItems: "center",
    marginBottom: 25, 
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  selectedThumb: {
    width: "75%",
    height: "75%",
    borderRadius: 3,
  },
  listContainerScreen: {
    height: 100,
  },
  listContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    top: 20,
  },
  text: {
    color: colors.secondary,
    marginBottom: 20,

  },
  mediaItem: {
    padding: 8,
  },
  mediaPreview: {
    width: 50,
    height: 50,
    borderRadius: 3,
  },
  selectedThumbBorder: {
    borderColor: colors.green,
    borderWidth: 3,
  },

});

export default SelectThumbnail;
