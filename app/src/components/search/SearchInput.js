import React, { useEffect, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useIsFocused } from '@react-navigation/native';
import colors from "../../../config/colors";
import { queryUsers } from "../../services/user";
import { Feather } from "@expo/vector-icons";

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
  const isFocused = useIsFocused();
  const [isSearching, setIsSearching] = useState(false);
  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(textInput, 500);

  useEffect(() => {
    if (!isFocused) {
        setTextInput('');
    }
    }, [isFocused]);


  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        queryUsers(debouncedSearchTerm).then((resp) => {
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
        onChangeText={(val) => setTextInput(val.toLowerCase())}
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={colors.green}
        underlineColorAndroid="transparent"
      />
      {textInput !== "" && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setTextInput("")}
        >
          <Feather name="x" size={22} color={colors.green} />
        </TouchableOpacity>
      )}
      {isSearching && (
        <ActivityIndicator
          size="large"
          color={colors.green}
          style={styles.loading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    flexDirection: "row",
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
  closeButton: {
    top: 28,
    right: 20,
    position: "absolute",
  },
  loading: {
    position: "absolute",
    top: 250,
    bottom: 0,
    right: 0,
    left: 0,
  },
});

export default SearchInput;
