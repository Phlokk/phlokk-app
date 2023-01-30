import { View, FlatList, StyleSheet } from "react-native";
import React, { useState } from "react";
import SearchMusicInput from "../../../components/search/SearchMusicInput";

const SearchAudio = () => {
  const [textInput, setTextInput] = useState("");
  const [searchAudio, setSearchAudio] = useState([]);

  return (
    <View style={styles.container}>
      <SearchMusicInput placeholder="Search sounds" setSearchUsers={setSearchAudio} />
      <FlatList
        data={searchAudio}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default SearchAudio;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
});
