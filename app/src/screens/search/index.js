import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import SearchUserItem from "../../components/search/userItem";
// import { queryUsersByUsername } from "../../services/user";
// import axios from "../../redux/apis/axiosDeclaration";
import routes from '../../navigation/routes'
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import colors from "../../../config/colors";
import SearchInput from "../../components/search/searchInput";
import { SafeAreaView } from "react-native-safe-area-context";
const SearchScreen = () => {
  const navigation = useNavigation();
  const [textInput, setTextInput] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

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
      style={styles.item}
      onPress={() => {
        navigation.navigate(navigateTo);
      }}
    >
      <Text style={styles.itemText}>{name}</Text>
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
  // useEffect(() => {
  //   queryUsersByUsername(textInput).then(setSearchUsers);
  // }, [textInput]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarRow}>
      <TouchableOpacity onPress={() => navigation.navigate(routes.LIVESTREAM_URL)}style={styles.avatar}>
      <MaterialIcons style={styles.tvIcon} name="live-tv" size={24} color={colors.white} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.avatar}>
      <AntDesign style={styles.tvIcon} name="cloud" size={24} color={colors.white} />
      </TouchableOpacity>
      </View>
      
      <SearchInput placeholder="Search" />
      <FlatList
        data={searchUsers}
        renderItem={({ item }) => <SearchUserItem item={item} />}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.risingStarView}>
        <View style={styles.risingStarRow}>
          <Text style={styles.text}>Rising stars</Text>
          <MaterialCommunityIcons
            style={styles.star}
            color={colors.gray}
            size={20}
            name={"star"}
          />
        </View>
        <FlatList
          data={Categories}
          renderItem={({ item }) => (
            <ItemRender name={item.name} navigateTo={item.navigateTo} />
          )}
          keyExtractor={(item) => item.id}
          initialNumToRender={5}
          ItemSeparatorComponent={Separator}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: colors.primary,
    padding: 5,
  },
  avatarRow: {
    flexDirection: "row",
    marginLeft: 10,
  },
  textInput: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    flexDirection: "row",
    width: "100%",
    padding: 10,
    marginVertical: 10,
  },
  text: {
    color: colors.gray,
    fontSize: 12,
    marginBottom: 5,
    marginHorizontal: 3,
  },
  iconURL: {
    color: colors.green,
    fontSize: 12,
    alignSelf: "center",
    alignItems: "center",
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
  item: {
    padding: 5,
    backgroundColor: colors.lightBlack,
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth: 0.75,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 8,
    color: colors.green,
    textAlign: "center",
  },
  avatar: {
    backgroundColor: colors.black,
    marginRight: 10,
    height: 60,
    width: 60,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.green,
  },
  tvIcon: {
    position: "absolute",
    top: 15,
    bottom: 0,
    right: 0,
    left: 16,

  }
});

export default SearchScreen;
