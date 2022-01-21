

import React, { useEffect, useRef, useState } from "react";
import { Dimensions, View, FlatList, } from "react-native";

import PostSingle from "../../components/general/post";
import { getFeed, getPostsByUserId } from "../../services/posts";
import styles from "./styles";
import { FULLSCREEN_UPDATE_PLAYER_DID_PRESENT } from "expo-av/build/Video";

export default function FeedScreen({ route }) {
  const { setCurrentUserProfileItemInView, creator, profile } = route.params;
  const [posts, setPosts] = useState([]);
  const mediaRefs = useRef([]);


  




 
 
  useEffect(() => {
    if (profile) {
      getPostsByUserId(creator).then(setPosts);
    } else {
      getFeed().then(setPosts);
    }
  }, [profile.creator]);

  

  

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      const cell = mediaRefs.current[element.key];
      if (cell) {
        if (element.isViewable) {
          if (!profile) {
            setCurrentUserProfileItemInView(element.item.creator);
          }
          cell.play();
        } else {
          cell.stop();
        }
      }
    });
  });
  

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          height: Dimensions.get("window").height - 115,
          backgroundColor: "black",
        }}
      >
        <PostSingle
          item={item}
          ref={(PostSingleRef) => (mediaRefs.current[item.id] = PostSingleRef)}
        />
      </View>
    );
  };

  

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        windowSize={4}
        initialNumToRender={0}
        maxToRenderPerBatch={2}
        removeClippedSubviews
        viewabilityConfig={{
          itemVisiblePercentThreshold: 0,
        }}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={(item) => item.id}
        snapToInterval={Dimensions.get("window").height - 115}
        snapToAlignment="start"
        decelerationRate={"fast"}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  );
}

