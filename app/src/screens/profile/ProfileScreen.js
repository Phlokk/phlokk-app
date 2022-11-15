import ProfileHeader from "../../components/header/ProfileHeader";
import ProfileNavBar from "../../components/general/profileNavBar/ProfileNavBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, View, StyleSheet, Text, RefreshControl } from "react-native";
import ProfilePostListItem from "../../components/profile/postList/item/ProfilePostListItem";
import colors from "../../../config/colors";
import { useAtom } from "jotai";
import { userAtom } from "../../../../App";
import { useUserVideoFeed } from "../../services/posts";
import React, { useCallback, useEffect, useState } from "react";
import { fetchGetUser } from "../../redux/sagas/requests/fetchUsers";
import CustomImageModal from "../../components/Image/CustomImageModal";
import ProfileSkeleton from "../../components/profile/postList/ProfileSkeleton";
import { useIsFocused } from "@react-navigation/native";

export default function ProfileScreen({ route }) {
  const [postsToDisplay, setPostsToDisplay] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [popUpImage, setPopUpImage] = useState(false);
  const isFocused = useIsFocused();
  const [selectedTab, setSelectedTab] = useState("cloud");

  const [loggedInUser] = useAtom(userAtom);
  const [profile, setProfile] = useState();

  const fetchUser = async (userId) => {
    try {
      const response = await fetchGetUser(userId);
      setProfile(response);
    } catch {}
  };

  useEffect(() => {
    if (!route) {
      return;
    }

    if (!loggedInUser) {
      return;
    }

    const userProfile = route?.params?.initialUser;
    if (!userProfile) {
      setProfile(loggedInUser);
    } else {
      setProfile(userProfile);
      fetchUser(userProfile._id);
    }
  }, [route, loggedInUser]);

  const { posts, getMoreUserPosts, refresh, loading } = useUserVideoFeed(
    profile?._id
  );

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    if (loading) {
      return;
    }

    // refresh();
  }, [isFocused]);

  useEffect(() => {
    if (posts?.length > 0) {
      setPostsToDisplay(posts);
    }
  }, [posts]);

  useEffect(() => {
    if (selectedTab === "cloud") {
      setPostsToDisplay(posts);
    } else {
      setPostsToDisplay([]);
    }
  }, [selectedTab]);

  const ListHeader = useCallback(() => {
    return (
      <View style={styles.container} edges={["top"]}>
        <ProfileHeader
          user={profile}
          setPopUpImage={setPopUpImage}
          onTabSelected={(tab) => setSelectedTab(tab)}
          isCurrentUser={loggedInUser?._id === profile?._id}
        />
      </View>
    );
  }, [profile]);

  // This is temporary, so the message we're showing "{} videos coming soon" will use better terminology
  // This function will be unnecessary when actually loading those posts
  const convertTabNameToDisplayName = (tabName) => {
    if (tabName === "star") {
      return "Favorite";
    } else if (tabName === "bookmark") {
      return "Saved";
    } else if (tabName === "private") {
      return "Private";
    }
  };

  if (!profile) {
    return <SafeAreaView style={styles.container} edges={["top"]} />;
  }

  if (loading && postsToDisplay.length === 0) {
    return <ProfileSkeleton />;
  } else {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ProfileNavBar
          userProfile={profile}
          isCurrentUser={loggedInUser?._id === profile?._id}
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
              posts={postsToDisplay}
              setPosts={setPostsToDisplay}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              tintColor={colors.secondary}
              size={"default"}
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

        {selectedTab !== "cloud" ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              position: "absolute",
              right: 0,
              bottom: 0,
              left: 0,
            }}
          >
            <Text style={{ color: "white", marginTop: 20, marginBottom: 190 }}>
              {convertTabNameToDisplayName(selectedTab)} videos coming soon.
            </Text>
          </View>
        ) : null}

        <CustomImageModal
          customAlertMessage={<Text>User Bio</Text>}
          positiveBtn="Back"
          modalVisible={popUpImage}
          dismissAlert={setPopUpImage}
          animationType="fade"
          user={profile}
          setUser={setProfile}
          isCurrentUser={loggedInUser?._id === profile?._id}
        />
      </SafeAreaView>
    );
  }
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
