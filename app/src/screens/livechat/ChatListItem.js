import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import colors from "../../../config/colors";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ChatSettingsModalScreen from "../../components/modal/LiveChatModalScreen/ChatSettingsModalScreen";
import { useAtom } from "jotai";
import { userAtom } from "../../services/appStateAtoms";
import ViewMemberDetails from "./ViewMemberDetails";
const ChatListItem = ({ party, partyMembers, member, setMember, viewMember, setViewMember }) => {
  const navigation = useNavigation();
  const [currentUser] = useAtom(userAtom);
  const [openChatSettingsModal, setOpenChatSettingsModal] = useState(false); 

  const PartyMember = ({ item, index }) => {
    return (
      <View style={styles.micRow}>
        <TouchableOpacity
          onPress={() => {
            setMember(item);
            setViewMember(true);
          }}
        >
          <Image
            source={{ uri: item?.user?.photo_url }}
            style={styles.avatarRow}
          />
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.iconView}>
            <MaterialCommunityIcons
              name="microphone-off"
              size={18}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.usernameView}>
          <Text style={styles.usernameText} numberOfLines={1}>
            <Feather name="wifi" size={12} color={colors.green} />{" "}
            {item?.user?.username}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.chatIconRow}>
          <View style={styles.text}>
            <View style={styles.userRow}>
              <FlatList
                data={partyMembers}
                keyExtractor={(item) => item._id.toString()}
                numColumns={3}
                renderItem={PartyMember}
              />
              <Modal
                animationType="slide"
                transparent={true}
                visible={openChatSettingsModal}
              >
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                  <Pressable
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                    }}
                    onPress={() => setOpenChatSettingsModal(false)}
                  />
                  <ChatSettingsModalScreen />
                </View>
              </Modal>
            </View>
          </View>
        </View>
      </View>
      <ViewMemberDetails
        open={viewMember}
        partyMember = {member}
        onClose={() => {
          setMember(null);
          setViewMember(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  userRow: {
    padding: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  chatIconRow: {
    paddingHorizontal: 20,
  },
  micRow: {
    marginTop: 15,
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
  },
  avatarRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    backgroundColor: colors.primary,
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 1.5,
     // if it's not active (talking) then its colors.secondary or else green.
  },
  usernameText: {
    marginTop: 15,
    fontSize: 12,
    color: colors.secondary,
  },
  usernameView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 65,
  },
  iconView: {
    backgroundColor: colors.lightBlack,
    padding: 2,
    borderRadius: 30,
    position: "absolute",
    left: 8,
    bottom: 20,
  },
});

export default ChatListItem;
