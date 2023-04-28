import React, { useCallback, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, FlatList } from "react-native";

import colors from "../../../config/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import StatsNavBar from "../../components/general/profileNavBar/StatsNavBar";
import FriendListItem from "./FriendListItem";
import { getFriends } from "../../services/user";


export default function FriendListScreen({ route }) {
  const { user, isCurrentUser } = route.params;

  const [friendsList, setFriendsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(1);
  const isFocused = useIsFocused();

  const getFriendsList = async () => {
    if (hasNextPage) {
      const friends = await getFriends(pageNumber, user);
      friends.hasOwnProperty("next_page_number")
        ? setHasNextPage(1)
        : setHasNextPage(0);

      let newList = [...friendsList, ...friends.data];
      setFriendsList(newList);
      setPageNumber(pageNumber + 1);
    }
  };

  useEffect(async () => {
    setIsLoading(true);
    await getFriendsList();
    setIsLoading(false);
  }, []);

  const renderItem = useCallback(({ item, index }) => {
    return <FriendListItem item={item} index={index} setFriendsList={setFriendsList} />;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatsNavBar title="Friends" />
      {/* <SearchFollowing placeholder={placeholder} /> */}

      <FlatList
        data={friendsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        initialNumToRender={20}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
