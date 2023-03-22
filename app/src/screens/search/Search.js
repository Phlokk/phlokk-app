import React, { useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import SearchUserItem from "../../components/search/userItem/SearchUserItem";
import routes from "../../navigation/routes";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../config/colors";
import SearchInput from "../../components/search/SearchInput";
import { useTheme } from "../../theme/context";

const VideoSearch = () => {
  const { theme, setTheme } = useTheme();
  const navigation = useNavigation();
  const [textInput, setTextInput] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

  const image = require("../../../assets/pattern4.png");

  const ItemRender = ({ name, navigateTo }) => (
    <TouchableOpacity
      style={theme == "light" ? styles.item_light : styles.item_dark}
      onPress={() => {
        navigation.navigate(navigateTo);
      }}
    >
      <Text
        style={theme == "light" ? styles.itemText_light : styles.itemText_dark}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );

  const Separator = () => {
    return (
      <View
        style={{
          height: 50,
          width: 1,
          padding: 5,
        }}
      />
    );
  };

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={theme == "light" ? styles.container_light : styles.container_dark}
    >
      <View style={styles.searchBarView}>
        <SearchInput placeholder="Search" setSearchUsers={setSearchUsers} />
      </View>

      <View style={styles.hashRow}>
        <TouchableOpacity>
          <Text style={styles.catText}>
            <Octicons name="globe" size={14} color={colors.secondary} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.catText}>
            <Feather name="user" size={14} color={colors.secondary} />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <TouchableOpacity style={styles.catText}>
            <Feather
              
              name="video"
              size={14}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.catText}>
            <Entypo name="beamed-note" size={14} color={colors.secondary} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.catText}>LIVE</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.catText}>
            <Feather name="hash" size={14} color={colors.secondary} />
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={searchUsers}
        renderItem={({ item }) => <SearchUserItem item={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container_light: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: colors.white,
    padding: 5,
  },
  container_dark: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: colors.black,
    padding: 5,
  },
  textInput: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    flexDirection: "row",
    width: "100%",
    padding: 10,
    marginVertical: 10,
  },
  text_light: {
    color: colors.gray,
    fontSize: 12,
    marginBottom: 10,
    marginHorizontal: 3,
  },
  text_dark: {
    color: colors.gray,
    fontSize: 12,
    marginBottom: 10,
    marginHorizontal: 3,
  },
  risingStarView: {
    padding: 10,
  },
  risingStarRow: {
    flexDirection: "row",
  },
  star: {
    alignItems: "center",
    alignSelf: "center",
    paddingBottom: 3,
  },
  item_light: {
    padding: 3,
    backgroundColor: "rgba(125, 125, 125, 0.2)",
    width: 65,
    height: 30,
    borderRadius: 7,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item_dark: {
    padding: 3,
    backgroundColor: "rgba(125, 125, 125, 0.2)",
    width: 65,
    height: 30,
    borderRadius: 7,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText_light: {
    fontSize: 9,
    color: colors.secondary,
    textAlign: "center",
    fontWeight: "bold",
  },
  itemText_dark: {
    fontSize: 9,
    color: colors.secondary,
    textAlign: "center",
    fontWeight: "bold",
  },
  catText: {
    fontSize: 10,
    color: colors.secondary,
    fontWeight: "bold",
  },

  hashRow: {
    height: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  searchBarView: {
    marginTop: 10,
    alignItems: "center",
  },
});

export default VideoSearch;
