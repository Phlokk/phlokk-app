import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import ViewFriends from "./ViewFriends";
import colors from "../../../../config/colors";
import { useAtom } from "jotai";
import { useTheme } from "../../../theme/context";
import { userAtom } from "../../../services/appStateAtoms";
import axios from "../../../redux/apis/axiosDeclaration";
import { current } from "@reduxjs/toolkit";
import routes from "../../../navigation/routes";

export default function MessagesNavBar(props) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [viewFriends, setViewFriends] = useState(false);
  const [userFriendsList, setUserFriendsList] = useState([]);
  const [currentUser] = useAtom(userAtom);
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(false);
  const [searchedFriendsList, setSearchedFriendsList] = useState([]);
  useEffect(() => {
    getUserFriendsList();
  }, []);
  const getUserFriendsList = async () => {
    const response = await axios.get(
      `api/users/friends/${currentUser?._id || currentUser?.id}?page=1`
    );
    setUserFriendsList(response.data?.data);
  };
  useEffect(() => {
    const debounce = setTimeout(() => {
      handleSearchUsers();
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [search]);
  const handleSearchUsers = async () => {
    setLoading(true);
    const response = await axios.get(
      `api/users/search/friends/${
        currentUser?._id || current?.id
      }?searchTerm=${search}`
    );
    setSearchedFriendsList(response.data);
    setLoading(false);
  };
  const handleStartChatting = async (user) => {
    const response = await axios.get(
      `/api/instant-chat/${currentUser?._id}/${user?._id || user?.id}`
    );
    
    if (response.data && response.data.length > 0) {
      const chat = response.data[0];
      navigation.navigate(routes.CHAT_SINGLE, { chat, socket:props.socket });
    } else {
      const response = await axios.post(`/api/instant-chat/create`, {
        hostId: currentUser?._id,
        userId: user?._id || user?.id,
      });
      navigation.navigate(routes.CHAT_SINGLE, { chat: response.data, socket:props.socket });
    }
    setViewFriends(false)
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="keyboard-arrow-left" size={28} color="lightgray" />
      </TouchableOpacity>

      <Text style={styles.title}>{props.title}</Text>
      
      <View style={styles.iconContainer}> 
      
      <TouchableOpacity>
        <View style={styles.groupTextIconView}>
          <MaterialIcons
            name="groups"
            size={20}
            color={colors.green} 
          />
        </View>
      </TouchableOpacity>
      <View style={styles.newMessageIconView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setViewFriends(true)}
        >
          <Entypo
            name="new-message"
            size={22}
            style={
              theme == "light" ? styles.message_light : styles.message_dark
            }
          />
        </TouchableOpacity>
      </View>
      </View>
      <ViewFriends
        open={viewFriends}
        onClose={() => setViewFriends(false)}
        friendsList={search ? searchedFriendsList : userFriendsList}
        setFriendsList={search ? setSearchedFriendsList : setUserFriendsList}
        onInputChange={setSearch}
        searchValue={search}
        loading={loading}
        handleStartChatting={handleStartChatting}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingVertical: 2,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.secondary,
  },
  text: {
    color: colors.white,
  },
  groupTextIconView: {
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.settingsBlack,
  },
  message_light: {
    color: colors.black,
  },
  message_dark: {
    color: colors.secondary,
  },
  iconContainer:{
    flex:1,
    alignItems:"center",
    flexDirection: "row",
    justifyContent:"flex-end"
  },
  newMessageIconView:{
    paddingLeft:25,
  }
  
});
