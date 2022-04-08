import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import ProfileHeader from "../../components/profile/header";
import ProfileNavBar from "../../components/profile/navBar";
import ProfilePostList from "../../components/profile/postList";
import { SafeAreaView } from "react-native-safe-area-context";
import { CurrentUserProfileItemInViewContext } from "../../../src/navigation/feed";
import { useUserRealtime } from "../../hooks/useUser";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
import { useUserPosts } from "../../services/posts";
import { FlatList, View, StyleSheet, ActivityIndicator } from "react-native";
import ProfilePostListItem from "../../components/profile/postList/item";
import firebase from "firebase";

import colors from "../../../config/colors";

export default function ProfileScreen({ route, posts }) {
  const { initialUserId } = route.params;
  const [user, setUser] = useState(null);
  console.log("user", user);
  const userPosts = useUserPosts(user?.uid, { enabled: Boolean(user?.uid) });
  console.log("userPosts.isLoading", userPosts.isLoading);
  const userPostsData = useMemo(() => userPosts.data, [userPosts.data]);
  useRefreshOnFocus(userPosts.refetch);
  const realtimeRef = useRef();
  let providerUserId = null;
  if (CurrentUserProfileItemInViewContext != null) {
    providerUserId = useContext(CurrentUserProfileItemInViewContext);
  }
  const userId = initialUserId ? initialUserId : providerUserId;

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = useUserRealtime(userId, (data) => {
      setUser(data);
    });
    if (realtimeRef.current) {
      realtimeRef.current();
    }
    realtimeRef.current = unsubscribe;
    return () => {
      unsubscribe();
    };
  }, [userId]);
  if (!userId) return null;

  if (!user) {
    return <></>;
  }
  const ListHeader = () => {
    return (
      <View style={styles.container} edges={["top"]}>
        <ProfileHeader user={user} />
        <ProfilePostList posts={userPostsData} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ProfileNavBar user={user} />
      {userPosts.isLoading ? (
        <View
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color={colors.green} />
        </View>
      ) : (
        <FlatList
          numColumns={3}
          removeClippedSubviews
          nestedScrollEnabled={false}
          data={posts}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={ListHeader}
          renderItem={({ item }) => <ProfilePostListItem item={item} />}
        />
      )}
      {firebase.auth().currentUser.uid === user.uid ? <></> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
