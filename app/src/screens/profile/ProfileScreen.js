import ProfileHeader from "../../components/header/ProfileHeader";
import ProfileNavBar from "../../components/general/profileNavBar/ProfileNavBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, View, StyleSheet, Text, RefreshControl } from "react-native";
import ProfilePostListItem from "../../components/profile/postList/item/ProfilePostListItem";
import colors from "../../../config/colors";
import { useAtom } from "jotai";
import { userAtom} from "../../services/appStateAtoms";
import { useUserVideoFeed } from "../../services/posts";
import React, { useCallback, useEffect, useState } from "react";
import { fetchGetUserData } from "../../redux/sagas/requests/fetchUser";
import ProfileLoading from "../../components/profile/postList/ProfileLoading";
import { useIsFocused } from "@react-navigation/native";
import { useTheme } from "../../theme/context";

export default function ProfileScreen({ route }) {
  const { theme } = useTheme();
  const [postsToDisplay, setPostsToDisplay] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [popUpImage, setPopUpImage] = useState(false);
  const isFocused = useIsFocused();
  const [selectedTab, setSelectedTab] = useState("cloud");

  const [loggedInUser] = useAtom(userAtom);
  const [profile, setProfile] = useState();
  const [isUserBlocked, setIsUserBlocked] = useState(route?.params?.initialUser.blocked);

  const fetchUser = async (userId) => {
    try {
      const response = await fetchGetUserData(userId);
      setProfile(response);
    } catch {}
  };
  const userProfile = route?.params?.initialUser;


  useEffect(() => {
    if (!route) {
      return;
    }

    if (!loggedInUser) {
      return;
    }

    if (!userProfile) {
      setProfile(Array.isArray(loggedInUser)? loggedInUser[0]:loggedInUser);
      
    } else {
      setProfile(userProfile);
      fetchUser(userProfile.id);
    }
  }, [route, loggedInUser]);

  const { posts, getMoreUserPosts, refresh, loading } = useUserVideoFeed(
    userProfile?.id
  );
  useEffect(async() => {
    await refresh();
    setIsUserBlocked(route?.params?.initialUser.blocked);
  }, [isFocused])
  

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
      <View
        style={
          theme == "light" ? styles.container_light : styles.container_dark
        }
        edges={["top"]}
      >
        <ProfileHeader
          user={profile}
          setPopUpImage={setPopUpImage}
          onTabSelected={(tab) => setSelectedTab(tab)}
          isCurrentUser={loggedInUser?._id === profile?._id}
          isUserBlocked = {isUserBlocked}
          setIsUserBlocked={setIsUserBlocked}
        />
      </View>
    );
  }, [profile]);

  // This is temporary, so the message we're showing "{} videos coming soon" will use better terminology
  // This function will be unnecessary when actually loading those posts
  const convertTabNameToDisplayName = (tabName) => {
    if (tabName === "star") {
      return (
        <Text
          style={theme == "light" ? styles.vidText_light : styles.vidText_dark}
        >
          Favorite
        </Text>
      );
    } else if (tabName === "bookmark") {
      return (
        <Text
          style={theme == "light" ? styles.vidText_light : styles.vidText_dark}
        >
          Saved
        </Text>
      );
    } else if (tabName === "private") {
      return (
        <Text
          style={theme == "light" ? styles.vidText_light : styles.vidText_dark}
        >
          Private
        </Text>
      );
    } else if (tabName === "fire") {
      return (
        <Text
          style={theme == "light" ? styles.vidText_light : styles.vidText_dark}
        >
          Gifted
        </Text>
      );
    }
  };

  if (!profile) {
    return (
      <SafeAreaView
        style={
          theme == "light" ? styles.container_light : styles.container_dark
        }
        edges={["top"]}
      />
    );
  }

  if (loading && postsToDisplay.length === 0) {
    return <ProfileLoading />;
  } else {
    return (
      <SafeAreaView
        style={
          theme == "light" ? styles.container_light : styles.container_dark
        }
        edges={["top"]}
      >
      
        <ProfileNavBar
          userProfile={profile}
          isCurrentUser={!route?.params?.initialUser}
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
            !isUserBlocked &&  
            <ProfilePostListItem
            item={item}
            index={index}
            posts={postsToDisplay}
            setPosts={setPostsToDisplay}
          /> 
          )}
          refreshControl={ !isUserBlocked &&
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
            <Text
              style={
                theme == "light"
                  ? styles.comingSoon_light
                  : styles.comingSoon_dark
              }
            >
              {convertTabNameToDisplayName(selectedTab)} videos coming soon.
            </Text>
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container_light: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container_dark: {
    flex: 1,
    backgroundColor: colors.black,
  },
  text: {
    color: colors.green,
  },
  textPad: {
    padding: 10,
  },
  vidText_light: {
    color: colors.black,
  },
  vidText_dark: {
    color: colors.white,
  },
  comingSoon_light: {
    color: colors.black,
    marginTop: 20,
    marginBottom: 190,
  },
  comingSoon_dark: {
    color: colors.white,
    marginTop: 20,
    marginBottom: 190,
  },
});
