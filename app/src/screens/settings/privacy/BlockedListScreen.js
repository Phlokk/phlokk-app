import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import routes from "../../../navigation/routes";
import colors from "../../../../config/colors";
import SettingsNavBar from "../../../components/general/settings/SettingsNavBar";
import BlockedItem from "./blockedItem";

export default function BlockedListScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState("");

    const renderItem = ({ item, index }) => {
      // console.log(item);
    return <BlockedItem index={index} item={item} />;
  };

  const [blockedList, setBlockedList] = useState("");


  useEffect(async () => {
    await blockedListListener(setBlockedList);
    return () => clearBlockedListListener();
  }, []);

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
    <SafeAreaView style={styles.container}>
      <SettingsNavBar title="Blocked Accounts" />
      <View style={styles.rowContainer}></View>
      <FlatList
        // data={blockedList}
        ItemSeparatorComponent={Separator}
        // renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  fieldsContainer: {
    marginTop: 20,
    padding: 10,
    flex: 1,
  },
  rowContainer: {
    padding: 10,
  },
  fieldItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  fieldValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: colors.white,
    fontSize: 12,
    opacity: 0.8,
  },

  authText: {
    color: colors.secondary,
  },
  socialText: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 8,
    marginTop: 20,
    opacity: 0.3,
  },
});