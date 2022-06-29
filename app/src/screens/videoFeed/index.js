import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";

import useMaterialNavBarHeight from "../../hooks/useMaterialNavBarHeight";
import VideoItem from "./videoItem";
import { useFeed } from "../../services/posts";

const VideoFeed = ({ route }) => {
  const { profile } = route.params;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentVideoPlayingStat, setCurrentVideoPlayingStat] = useState({});
  const [testVideos, setTestVideos] = useState([]);

  useEffect(() => {
    setTestVideos([
      {
        id: "62a78d6fea8ff009e30b9ae5",
        mime_type: "video/mp4",
        original_item: {
          _id: "62a78d6fea8ff009e30b9ae5",
          created_at: "2022-06-13T19:18:07.532000Z",
          media: [
            {
              _id: "62a78d6fea8ff009e30b9ae6",
              collection_name: "posts",
              conversions_disk: "public",
              created_at: "2022-06-13T19:18:07.537000Z",
              custom_properties: [],
              disk: "public",
              file_name: "a8038d04-7cc4-4eac-b77b-c6457b72b3ff.mp4",
              generated_conversions: [],
              manipulations: [],
              mime_type: "video/mp4",
              model_id: "62a78d6fea8ff009e30b9ae5",
              model_type: "App\\Models\\Post",
              name: "a8038d04-7cc4-4eac-b77b-c6457b72b3ff",
              order_column: 1,
              original_url:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
              preview_url: "",
              responsive_images: [],
              size: 829144,
              updated_at: "2022-06-13T19:18:07.537000Z",
              uuid: "0f87b984-b286-474b-a2c1-82aa906acdd0",
            },
            {
              _id: "62a78d6fea8ff009e30b9ae7",
              collection_name: "posts_thumb",
              conversions_disk: "public",
              created_at: "2022-06-13T19:18:07.547000Z",
              custom_properties: [],
              disk: "public",
              file_name: "de27fb74-3104-458f-b26f-44e72a9255d8.jpg",
              generated_conversions: [],
              manipulations: [],
              mime_type: "image/jpeg",
              model_id: "62a78d6fea8ff009e30b9ae5",
              model_type: "App\\Models\\Post",
              name: "de27fb74-3104-458f-b26f-44e72a9255d8",
              order_column: 2,
              original_url:
                "https://dev-api.phlokk.com/storage/847c3252-c05d-4d60-a70f-a6bcc38ffa14/de27fb74-3104-458f-b26f-44e72a9255d8.jpg",
              preview_url: "",
              responsive_images: [],
              size: 69630,
              updated_at: "2022-06-13T19:18:07.547000Z",
              uuid: "847c3252-c05d-4d60-a70f-a6bcc38ffa14",
            },
          ],
          updated_at: "2022-06-13T19:18:07.532000Z",
          user: {
            _id: "629d1eb4b5850b6ab60a6fd2",
            acceptTerms: true,
            created_at: "2022-06-05T21:23:00.573000Z",
            creator_type: null,
            email: "dean@deancole.info",
            email_verified_at: null,
            instagram_link: null,
            is_verified: 0,
            link: null,
            name: "dcole",
            photo_url:
              "https://dev-api.phlokk.com/storage/cd1e201f-1223-46e3-b356-d47e3c8264b8/f9416531-9836-459f-aeed-7b6496fe6ca8.jpg",
            quote: null,
            relationship_name: null,
            relationship_type: null,
            status: "active",
            updated_at: "2022-06-13T19:47:41.255000Z",
            username: "dcole",
            youtube_link: null,
          },
          user_id: "629d1eb4b5850b6ab60a6fd2",
        },
        poster:
          "https://dev-api.phlokk.com/storage/fe0ae809-0297-47c1-bc46-e1b0e3953112/1af005b0-4737-4ed7-af54-54b9afa8ec93.jpg",
        uri: "https://dev-api.phlokk.com/storage/7da2344f-fdcf-4c81-a402-e02345f8f554/68b69406-0603-4f1b-8b9f-1a1211bb6bf0.mp4",
        user: {
          _id: "629d1eb4b5850b6ab60a6fd2",
          acceptTerms: true,
          created_at: "2022-06-05T21:23:00.573000Z",
          creator_type: null,
          email: "dean@deancole.info",
          email_verified_at: null,
          instagram_link: null,
          is_verified: 0,
          link: null,
          name: "dcole",
          photo_url:
            "https://dev-api.phlokk.com/storage/cd1e201f-1223-46e3-b356-d47e3c8264b8/f9416531-9836-459f-aeed-7b6496fe6ca8.jpg",
          quote: null,
          relationship_name: null,
          relationship_type: null,
          status: "active",
          updated_at: "2022-06-13T19:47:41.255000Z",
          username: "dcole",
          youtube_link: null,
        },
      },
      {
        id: "62a85abc5b8202786e00e052",
        mime_type: "video/mp4",
        original_item: {
          _id: "62a85abc5b8202786e00e052",
          created_at: "2022-06-14T09:54:04.865000Z",
          media: [
            {
              _id: "62a85abc5b8202786e00e053",
              collection_name: "posts",
              conversions_disk: "public",
              created_at: "2022-06-14T09:54:04.870000Z",
              custom_properties: [],
              disk: "public",
              file_name: "d6e20b18-6421-4228-8d9d-2cb63f8f52e8.mp4",
              generated_conversions: [],
              manipulations: [],
              mime_type: "video/mp4",
              model_id: "62a85abc5b8202786e00e052",
              model_type: "App\\Models\\Post",
              name: "d6e20b18-6421-4228-8d9d-2cb63f8f52e8",
              order_column: 1,
              original_url:
                "https://dev-api.phlokk.com/storage/dca6ea3b-81ea-403c-997d-abe25d50840e/d6e20b18-6421-4228-8d9d-2cb63f8f52e8.mp4",
              preview_url: "",
              responsive_images: [],
              size: 2847005,
              updated_at: "2022-06-14T09:54:04.870000Z",
              uuid: "dca6ea3b-81ea-403c-997d-abe25d50840e",
            },
            {
              _id: "62a85abc5b8202786e00e054",
              collection_name: "posts_thumb",
              conversions_disk: "public",
              created_at: "2022-06-14T09:54:04.887000Z",
              custom_properties: [],
              disk: "public",
              file_name: "fd462b07-c20a-41e6-90f4-78b302828461.jpg",
              generated_conversions: [],
              manipulations: [],
              mime_type: "image/jpeg",
              model_id: "62a85abc5b8202786e00e052",
              model_type: "App\\Models\\Post",
              name: "fd462b07-c20a-41e6-90f4-78b302828461",
              order_column: 2,
              original_url:
                "https://dev-api.phlokk.com/storage/5a7dac67-ce23-42ee-9c06-cdfda705fc0f/fd462b07-c20a-41e6-90f4-78b302828461.jpg",
              preview_url: "",
              responsive_images: [],
              size: 397706,
              updated_at: "2022-06-14T09:54:04.887000Z",
              uuid: "5a7dac67-ce23-42ee-9c06-cdfda705fc0f",
            },
          ],
          updated_at: "2022-06-14T09:54:04.865000Z",
          user: {
            _id: "629d1eb4b5850b6ab60a6fd2",
            acceptTerms: true,
            created_at: "2022-06-05T21:23:00.573000Z",
            creator_type: null,
            email: "dean@deancole.info",
            email_verified_at: null,
            instagram_link: null,
            is_verified: 0,
            link: null,
            name: "dcole",
            photo_url:
              "https://dev-api.phlokk.com/storage/cd1e201f-1223-46e3-b356-d47e3c8264b8/f9416531-9836-459f-aeed-7b6496fe6ca8.jpg",
            quote: null,
            relationship_name: null,
            relationship_type: null,
            status: "active",
            updated_at: "2022-06-13T19:47:41.255000Z",
            username: "dcole",
            youtube_link: null,
          },
          user_id: "629d1eb4b5850b6ab60a6fd2",
        },
        poster:
          "https://dev-api.phlokk.com/storage/5a7dac67-ce23-42ee-9c06-cdfda705fc0f/fd462b07-c20a-41e6-90f4-78b302828461.jpg",
        uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        user: {
          _id: "629d1eb4b5850b6ab60a6fd2",
          acceptTerms: true,
          created_at: "2022-06-05T21:23:00.573000Z",
          creator_type: null,
          email: "dean@deancole.info",
          email_verified_at: null,
          instagram_link: null,
          is_verified: 0,
          link: null,
          name: "dcole",
          photo_url:
            "https://dev-api.phlokk.com/storage/cd1e201f-1223-46e3-b356-d47e3c8264b8/f9416531-9836-459f-aeed-7b6496fe6ca8.jpg",
          quote: null,
          relationship_name: null,
          relationship_type: null,
          status: "active",
          updated_at: "2022-06-13T19:47:41.255000Z",
          username: "dcole",
          youtube_link: null,
        },
      },
    ]);
  }, []);

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
      {testVideos.length === 0 ? (
        <ActivityIndicator
          size={"large"}
          color={"white"}
          style={styles.activityIndicator}
        />
      ) : (
        <SwiperFlatList
          showsVerticalScrollIndicator={false}
          data={testVideos}
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
