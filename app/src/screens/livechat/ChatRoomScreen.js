import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import LiveChatRoomNav from "../../components/general/liveChatNav/LiveChatRoomNav";
import ChatListItem from "./ChatListItem";
// import { MaterialIcons } from "@expo/vector-icons";
import axios from "../../redux/apis/axiosDeclaration";
import { Octicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useAtom } from "jotai";
import { userAtom } from "../../services/appStateAtoms";
import * as ImagePicker from "expo-image-picker";
import { fetchGetUser } from "../../redux/sagas/requests/fetchUser";
import * as SecureStore from "expo-secure-store";
import { apiUrlsNode } from "../../globals";
const ChatRoomScreen = ({ route }) => {
  const navigation = useNavigation();
  const party = route.params?.party;
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [profileImage, setProfileImage] = useState(null);
  const [partyMembers, setPartyMembers] = useState([]);
  const [invitedMembers, setInvitedMembers] = useState([]);
  useEffect(() => {
    getPartyInvitedMembers();
    getPartyMembers();

    return ()=> {
      if((currentUser._id||currentUser.id) === (party.user.id || party.user._id)) deleteParty()
    }
     
  }, []);

  const handleUpdateProfileImage = async () => {
    let user = await SecureStore.getItemAsync("user");
    user = JSON.parse(user);
    let partyUserId = party.user?._id || party.user.id;
    if (partyUserId !== user._id) return;

    await chooseImage(user);
  };
  const chooseImage = async (user) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        setProfileImage(result.uri);
      }
      let split = result.uri.split("/");
      let fileName = split[split.length - 1];

      const formData = new FormData();
      formData.append("photo_url", {
        name: fileName,
        uri: result.uri,
        type: "image/*",
      });

      let url = apiUrlsNode.BASE_URL2 + `/api/users/uploadImage/${user._id}`;
      const config = {
        "content-type": "multipart/form-data",
        "auth-token": `${user.token}`,
      };

      fetch(url, {
        method: "POST",
        headers: config,
        body: formData,
      })
        .then(async (e) => {
          const response = await fetchGetUser();
          setCurrentUser(response);
          alert("Profile picture updated successfully.");
        })
        .catch((ex) => {
          alert("Unable to update profile picture. Please try again later.");
        });
    } catch (e) {
      console.log("Error: ", e);
    }
  };
  const getPartyInvitedMembers = async () => {
    const response = await axios.get(
      `/api/room/member/${party?._id}?joined=0&invited=1`
    );
    setInvitedMembers(response.data);
  };
  const getPartyMembers = async () => {
    const response = await axios.get(`/api/room/member/${party?._id}?joined=1`) 
    setPartyMembers(response.data.filter((e)=> e.user.id !== party.user.id))
  }; 
  const deleteParty = async () =>
    await axios.post(`/api/rooms/delete/${party?._id}`);

  return (
    <View style={styles.container}>
      <View style={styles.navView}>
        <LiveChatRoomNav
          partyMembers={invitedMembers}
          setPartyMembers={setInvitedMembers}
          party={party}
          title="Mad Chatter"
          deleteParty={deleteParty}
        />
      </View>
      <View>
        <View style={styles.topicView}>
          <View style={styles.statsView}>
            <Text style={styles.topicText}>
              <Feather name="user" size={15} color={colors.green} /> 4
            </Text>
            <Text style={styles.topicText}> LIVE: 4</Text>
          </View>
        </View>
        <View style={styles.chatIconRow}>
          <View style={styles.text}>
            <View style={styles.micRow}>
              <TouchableOpacity onLongPress={handleUpdateProfileImage}>
                <Image
                  source={
                    {uri: party.user ? party.user.photo_url
                    
                      : require("../../../assets/userImage.png")}
                  }
                  style={styles.avatarRow}
                />
              </TouchableOpacity>
              <View style={styles.usernameView}>
                <Text style={styles.usernameText} numberOfLines={1}>
                  {party?.user?.username}
                </Text>
              </View>
              <View style={styles.partyTitleView}>
                <Text style={styles.partyTitle} numberOfLines={2}>
                  {party?.title}
                </Text>
              </View>

              <View style={styles.optionView}>
                <TouchableOpacity style={styles.iconView}>
                  <Ionicons
                    name="chatbox-ellipses-outline"
                    size={20}
                    color={colors.secondary}
                  />
                </TouchableOpacity>
                {currentUser._id !== party.user.id && 
                <>

                <TouchableOpacity style={styles.iconView}>
                  <MaterialCommunityIcons
                    name="bookmark"
                    size={21}
                    color={colors.secondary}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconView}>
                  {/* <Feather
                    name="user-plus"
                    size={21}
                    color={colors.secondary}
                  /> */}
                  <AntDesign name="swap" size={22} color={colors.white} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconView}>
                  <MaterialCommunityIcons
                    name="fire"
                    size={23}
                    color={colors.secondary}
                  />
                </TouchableOpacity>
                </>}
                <TouchableOpacity style={styles.iconView}>
                  <FontAwesome
                    name="opencart"
                    size={20}
                    color={colors.white}
                    onPress={
                      party?.user && party?.user?.link
                        ? () => Linking.openURL(party?.user?.link)
                        : null
                    }
                  />
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.iconView}>
                  <Feather name="flag" size={20} color={colors.secondary} />
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </View>
        {/* below here will be rows of users in the live */}
        <ChatListItem partyMembers={partyMembers} setPartyMembers = {setPartyMembers}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  microphoneView: {
    flexDirection: "row",
  },
  optionView: {
    marginTop: 20,
    flexDirection: "row",
  },
  iconView: {
    marginHorizontal: 15,
  },
  navView: {
    marginTop: 35,
  },
  text: {
    color: colors.secondary,
    marginHorizontal: 25,
    marginTop: 5,
  },
  liveText: {
    color: colors.secondary,
    marginHorizontal: -8,
  },
  chatIconRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  chatText: {
    textAlign: "center",
    color: colors.secondary,
    marginTop: 15,
  },
  micRow: {
    marginTop: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatarRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 17.5,
    borderWidth: 1.5,
    borderColor: colors.green,
  },
  infoRow: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  topicText: {
    justifyContent: "center",
    alignItems: "center",
    color: colors.secondary,
    marginBottom: 5,
    marginHorizontal: 15,
  },
  topicView: {
    padding: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  infoBoxView: {
    flexDirection: "row",
    padding: 10,
    marginTop: 5,
    paddingHorizontal: 5,
    borderRadius: 7,
    borderWidth: 2.5,
    borderColor: colors.green,
    width: 300,
  },
  statsView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 5,
    width: 200,
  },
  countText: {
    color: colors.green,
  },
  wavView: {
    position: "absolute",
    bottom: 2,
  },
  partyTitle: {
    fontSize: 12,
    color: colors.secondary,
    textAlign: "center",
  },
  partyTitleView: {
    marginTop: 20,
  },
  usernameText: {
    fontSize: 12,
    color: colors.secondary,
  },
  usernameView: {
    flex: 1,
    position: "absolute",
    top: 70,
  },
});

export default ChatRoomScreen;
