import React, {useState, useRef, useCallback} from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform, Dimensions
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons'; 
import routes from "../../navigation/routes";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../config/colors";
import SearchInput from "../../components/search/SearchInput";
import { useTheme } from "../../theme/context";
import SearchUsers from "./SearchUsers";
import SearchVideos from "./SearchVideos";
import { atom, useAtom } from "jotai";
import { userAtom } from "../../services/appStateAtoms";
import VideoItem from "../../screens/videoFeed/VideoItem";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";

const SearchScreen = () => {
  const { theme, setTheme } = useTheme();
  const navigation = useNavigation();
  const [textInput, setTextInput] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const [searchVideos, setSearchVideos] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [playVideo, setPlayVideo] = useState(null);
  const flatListRef = useRef();
  const [currentUser] = useAtom(userAtom);


  const image = require("../../../assets/pattern4.png");

  const Categories = [
    { id: 1, name: "Comedy", navigateTo: routes.COMEDY_SCREEN },
    { id: 2, name: "Music", navigateTo: routes.MUSICIAN_SCREEN },
    { id: 3, name: "Dancers", navigateTo: routes.DANCERS_SCREEN },
    { id: 4, name: "Lip-sync", navigateTo: routes.LIP_SYNC_SCREEN },
    { id: 5, name: "Foodies", navigateTo: routes.FOODIES_SCREEN },
    { id: 6, name: "Cosplay", navigateTo: routes.COSPLAY_SCREEN },
    { id: 7, name: "Fashion", navigateTo: routes.FASHION_SCREEN },
    { id: 8, name: "Design", navigateTo: routes.DESIGN_SCREEN },
    { id: 9, name: "Fitness", navigateTo: routes.FITNESS_SCREEN },
    { id: 10, name: "Invention", navigateTo: routes.INVENTION_SCREEN },
  ];

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
  const getSearchFor = () => {
    if (currentTab === 0) return "Globe";
    else if (currentTab === 1) return "Users";
    else if (currentTab === 2) return "Videos";
    else if (currentTab === 3) return "Music";
  };

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <VideoItem
          item={item}
          index={0}
          currentVideoIndex={0}
          currentUser={currentUser}
          itemHeight={Dimensions.get('window').height}
          areTabsShowing={false}
          
        />
      );
    },
    [pageSize]
  );

  const tabItems = [
    <Octicons
      name="globe"
      size={14}
      color={currentTab === 0 ? colors.green : colors.secondary}
    />,
    <Feather
      name="user"
      size={14}
      color={currentTab === 1 ? colors.green : colors.secondary}
    />,
    <Feather
      name="video"
      size={14}
      color={currentTab === 2 ? colors.green : colors.secondary}
    />,
    <Entypo
      name="beamed-note"
      size={14}
      color={currentTab === 3 ? colors.green : colors.secondary}
    />,
    "LIVE",
    <Feather
      name="hash"
      size={14}
      color={currentTab === 5 ? colors.green : colors.secondary}
    />,
  ];

  const getStateSetter = () => {
    if (currentTab === 1) return setSearchUsers;
    else if (currentTab === 2) return setSearchVideos;
    else return () => {};
  };

  return (
    <View style={theme == "light" ? styles.container_light : styles.container_dark} onLayout={(e) =>
      setPageSize({
        height: e.nativeEvent.layout.height,
        width: e.nativeEvent.layout.width,
      })
    }>
      <View style={styles.searchBarView}>
        <View style={styles.innerSearchView}>
        <SearchInput
          placeholder="Search"
          searchFor={getSearchFor()}
          setResult={getStateSetter()}
        />
        </View>
      </View>

      <View style={styles.hashRow}>
        {tabItems.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => setCurrentTab(index)}>
            <Text style={styles.catText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {currentTab === 1 && <SearchUsers result={searchUsers} />}
      {currentTab === 2 && <SearchVideos result={searchVideos} setPlayVideo={setPlayVideo} />}

      {currentTab === 0 && (
        <View style={styles.risingStarView}>
          <Text style={theme == "light" ? styles.text_light : styles.text_dark}>
            <Entypo name="star" size={12} color={colors.secondary} />
            Rising stars
          </Text>

          <FlatList
            data={Categories}
            renderItem={({ item }) => (
              <ItemRender name={item.name} navigateTo={item.navigateTo} />
            )}
            keyExtractor={(item) => item.id}
            initialNumToRender={5}
            ItemSeparatorComponent={Separator}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal={true}
          />
        </View>
      )}
      {playVideo &&
    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999999999}}>
        <TouchableOpacity
        style={styles.button}
        onPress={() => setPlayVideo(null)}
      >
        <MaterialIcons name="keyboard-arrow-left" size={45} color="black" />
      </TouchableOpacity>
        <VideoItem
          item={playVideo}
          index={0}
          currentVideoIndex={0}
          currentUser={currentUser}
          itemHeight={Dimensions.get('window').height}
          areTabsShowing={false}
          
        />
        
    </View>
      }
      </View>
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
  innerSearchView: {
    top: -8,

  },
  activeTab: {
    borderBottomColor: colors.green,
    borderBottomWidth: 1,
  },
  button: {
    position: 'absolute',
    top: 44,
    left: -5,
    zIndex: 99999999999
  }
});

export default SearchScreen;
