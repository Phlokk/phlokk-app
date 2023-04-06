import { View, FlatList, StyleSheet } from "react-native";
import React, { useState } from "react";
import SearchMusicInput from "../../../components/search/SearchMusicInput";

const SearchAudio = ({setSearchedAudios}) => {
  const [textInput, setTextInput] = useState("");
  const [searchAudio, setSearchAudio] = useState([]);

  return (
    <View style={styles.container}>
      <SearchMusicInput placeholder="Search sounds" setSearchedAudios={setSearchedAudios} />
      <FlatList
        data={searchAudio}
        keyExtractor={(item) => item._id}
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
