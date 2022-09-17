import ProfileHeader from "../../components/header/ProfileHeader";
import ProfileNavBar from "../../components/general/profileNavBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, View, StyleSheet, Text, RefreshControl } from "react-native";
import ProfilePostListItem from "../../components/profile/postList/item/ProfilePostListItem";
import colors from "../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../App";
import { useUserVideoFeed } from "../../services/posts";
import { useEffect, useState } from "react";
import { fetchGetUser } from "../../redux/sagas/requests/fetchUsers";

export default function ProfileScreen({ route }) {
  // const { posts, getMoreVideos } = useVideoFeed();
  const [postsToDisplay, setPostsToDisplay] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  //   const [userProfile, setUserProfile] = useState({});
  //   const [visibleUserId, setVisibleUserId] = useState();

  /**
   * This function fetches the user profile object based on the userId being passed.
   */
  //   const fetchUser = async (userId) => {
  //     const response = await fetchGetUser(userId);
  //     console.log(response._id);
  //     setUserProfile(response);
  //     setVisibleUserId(response._id);
  //   };

  /**
   * Input parameter should either be able to be the userId string or a user object.
   * If it's the string then it should make a request to fetch that user.
   * If it's the object, then it should user that object to display that users information
   * If no parameter is passed, it should fall back to the "user" that is logged into the app
   */
  //   const inputUserParam =
  // route?.params?.initialUser ?? route?.params?.initialUserId;

  const userProfile = route?.params?.initialUser;
  const [user, setUser] = useAtom(userAtom);

  //   useEffect(() => {
  //     if (inputUserParam instanceof Object) {
  //       setUserProfile(inputUserParam);
  //       setVisibleUserId(inputUserParam._id);
  //       console.log("set user profile to inputUserParam");
  //     } else {
  //       fetchUser(inputUserParam);
  //     }
  //   }, [inputUserParam, user]);

  /**
   * I think this should be made so that there is just a single variable referenced of 2 different ones
   * This should take effect throughout this file also. The referenced object should be "userProfile", The referenced userId should just be "visibileUserId"
   * ^^ Does not have to follow this naming convention but this is what makes sense to me as it avoids issues where one is defined and the other isn't.
   * visibileUserId will always be a user ID string.
   * userProfile will be a user profile object
   */
  const { posts, getMoreUserPosts, refresh, loading } = useUserVideoFeed(
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
      <ProfileNavBar
        userProfile={userProfile}
        showFireIcon={userProfile === undefined}
      />
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
            posts={postsToDisplay}
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
        onEndReached={() => {
          if (postsToDisplay?.length <= 10) {
            return;
          }

          if (!loading) {
            getMoreUserPosts();
          }
        }}
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
