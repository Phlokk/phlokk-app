import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";

import useMaterialNavBarHeight from "../../hooks/useMaterialNavBarHeight";
import VideoItem from "./videoItem";
import {
  getFeed,
  getFeedAsync,
  useFeed,
  useUserVideoFeed,
  useVideoFeed,
} from "../../services/posts";
import { useAtom } from "jotai";
import { userAtom } from "../../../../App";

const { height } = Dimensions.get("window");

const VideoFeed = ({ route }) => {
  const [user, setUser] = useAtom(userAtom);
  const { profile, selectedIndex } = route.params;
  const flatListRef = useRef();

  const [currentVideoIndex, setCurrentVideoIndex] = useState(
    selectedIndex || 0
  );
  const [currentVideoPlayingStat, setCurrentVideoPlayingStat] = useState({});

  const {
    posts,
    getMoreVideos,
    loading: loadingMainFeed,
  } = useVideoFeed({
    skip: profile,
  });
  const {
    posts: userPosts,
    getMoreUserPosts,
    loading: loadingUserFeed,
  } = useUserVideoFeed(user._id, {
    skip: !profile,
  });

  useEffect(() => {
    if (currentVideoIndex === posts?.length - 2) {
      if (profile) {
        getMoreUserPosts();
      } else {
        getMoreVideos();
      }
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

  if (loadingMainFeed || loadingUserFeed) {
    return (
      <View style={styles.mainContainer}>
        <ActivityIndicator
          size={"large"}
          color={"white"}
          style={styles.activityIndicator}
        />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <SwiperFlatList
        ref={flatListRef}
        index={selectedIndex}
        showsVerticalScrollIndicator={false}
        data={profile ? userPosts : posts}
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
