import React, { useEffect, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import colors from "../../../config/colors";
import { queryUsers, queryVideos } from "../../services/user";
import { Feather } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { userAtom } from "../../services/appStateAtoms";
import { useTheme } from "../../theme/context";

// import CustomActivityIndicator from '../common/ActivityIndicator';

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

const SearchInput = ({ placeholder, setResult, searchFor }) => {
  const { theme } = useTheme();
  const [textInput, setTextInput] = useState("");
  const isFocused = useIsFocused();
  const [isSearching, setIsSearching] = useState(false);

  const [currentUser] = useAtom(userAtom);

  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(textInput, 500);

  useEffect(() => {
    if (!isFocused) {
      setTextInput("");
    }
  }, [isFocused]);

  // Effect for API call
  useEffect(
    () => {
     (async function(){
      if (debouncedSearchTerm) {
        setIsSearching(true);
        const result = await filter(debouncedSearchTerm);
        setResult(result)
      } else {
        setResult([]);
        setIsSearching(false);
      }
     }())
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
);

// if (currentTab === 0) return "Globe";
// else if (currentTab === 1) return "Users";
// else if (currentTab === 2) return "Videos";
// else if (currentTab === 3) return "Music";

  const filter = async(query) => {
    if(searchFor === 'Users') {
      const data =  await filterUsers(query);
      setIsSearching(false);
      return data.filter( (user) => user?.name !== currentUser?.name  );
    }else if (searchFor === 'Videos'){
      const data =  await filterVideos(query);
      setIsSearching(false);
      return data
    }

  }
  const filterUsers = async (query) => { 
    try {
      const response = await queryUsers(query);
      return response.data
    } catch (ex) {
      console.log(ex)
    };

  }
  const filterVideos = async (query) =>{
    try {
      const response  = await queryVideos(query);
      return response.data      
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        value={textInput}
        autoCorrect={false}
        onChangeText={(val) => setTextInput(val.toLowerCase())}
        style={
          theme == "light" ? styles.textInput_light : styles.textInput_dark
        }
        placeholder={placeholder}
        placeholderTextColor={colors.secondary}
        underlineColorAndroid="transparent"
      />
      {textInput !== "" ? (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setTextInput("")}
        >
          <Feather name="x" size={22} color={colors.secondary} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setTextInput("")}
        >
          <Feather name="search" size={22} color={colors.secondary} />
        </TouchableOpacity>
      )}

      {isSearching && (
        <ActivityIndicator
          size="large"
          color={colors.secondary}
          style={styles.loading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },
  textInput_light: {
    color: colors.secondary,
    borderColor: colors.secondary,
    borderWidth: 0.3,
    flexDirection: "row",
    width: "90%",
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  textInput_dark: {
    color: colors.green,
    borderColor: colors.secondary,
    borderWidth: 0.3,
    flexDirection: "row",
    width: "90%",
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  closeButton: {
    top: Platform.OS === "android" ? 33 : 28,
    right: 45,
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
