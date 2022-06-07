import { View, FlatList, StyleSheet } from "react-native";
import React, { useState } from "react";
import SearchInput from "../../../components/search/searchInput";


const SearchAudio = () => {
  const [textInput, setTextInput] = useState("");
  const [searchAudio, setSearchAudio] = useState([]);
  return (
    <View style={styles.container}>
      <SearchInput placeholder="Search" />
      <FlatList
        data={searchAudio}
        // renderItem={({ item }) => <SearchUserItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default SearchAudio;

const styles = StyleSheet.create({
  container: {
    height: '20%',  
  },
});
