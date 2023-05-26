import React from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  StyleSheet,
  Modal,
  FlatList,
  Touchable,
  TouchableOpacity,
} from "react-native";
import colors from "../../../config/colors";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import ViewMemberDetails from "./ViewMemberDetails";
import { useState } from "react";
export default function ViewRoom({ open, onClose, party }) {
  const [viewUserDetails, setViewUserDetails] = useState(false);

  const renderListeners = ({ item }) => {
    return (
      <Text style={styles.username}>
        {" "}
        {item?.username || item}{" "}
        <Ionicons
          name="chatbox-ellipses-outline"
          size={15}
          color={colors.secondary}
        />
      </Text>
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={open}>
      <View style={styles.pressedModal}>
        <Pressable style={styles.pressedStyle} onPress={onClose} />
        <View style={styles.modal_content}>
          <TouchableOpacity
            style={styles.container}
            onPress={() => setViewUserDetails(true)}
          >
            <Image
              style={styles.avatar}
              source={
                party?.user?.photo_url
                  ? { uri: party?.user?.photo_url }
                  : require("../../../assets/userImage.png")
              }
            />
            <View>
              <Text style={styles.party_title} numberOfLines={2}>
                {party?.title}
              </Text>
              <Text style={styles.username} numberOfLines={2}>
                <Text style={styles.host}>host: </Text>
                {party?.user?.username}
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.description}>{party?.description}</Text>
          <View style={styles.party_details}>
            <Text style={styles.number_of_live_users}>
              <Feather name="user" size={15} color={colors.green} /> 1
            </Text>
            <View style={styles.message_icon}>
              <Text style={styles.number_of_comments}>
                <MaterialCommunityIcons
                  name="message-processing-outline"
                  size={14}
                  color={colors.secondary}
                />{" "}
                200
              </Text>
            </View>
          </View>
          <View style={styles.listener_container}>
            <Text style={styles.listeners}>
              <FontAwesome5
                name="headphones"
                size={15}
                color={colors.secondary}
              />{" "}
              Listeners
            </Text>
            <FlatList
              data={[party?.user]}
              keyExtractor={(item) => item._id}
              renderItem={renderListeners}
            />
          </View>
        </View>
      </View>
      <ViewMemberDetails
        open={viewUserDetails}
        onClose={() => setViewUserDetails(false)}
        partyMember={{
          user: {
            id: party?.user?._id || party?.user?.id,
          },
        }}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  pressedStyle: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  pressedModal: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modal_content: {
    height: "80%",
    backgroundColor: colors.settingsBlack,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  container: {
    flex: 1,
    marginTop: 20,
    flexDirection: "row",
    padding: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  host: {
    color: colors.green,
  },
  username: {
    fontSize: 16,
    color: colors.white,
    marginLeft: 10,
  },
  listeners: {
    fontSize: 16,
    color: colors.white,
    marginLeft: 10,
    marginBottom: 20,
  },
  party_title: {
    marginTop: 6,
    fontSize: 16,
    color: colors.white,
    marginLeft: 10,
  },
  party_details: {
    position: "absolute",
    right: 20,
    top: 20,
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  number_of_live_users: {
    color: colors.secondary,
  },
  number_of_comments: {
    color: colors.secondary,
    textAlign: "center",
  },
  message_icon: {
    marginLeft: 10,
  },
  description: {
    color: colors.secondary,
    top: 100,
    position: "absolute",
    padding: 20,
  },
  listener_container: {
    top: 250,
    position: "absolute",
    padding: 20,
  },
});
