import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../../theme/context";
import colors from "../../../../config/colors";
import ChatSettingsModalScreen from "../../modal/LiveChatModalScreen/ChatSettingsModalScreen";
import CustomAlert from "../../../components/Alerts/CustomAlert";
import ViewUserFriends from "./ViewUserFriends";
import axios from "../../../redux/apis/axiosDeclaration";
import { useAtom } from "jotai";
import { userAtom } from "../../../services/appStateAtoms";
export default function LiveChatRoomNav({
  partyMembers,
  setPartyMembers,
  party,
  title,
  deleteParty,
  joinedMembers
}) {
  const { theme, setTheme } = useTheme();
  const [openChatSettingsModal, setOpenChatSettingsModal] = useState(false);
  const [viewFriends, setViewFriends] = useState(false);
  const [friendsList, setFriendsList] = useState([]);
  const [searchedFriendsList, setSearchedFriendsList] = useState([])
  const [searchValue, setSearchValue]= useState("")
  const [loading, setLoading]= useState(false)
  const [goBack, setGoBack] = useState(false);
  const [currentUser] = useAtom(userAtom)
  const navigation = useNavigation();
  useEffect(() => {
    getUserFriendsList();
  }, []);
  useEffect(()=>{
    const debounce = setTimeout(()=>{
      handleSearchUsers()
    },500)
    return ()=> {
      clearTimeout(debounce)
    }
  },[searchValue])
  const handleGoBack = () => currentUser?._id !== (party?.user?._id || party?.user?.id) ? navigation.goBack() : setGoBack(true);
  const handleDeleteParty = async () => {
    await deleteParty();
    navigation.goBack();
  };
  const getUserFriendsList = async () => {
    const response = await axios.get(
      `api/users/friends/${currentUser?._id || currentUser?.id}?page=1`
    );
    setFriendsList(response.data?.data);
  };
  const handleInviteUser = async (user) => {
    const response = await axios.post("/api/room/member/invite", {
      userId: user._id || user.id,
      roomId: party?._id,
      roomHostId: party?.user._id || party?.user.id,
    });
    setPartyMembers((members) => [
      ...members,
      {
        user: {
          ...user,
          id: user._id,
          photo_url: user?.photo_url,
        },
      },
    ]);
  };
  const handleSearchUsers = async() =>{ 
    setLoading(true)
    const response = await axios.get(`api/users/search/friends/${party?.user._id || party?.user.id}?searchTerm=${searchValue}`);
    setSearchedFriendsList(response.data)
    setLoading(false)
  }
  const handleFetchMoreUsers = () =>{}

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={28}
          style={theme == "light" ? styles.chevron_light : styles.chevron_dark}
        />
      </TouchableOpacity>

      <Text style={theme == "light" ? styles.title_light : styles.title_dark}>
        {title} <Text style={styles.madChatterEmojii}>&#x1F3A9;</Text>
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setViewFriends(true)}
      >
        <Feather
          name="users"
          size={19}
          style={[
            theme == "light" ? styles.toggle_light : styles.toggle_dark,
            styles.infoIcon,
          ]}
        />
      </TouchableOpacity>
      <CustomAlert
        alertTitle={
          <Text>
            <Text style={styles.emojii}>&#x1F389;</Text>
          </Text>
        }
        customAlertMessage={<Text>Are you sure want to end this party?</Text>}
        positiveBtn="Ok"
        negativeBtn="Cancel"
        onPositivePressed={handleDeleteParty}
        modalVisible={goBack}
        dismissAlert={setGoBack}
        animationType="fade"
      />
      <ViewUserFriends
        searchValue={searchValue}
        onInputChange = {(e)=>setSearchValue(e)}
        partyMembers={partyMembers}
        handleInviteUser={handleInviteUser}
        open={viewFriends}
        friendsList={searchValue ? searchedFriendsList : friendsList}
        setFriendsList={searchValue ? setSearchedFriendsList : setFriendsList}
        onClose={() => setViewFriends(false)}
        handleFetchMoreUsers={handleFetchMoreUsers}
        loading={loading}
        joinedMembers={joinedMembers}
        party={party}
        currentUser={currentUser}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
  },
  button: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  button_light: {
    color: colors.white,
  },
  button_dark: {
    color: colors.secondary,
  },
  title_light: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Waterfall-Regular",
    color: colors.green,
  },
  title_dark: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Waterfall-Regular",
    color: colors.green,
  },
  text: {
    color: colors.white,
  },
  chevron_light: {
    color: colors.secondary,
  },
  chevron_dark: {
    color: colors.white,
    opacity: 0.6,
  },
  toggle_light: {
    color: colors.secondary,
  },
  toggle_dark: {
    color: colors.secondary,
  },
  infoIcon: {
    marginRight: 10,
  },
  madChatterEmojii: {
    fontSize: 21,
  },
  emojii: {
    fontSize: 15,
  },
});
