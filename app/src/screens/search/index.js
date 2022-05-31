import React, { useEffect, useState } from "react";
import { TextInput, FlatList, View, StyleSheet, Text } from "react-native";
import SearchUserItem from "../../components/search/userItem";
// import { queryUsersByUsername } from "../../services/user";
// import axios from "../../redux/apis/axiosDeclaration";
// import * as SecureStore from "expo-secure-store";
// import { types } from "../../redux/constants";
import colors from "../../../config/colors";
import SearchRowScreen from "./searchRow";
import SearchInput from "../../components/search/searchInput";
const SearchScreen = () => {
  const [textInput, setTextInput] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  

  // useEffect(() => {
  //   queryUsersByUsername(textInput).then(setSearchUsers);
  // }, [textInput]);

  return (
    <View style={styles.container}>
      
      <SearchRowScreen />
      <SearchInput placeholder="Search" />
      <FlatList
        data={searchUsers}
        renderItem={({ item }) => <SearchUserItem item={item} />}
        keyExtractor={(item) => item.id}
      />     
      <View >
        <Text style={styles.textColor}>rising star horizontal nav</Text>
        </View> 
    </View>      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: 50,
    padding: 10,
  },
  textInput: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    flexDirection: "row",
    width: "100%",
    padding: 10,
    marginVertical: 10,
  },
  textColor: {
    color: colors.green
  }
});

export default SearchScreen;
