import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";

import useMaterialNavBarHeight from "../../hooks/useMaterialNavBarHeight";
import VideoItem from "./videoItem";
import {
  getFeed,
  getFeedAsync,
  useFeed,
  useVideoFeed,
} from "../../services/posts";

const VideoFeed = ({ route }) => {
  const { profile } = route.params;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentVideoPlayingStat, setCurrentVideoPlayingStat] = useState({});

  const { posts, getMoreVideos } = useVideoFeed();

  useEffect(() => {
    if (currentVideoIndex === posts?.length - 2) {
      getMoreVideos();
    }
  }, [currentVideoIndex]);

  const onFeedScroll = ({ index, prevIndex }) => {
    setCurrentVideoIndex(index);
  };

  const feedItemHeight =
    Dimensions.get("window").height - useMaterialNavBarHeight(profile);

  const getItemLayout = (data, index) => ({
    length: feedItemHeight,
    offset: feedItemHeight * index,
    index,
  });

  const renderItem = useCallback(
    ({ item, index }) => (
      <VideoItem
        item={item}
        index={index}
        currentVideoIndex={currentVideoIndex}
        feedItemHeight={feedItemHeight}
        setCurrentVideoPlayingStat={(status) =>
          setCurrentVideoPlayingStat(() => status)
        }
      />
    ),
    [currentVideoIndex]
  );

  return (
    <View style={styles.mainContainer}>
      {posts.length === 0 ? (
        <ActivityIndicator
          size={"large"}
          color={"white"}
          style={styles.activityIndicator}
        />
      ) : (
        <SwiperFlatList
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={renderItem}
          vertical={true}
          windowSize={Platform.OS === "android" ? 1 : 5}
          initialNumToRender={5}
          maxToRenderPerBatch={2}
          removeClippedSubviews
          keyExtractor={(item, index) => index.toString()}
          pagingEnabled
          getItemLayout={getItemLayout}
          snapToInterval={feedItemHeight}
          snapToAlignment={"start"}
          decelerationRate={"fast"}
          onChangeIndex={onFeedScroll}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  activityIndicator: {
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VideoFeed;
