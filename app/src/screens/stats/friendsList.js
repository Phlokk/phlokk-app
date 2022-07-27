import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import colors from "../../../config/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import StatsNavBar from "../../components/general/profileNavBar/statsNavBar";
import SearchFollowing from "./searchFollowing";
import SearchInput from "../../components/search/searchInput";

const smallLogo = require("../../../assets/verified.png");
const Friends = [
  {
    id: 1,
    name: "batshitcrazy",
    image: require("../../../assets/batshitcrazy.png"),
    creator: "Public Figure",
  },
  {
    id: 2,
    name: "batslion",
    image: require("../../../assets/batslion.png"),
    creator: "Public Figure",
  },
  {
    id: 3,
    name: "cookie",
    image: require("../../../assets/cookie.ga.gal.png"),
    creator: "Public Figure",
  },
  {
    id: 4,
    name: "savagemommaof3boys",
    image: require("../../../assets/bedazzled_by_donna.png"),
    creator: "Public Figure",
  },
];

export default function FriendsListScreen({ placeholder }) {
  const navigation = useNavigation();

  const ItemRender = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.followingRow}>
        <Image style={styles.image} source={item.image} />
      </View>
      <View style={styles.followingInfoRow}>
        <TouchableWithoutFeedback>
          <Text style={styles.itemInfo}>
            {" "}
            {item.name}
            <View style={styles.logoRow}>
              <Image
                style={styles.logo}
                source={smallLogo}
                cache="only-if-cached"
              />
            </View>
          </Text>
          <Text style={styles.itemCreator}> {item.creator}</Text>
        </TouchableWithoutFeedback>

        <TouchableOpacity style={styles.followingView}>
          <Text style={styles.followBtn}>Friends</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  ItemSeparator = () => {
    return <View style={styles.seperator}></View>;
  };

  const keyExtractor = useCallback((item) => item.id);

  return (
    <SafeAreaView style={styles.container}>
      <StatsNavBar title="Friends" />
      <SearchFollowing placeholder={placeholder} />
      <FlatList
        style={styles.paddingFlat}
        data={Friends}
        renderItem={ItemRender}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  followingText: {
    color: colors.green,
    // padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    color: colors.secondary,
    paddingHorizontal: 15,
    alignItems: "center",
    marginTop: 5,
  },
  itemInfo: {
    color: colors.green,
    fontWeight: "bold",
    top: 8,
    fontSize: 11,
    paddingLeft: 5,
  },
  itemCreator: {
    color: colors.green,
    fontWeight: "bold",
    top: 10,
    fontSize: 8,
    paddingLeft: 5,
  },
  followBtn: {
    color: colors.green,
    textAlign: 'center',
    padding: 2,
    width: "25%",
    height: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.green,
    backgroundColor: colors.lightBlack,
  },
  followingView: {
    flexDirection: "row-reverse",
    bottom: 14,
    // padding: 10,
  },
  image: {
    height: 65,
    width: 65,
  },
  followingRow: {
    justifyContent: "center",
  },
  followingInfoRow: {
    flex: 1,
  },
  logo: {
    left: 2,
    height: 12,
    width: 12,
  },
  logoRow: {
    bottom: 12,
    paddingLeft: 5,
  },
  seperator: {
    height: 1,
    width: "90%",
    opacity: 0.1,
    backgroundColor: colors.secondary,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});
