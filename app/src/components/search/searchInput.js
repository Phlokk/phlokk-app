import React, { useEffect, useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
// import axios from "../../redux/apis/axiosDeclaration";
// import * as SecureStore from "expo-secure-store";
import colors from "../../../config/colors";
const SearchInput = ({placeholder}) => {
  const [textInput, setTextInput] = useState("");

  // useEffect(() => {
  //   queryUsersByUsername(textInput).then(setSearchUsers);
  // }, [textInput]);

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        value={textInput}
        autoCorrect={false}
        onChangeText={setTextInput}
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={colors.green}
        underlineColorAndroid="transparent"
        clearButtonMode="always"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: 20,
    padding: 10,
  },
  textInput: {
    color: colors.green,
    backgroundColor: colors.lightBlack,
    borderRadius: 5,
    flexDirection: "row",
    width: "100%",
    padding: 10,
    marginVertical: 10,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},
  },
});

export default SearchInput;
