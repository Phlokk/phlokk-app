import React, { useEffect, useState } from "react";
import { TextInput, FlatList, View, StyleSheet } from "react-native";
import SearchUserItem from "../../components/search/userItem";
import { queryUsersByUsername } from "../../services/user";
// import axios from "axios";
// import * as SecureStore from "expo-secure-store";
// import { USER_STATE_CHANGE } from "../../redux/constants";
import colors from "../../../config/colors";
import SearchRowScreen from "./searchRow";

const SearchScreen = (props) => {
  const [textInput, setTextInput] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

  // useEffect(() => {
  //   queryUsersByUsername(textInput).then(setSearchUsers);
  // }, [textInput]);

  return (
    <View style={styles.container}>
      <SearchRowScreen />
      <TextInput
        autoCapitalize="none"
        onChangeText={setTextInput}
        style={styles.textInput}
        placeholder={"Search"}
      />
      <FlatList
        data={searchUsers}
        renderItem={({ item }) => <SearchUserItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: 40,
    padding: 20,
  },
  textInput: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    flexDirection: "row",
    width: "100%",
    padding: 10,
    marginVertical: 10,
  },
});

export default SearchScreen;
