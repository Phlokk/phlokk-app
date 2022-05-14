import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import ProfilePostListItem from "./item";

import colors from "../../../../../config/colors";

export default function ProfilePostList({ posts }) {

  
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        windowSize={4}
        numColumns={3}
        initialNumToRender={0}
        maxToRenderPerBatch={6}
        removeClippedSubviews
        snapToAlignment="start"
        nestedScrollEnabled={false}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProfilePostListItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.primary,
    bottom: 30,
  },
  text: {
    alignItems: "center",
    backgroundColor: colors.primary,
    bottom: 1,
    color: "white",
  },
});
