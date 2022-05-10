import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  Dimensions,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  Platform,
  Text,
} from "react-native";
import PostSingle from "../../components/general/post";
import useMaterialNavBarHeight from "../../hooks/useMaterialNavBarHeight";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
import { useFeed, useUserPosts } from "../../services/posts";

import colors from "../../../config/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { USER_STATE_CHANGE } from "../../redux/constants";
import axios from "axios";

export default function FeedScreen({ route }) {
  const { setCurrentUserProfileItemInView, creator, profile, selectedVideo } =
    route.params;
  const [user, setUser] = useState("");
  const dispatch = useDispatch();

    // const feed = useFeed(profile);

  //   // const userPosts = useUserPosts(creator, {
  //   //   enabled: Boolean(profile) || Boolean(creator),
  //   // });

    // const isLoading = feed.isLoading || userPosts.isLoading;
  //   useRefreshOnFocus(profile ? userPosts.refetch : feed.refetch);

  //   let posts = useMemo(() => {
  //     if (profile || creator) {
  //       return userPosts?.data || [];
  //     } else {
  //       return feed?.data || [];
  //     }
  //   }, [profile, feed.data, userPosts.data, creator]);
  //   console.log("posts", posts.length);
  //   console.log(posts)

  // // todo - what are we blocking??????
  //   let blocked = ['id here'];
  //   posts = posts.filter(function (i) {
  //     return !blocked.includes(i.id);
  //   });

  //   // to do - where is the video coming in?

  //   posts = shuffleArray(posts)

  //  function shuffleArray(array) {
  //    console.log(array);
  //      for (let i = array.length - 1; i > 0; i--) {
  //          const j = Math.floor(Math.random() * (i + 1));
  //          [array[i], array[j]] = [array[j], array[i]];
  //      }
  //     return array;
  // }

  // const mediaRefs = useRef([]);
  // const selectedVideoIndex = useMemo(() => {

  //   const videoIndex = posts.findIndex(

  //     (post) => post.media[0] === selectedVideo
  //   );
  //   return videoIndex > 0 ? videoIndex : 0;
  // }, [selectedVideo, posts.length]);

  // const [viewablePostId, setViewablePostId] = useState(posts[0]?.id);
  // const onViewableItemsChanged = useRef(({ changed }) => {
  //   changed.forEach((element) => {
  //     const cell = mediaRefs.current[element.key];
  //     console.log("cell", cell);

  //     if (element.isViewable) {
  //       console.log("visiable element", element.item.id);
  //       if (!profile) {
  //         setCurrentUserProfileItemInView(element.item.creator);
  //       }
  //       setViewablePostId(element.item.id);
  //       cell.setViewable(true);
  //       if (cell?.play) {
  //         cell?.play();
  //       }
  //     } else {
  //       if (cell?.stop) {
  //         cell?.stop();
  //       }
  //     }
  //   });
  //  });

  const feedItemHeight =
    Dimensions.get("window").height - useMaterialNavBarHeight(profile);
  const getItemLayout = (data, index) => ({
    length: feedItemHeight,
    offset: feedItemHeight * index,
    index,
  });
  const renderItem = useCallback(
    ({ item }) => {
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
              source={{ uri: item.media[1] }}
              style={{
                resizeMode: "cover",
                height: feedItemHeight,
                width: "100%",
              }}
            />
          </View>
        );
      }
    }
    // [viewablePostId]
  );

  return (

    
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        // data={posts}
        windowSize={Platform.OS === "android" ? 1 : 5}
        initialNumToRender={Platform.OS === "android" ? 1 : 5}
        maxToRenderPerBatch={Platform.OS === "android" ? 1 : 5}
        removeClippedSubviews
        // initialScrollIndex={selectedVideoIndex}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 60,
        }}
        renderItem={renderItem}
        pagingEnabled
        getItemLayout={getItemLayout}
        keyExtractor={(item) => item.id}
        snapToInterval={
          Dimensions.get("window").height - useMaterialNavBarHeight(profile)
        }
        decelerationRate={"fast"}
        // onViewableItemsChanged={onViewableItemsChanged.current}
      />
      {/* {isLoading && (
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
      )} */}
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
