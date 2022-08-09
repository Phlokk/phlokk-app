import ProfileHeader from "../../components/header/";
import ProfileNavBar from "../../components/general/profileNavBar/";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, View, StyleSheet, RefreshControl } from "react-native";
import ProfilePostListItem from "../../components/profile/postList/item";
import colors from "../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../App";
import { useUserVideoFeed } from "../../services/posts";
import { useEffect, useState } from "react";

export default function ProfileScreen({ route }) {
  // const { posts, getMoreVideos } = useVideoFeed();
  const [postsToDisplay, setPostsToDisplay] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const userProfile = route?.params?.initialUser;

  const [user, setUser] = useAtom(userAtom);

  const { posts, getMoreUserPosts, refresh } = useUserVideoFeed(
    userProfile?._id || user._id
  );

  useEffect(() => {
    if (posts?.length > 0) {
      setPostsToDisplay(posts);
    }
  }, [posts]);

  const ListHeader = () => {
    return (
      <View style={styles.container} edges={["top"]}>
        <ProfileHeader user={userProfile || user} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ProfileNavBar showFireIcon={userProfile === undefined} />
      <FlatList
        numColumns={3}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        nestedScrollEnabled={false}
        data={postsToDisplay}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        renderItem={({ item, index }) => (
          <ProfilePostListItem
            item={item}
            index={index}
            user={userProfile || user}
            setPosts={setPostsToDisplay}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            tintColor="white"
            onRefresh={async () => {
              setIsRefreshing(true);
              await refresh();
              setIsRefreshing(false);
            }}
          />
        }
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
