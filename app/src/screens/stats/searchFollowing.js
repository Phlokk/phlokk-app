import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import SearchInput from "../../components/search/SearchInput";


const SearchFollowing = () => {
  const [textInput, setTextInput] = useState("");
  const [searchFollowing, setSearchFollowing] = useState([]);
  return (
    <View style={styles.container}>
      <SearchInput placeholder="Search" />
      <FlatList
        data={searchFollowing}
        // renderItem={({ item }) => <SearchUserItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default SearchFollowing;

const styles = StyleSheet.create({
  container: {
    height: '20%',  
  },
});
