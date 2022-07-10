import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import ProfileHeader from "../../components/header/";
import ProfileNavBar from "../../components/general/profileNavBar/";
import ProfilePostList from "../../components/profile/postList";
import { SafeAreaView } from "react-native-safe-area-context";
// import { CurrentUserProfileItemInViewContext } from "../../../src/navigation/feed";
// import { useUserRealtime } from "../../hooks/useUser";
// import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
// import { useUserPosts } from "../../services/posts";
import {
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import ProfilePostListItem from "../../components/profile/postList/item";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
// import { getFeed } from "../../services/posts"

import colors from "../../../config/colors";
import DisplayMenuScreen from "./displayMenu";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { fetchUserData } from "../../redux/actions/users";
import { useUserVideoFeed } from "../../services/posts";

export default function ProfileScreen({ route }) {
  // const dispatch = useDispatch();
  // const getPosts = getFeed();
  // const { posts, getMoreVideos } = useVideoFeed();

  const userId = route?.params?.initialUserId;

  const { posts, getMoreUserPosts } = useUserVideoFeed(userId);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchUserData([])); // update when the user returns to this screen.
    }, [isFocused])
  );

  const ListHeader = () => {
    return (
      <View style={styles.container} edges={["top"]}>
        <ProfileHeader />
        {/* <ProfilePostList posts={posts} /> */}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* <ProfileNavBar user={user} /> */}
      <ProfileNavBar />
      {/* // remove ProfileHeader when posts work */}
      {/* <ProfileHeader /> */}

      {/* <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      > */}
      {/* <ActivityIndicator size="small" color={colors.green} /> */}
      {/* </View> */}

      <FlatList
        numColumns={3}
        removeClippedSubviews
        nestedScrollEnabled={false}
        data={posts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        renderItem={({ item, index }) => (
          <ProfilePostListItem item={item} index={index} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.green,
  },
  textPad: {
    padding: 10,
  },
});
