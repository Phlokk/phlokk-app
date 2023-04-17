import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  useWindowDimensions,
  Platform,
  Easing,
} from "react-native";
import TextTicker from "react-native-text-ticker";
import { Ionicons } from "@expo/vector-icons";
import VideoItem from "./VideoItem";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { types } from "../../redux/constants";
import { useUserVideoFeed, useVideoFeed } from "../../services/posts";
import LinearGradient from "react-native-linear-gradient";
import { atom, useAtom } from "jotai";
import { userAtom } from "../../services/appStateAtoms";
import colors from "../../../config/colors";

import { useDispatch } from "react-redux";
import CustomAlert from "../../components/Alerts/CustomAlert";
import { useIsFocused } from "@react-navigation/native";
import { getAllNewsTickerData } from "../../services/newsTicker";

export const newFeedItemAtom = atom("");
export const forceRefreshAtom = atom(false);

const VideoFeed = ({ navigation, route }) => { 
  const { profile, selectedIndex, creator, preloadedPosts, notificationView } = route.params;
  const [currentUser] = useAtom(userAtom);
  const [forceRefresh, setForceRefresh] = useAtom(forceRefreshAtom);

  const [pageSize, setPageSize] = useState(); // Used for making a the flatlist full screen
  const [postFeed, setPostFeed] = useState([]);
  const [areTabsShowing, setAreTabsShowing] = useState();

  // New Ticker State
  const [tickerText, setTickerText] = useState("")
  const [ckt, setCkt] = useState(false);

  const windowSize = useWindowDimensions();
  const isFocused = useIsFocused();

  const flatListRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const newsTickerFeed = async () => {
      
      const ticker = await getAllNewsTickerData();

      if (ticker?.news_ticker?.length === 0) {
        setTickerText(null);
              return;
      }
      let newTickerText = "Breaking news:  ";
      ticker?.forEach((item) => {
        newTickerText += ` ${item?.ticker_description} ${item?.ticker_message} - `

      })
      newTickerText = newTickerText?.substring(0, newTickerText?.length -3)
      setTickerText(newTickerText)
    };
    

    if (isFocused) {
      newsTickerFeed();
    }
  }, [isFocused]);


  const user = creator || currentUser;

  const [currentVideoIndex, setCurrentVideoIndex] = useState(
    selectedIndex || 0
  );
  const {
    posts,
    getMoreVideos,
    loading: loadingMainFeed,
    refresh: refreshMainFeed,
  } = useVideoFeed({
    skip: preloadedPosts || profile,
  });
  const {
    posts: userPosts,
    getMoreUserPosts,
    loading: loadingUserFeed,
  } = useUserVideoFeed(user?._id, {
    skip: preloadedPosts || !profile,
  });


  useEffect(() => {
    if (!posts && !userPosts) {
      return;
    }
    const postsToUse = profile ? userPosts : posts;
    setPostFeed(postsToUse);
  }, [posts, userPosts]);

  const [newFeedItem, setNewFeedItem] = useAtom(newFeedItemAtom);

  useEffect(() => {
    if (!newFeedItem) {
      return;
    }

    setPostFeed((prev) => [newFeedItem, ...prev]);
    setNewFeedItem("");
    flatListRef.current.scrollToIndex({ index: 0, animated: false });
  }, [newFeedItem]);

  useEffect(() => {
    if (currentVideoIndex >= posts?.length - 5) {
      if (loadingMainFeed || loadingUserFeed) {
        return;
      }
      
      if(!notificationView){
        if (profile) {
          getMoreUserPosts();
        } else {
          getMoreVideos();
        }
      }
    }
  }, [currentVideoIndex]);

  useEffect(() => {
    setAreTabsShowing(pageSize?.height < windowSize?.height);
  }, [pageSize, windowSize]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    if (!forceRefresh) {
      return;
    }

    if (!profile) {
      setForceRefresh(false);
      refreshMainFeed();
    }
  }, [isFocused, forceRefresh]);

  const handleLikeCount = (likes) => {
    if (typeof likes === "number") {
      return likes;
    } else {
      return likes.length;
    }
  };

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <VideoItem
          item={item}
          index={index}
          currentVideoIndex={currentVideoIndex}
          currentUser={currentUser}
          itemHeight={pageSize?.height || 0}
          areTabsShowing={areTabsShowing}
          
          
        />
      );
    },
    [currentVideoIndex, pageSize, areTabsShowing]
  );



  return (
    <View
      style={styles.mainContainer}
      onLayout={(e) =>
        setPageSize({
          height: e.nativeEvent.layout.height,
          width: e.nativeEvent.layout.width,
        })
      }
    >
      {/* only render the flatlist once we know the page size, it helps prevent sizing issues */}
      {pageSize && (
        <FlatList
          ref={(ref) => (flatListRef.current = ref)}
          initialScrollIndex={selectedIndex}
          showsVerticalScrollIndicator={false}
          data={preloadedPosts || postFeed}
          renderItem={renderItem}
          horizontal={false}
          windowSize={Platform.OS === "android" ? 1 : 3}
          initialNumToRender={5}
          maxToRenderPerBatch={2}
          removeClippedSubviews
          keyExtractor={(item) => item._id}
          pagingEnabled={true}
          onMomentumScrollEnd={(ev) => {
            const index = Math.round(
              ev.nativeEvent.contentOffset.y / pageSize.height
            );
            setCurrentVideoIndex(index);
          }}
          getItemLayout={(data, index) => ({
            length: pageSize?.height || 1,
            offset: (pageSize?.height || 1) * index,
            index,
          })}
        />
      )}

      <View pointerEvents="none" style={styles.bottomGradientWrapper}>
        <LinearGradient
          colors={["rgba(0,0,0,.2)", "rgba(0,0,0,0.0)"]}
          style={{ height: 200, width: "100%" }}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          if (!navigation?.canGoBack()) {
            flatListRef?.current?.scrollToOffset({ offset: 0, animated: true });
            refreshMainFeed();
          } else {
            navigation?.goBack();
          }
        }}
        style={{
          position: "absolute",
          top: Platform.OS === "android" ? 28 : 52,
          left: 18,
        }}
      >
        {!navigation?.canGoBack() ? (
          <Ionicons
            style={styles.refreshIcon}
            name="refresh"
            size={24}
            color={colors.white}
          />
        ) : (
          <Ionicons
            style={styles.refreshIcon}
            name="chevron-back-sharp"
            size={24}
            color={colors.white}
          />
        )}
      </TouchableOpacity>
      {currentUser.disable_ticker === 0 && (
      <TouchableOpacity
        style={{
          position: "absolute",
          top: Platform.OS === "android" ? 32 : 56,
          right: 50,
        }}
      >
        <TextTicker
          style={styles.ticker}
          scrollSpeed={20}
          loop={true}
          repeatSpacer={3000}
          easing={Easing.in(Easing.linear)}
        >
          {tickerText}
        </TextTicker>
      </TouchableOpacity>
      )}
      
      

      <TouchableOpacity
        style={{
          position: "absolute",
          top: Platform.OS === "android" ? 28 : 52,
          right: 18,
        }}
        onPress={() => setCkt(true)}
      >
        <Octicons name="globe" size={25} color={colors.white} />
      </TouchableOpacity>

      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>CKT Feed{"\n"}coming soon!</Text>}
        positiveBtn="Ok"
        modalVisible={ckt}
        dismissAlert={setCkt}
        animationType="fade"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  bottomGradientWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 90,
  },
  textFeed: {
    backgroundColor: colors.red,
  },
  ticker: {
    width: 310,
    color: colors.secondary,
    fontWeight: "bold",
  },
});

export default VideoFeed;
