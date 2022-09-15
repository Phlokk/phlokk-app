import React, { useEffect, useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
// import axios from "../../redux/apis/axiosDeclaration";
// import * as SecureStore from "expo-secure-store";
// import { useDebounce } from "use-debounce";
import colors from "../../../config/colors";
import { queryUsers } from "../../services/user";

function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

const SearchInput = ({ placeholder, setSearchUsers }) => {
  const [textInput, setTextInput] = useState("");

  const [isSearching, setIsSearching] = useState(false);
  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(textInput, 500);

  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        queryUsers(debouncedSearchTerm).then((resp) => {
          console.log(resp.data);
          setIsSearching(false);
          const data = resp.data;
          setSearchUsers(data);
        });
      } else {
        setSearchUsers([]);
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

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
    backgroundColor: colors.primary,
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
  },
});

export default SearchInput;
