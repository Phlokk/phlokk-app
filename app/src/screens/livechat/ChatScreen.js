import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import LiveChatNav from "../../components/general/liveChatNav/LiveChatNav";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import routes from "../../navigation/routes";
import axios from "../../redux/apis/axiosDeclaration";
import ViewRoom from "./ViewRoom";
import { userAtom } from "../../services/appStateAtoms";
import { useAtom } from "jotai";
const ChatScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [parties, setParties] = useState([]);
  const [party, setParty] = useState(null);
  const [viewParty, setViewParty] = useState(false);
  const [currentUser] = useAtom(userAtom);
  useEffect(() => {
    getAllParties();
  }, [isFocused]);

  const getAllParties = async () => {
    const response = await axios.get("/api/rooms");
    setParties(response.data);
  };
  const handleNavigateToParty = async (party) => {
    const currentUserId = currentUser._id || currentUser.id
    const partyUser = party.user._id || party.user.id;
    if(currentUserId !== partyUser){
     await joinUserToParty(currentUserId, party._id )
     navigation.navigate(routes.ROOM, { party })
    }
  }
  const joinUserToParty = async(userId, roomId) =>{
    const response =await axios.post(`/api/room/member/join`,{ userId, roomId })
  }

  const PartyItem = ({ item }) => {
    return (
      <View style={styles.chatIconRow}>
        <View style={styles.text}>
          <View style={styles.micRow}>
            <TouchableOpacity
              onPress={()=>handleNavigateToParty(item)}
              onLongPress={() => {
                setParty(item);
                setViewParty(true);
              }}
            >
              <Image
                style={styles.avatarRow}
                source={
                  item?.user?.photo_url
                    ? { uri: item?.user?.photo_url }
                    : require("../../../assets/userImage.png")
                }
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.partyGuestCount}>
                <Feather name="user" size={15} color={colors.green} /> 200
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

              <TouchableOpacity
                style={styles.iconView}
                onPress={() =>
                  navigation.navigate(routes.ROOM, { party: item })
                }
              >
                <MaterialCommunityIcons
                  name="microphone"
                  size={22}
                  color={colors.green}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconView}>
                <Feather name="flag" size={20} color={colors.secondary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.navView}>
        <LiveChatNav parties={parties} setParties={setParties} />
      </View>
      <View style={{ flexDirection: "row" }}>
        <FlatList
          data={parties}
          renderItem={({ item, index }) => <PartyItem item={item} />}
          keyExtractor={(item) => item._id}
          numColumns={2}
        />
      </View>
      <ViewRoom
        party={party}
        open={viewParty}
        onClose={() => {
          setParty(null);
          setViewParty(false);
        }}
      />
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
    flexDirection: "row",
  },
  dotRow: {
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 15,
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  infoRow: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  partyGuestCount: {
    marginBottom: 6,
    color: colors.green,
  },
  room_profile_img: {
    width: 50,
    height: 50,
  },
});

export default ChatScreen;
