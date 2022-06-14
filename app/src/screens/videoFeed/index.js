import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
  useImperativeHandle,
} from "react";
import {
  Dimensions,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  Platform,
} from "react-native";
import PostSingle from "../../components/general/post";
import useMaterialNavBarHeight from "../../hooks/useMaterialNavBarHeight";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
import { useFeed, useUserPosts } from "../../services/posts";

import colors from "../../../config/colors";
import { useDispatch } from "react-redux";
import { types } from "../../redux/constants";
import TempFlatListItem from "./tempFlatListItem";

export default function FeedScreen({ route }) {
  const {
    setCurrentUserProfileItemInView,
    ref,
    creator,
    profile,
    selectedVideo,
  } = route.params;
  const [user, setUser] = useState("");
  const dispatch = useDispatch();

  const feed = useFeed(profile);

  const userPosts = useUserPosts(creator, {
    enabled: Boolean(profile) || Boolean(creator),
  });

  const isLoading = feed.isLoading || userPosts.isLoading;
  useRefreshOnFocus(profile ? userPosts.refetch : feed.refetch);

  //
  let posts = useMemo(() => {
    if (profile || creator) {
      return userPosts?.data || [];
    } else {
      return feed?.data || [];
    }
  }, [profile, feed.data, userPosts.data, creator]);

  //   posts = shuffleArray(posts);

  //  function shuffleArray(array) {
  //      for (let i = array.length - 1; i > 0; i--) {
  //          const j = Math.floor(Math.random() * (i + 1));
  //          [array[i], array[j]] = [array[j], array[i]];
  //      }
  //     return array;
  // }

  const inViewRefs = useRef({});

  const mediaRefs = useRef([]);

  const selectedVideoIndex = useMemo(() => {
    const videoIndex = posts.findIndex(
      (post) => post.media[0] === selectedVideo
    );
    return videoIndex > 0 ? videoIndex : 0;
  }, [selectedVideo, posts.length]);

  const [viewablePostId, setViewablePostId] = useState(posts[0]?.id);

  //   const onViewableItemsChanged = useRef(({ changed }) => {
  //     changed.forEach(element => {
  //         const cell = mediaRefs.current[element.key]
  //         if (cell) {
  //           console.log('onViewableItemsChanged', element, element.isViewable)
  //             if (element.isViewable) {
  //                 if (!profile) {
  //                     setCurrentUserProfileItemInView(element.item.creator)
  //                 }
  //                 cell.play()
  //             } else {
  //                 cell.stop()
  //             }
  //         }

  //     });
  // })

  const feedItemHeight =
    Dimensions.get("window").height - useMaterialNavBarHeight(profile);
  const getItemLayout = (data, index) => ({
    length: feedItemHeight,
    offset: feedItemHeight * index,
    index,
  });

  const renderItem = useCallback(
    ({ item }) => {
      // Declare the the setVisible function thats in the above code block

      if (Platform.OS === "ios") {
        return (
          <View style={{ height: feedItemHeight }}>
            <PostSingle
              item={item}
              ref={(PostSingleRef) =>
                (mediaRefs.current[item.id] = PostSingleRef)
              }
            />
          </View>
        );
      }
      if (Platform.OS === "android") {
        return viewablePostId === item.id ? (
          <View style={{ height: feedItemHeight }}>
            <PostSingle
              item={item}
              ref={(PostSingleRef) =>
                (mediaRefs.current[item.id] = PostSingleRef)
              }
            />
          </View>
        ) : (
          <View
            style={{
              height: feedItemHeight,
            }}
          >
            <Image
              source={{ uri: item.media[1].original_url }}
              style={{
                resizeMode: "cover",
                height: feedItemHeight,
                width: "100%",
              }}
            />
          </View>
        );
      }
    },
    [viewablePostId]
  );

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((item) => {
      console.log(item.index, item.isViewable)
      // looking for if its running index and boolean 
      inViewRefs.current[item.index]?.setVisible(item.isViewable);
    });
  });

  const myViewabilityConfig = useRef([
    {
      viewabilityConfig: { itemVisiblePercentThreshold: 45 },
      onViewableItemsChanged: onViewableItemsChanged.current,
    },
  ]);

  return (
    <View style={styles.container}>
      
      <FlatList
        showsVerticalScrollIndicator={false}
        data={posts}
        windowSize={Platform.OS === "android" ? 1 : 4}
        // initialNumToRender={Platform.OS === "android" ? 1 : 5}
        initialNumToRender={0}
        maxToRenderPerBatch={Platform.OS === "android" ? 1 : 2}
        removeClippedSubviews
        initialScrollIndex={selectedVideoIndex}
        // viewabilityConfigCallbackPairs={myViewabilityConfig}
        renderItem={renderItem}
        pagingEnabled
        getItemLayout={getItemLayout}
        keyExtractor={(item) => item.id}
        snapToInterval={
          Dimensions.get("window").height - useMaterialNavBarHeight(profile)
        }
        decelerationRate={"fast"}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
      
      {isLoading && (
        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="small" color={colors.green} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    color: colors.black,
    marginTop: 30,
    padding: 20,
  },
});
