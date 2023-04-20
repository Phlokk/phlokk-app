import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import colors from "../../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import LiveChatRoomNav from "../../components/general/liveChatNav/LiveChatRoomNav";
import ChatListItem from "./ChatListItem";
import { MaterialIcons } from "@expo/vector-icons";

const ChatRoomScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.navView}>
        <LiveChatRoomNav title="Rabbit Hole" />
      </View>
      {/* row 1 */}
      <View>
        <View style={styles.topicView}>
          <View style={styles.statsView}>
            <Text style={styles.topicText}>
              <Feather name="user" size={15} color={colors.green} /> 4
            </Text>
            <Text style={styles.topicText}> LIVE: 4</Text>
          </View>
          {/* <View style={styles.infoBoxView}>
            <Text style={styles.topicText}>
              The FEDs are losing the battle! Anarchy continues. The world is
              falling fast. Who can stop it's demise?
            </Text>
          </View> */}
        </View>
        <View style={styles.chatIconRow}>
          <View style={styles.text}>
            <View style={styles.micRow}>
              <TouchableOpacity style={styles.avatarRow}>
                <View style={styles.wavView}>
                  <MaterialCommunityIcons
                    name="waveform"
                    size={24}
                    color={colors.purple}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.usernameView}>
                <Text style={styles.usernameText} numberOfLines={1}>
                  username
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
                  <MaterialIcons
                    name="whatshot"
                    size={21}
                    color={colors.secondary}
                  />
                </TouchableOpacity>


                <TouchableOpacity style={styles.iconView}>
                  <Feather name="flag" size={20} color={colors.secondary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* below here will be rows of users in the live */}
        <ChatListItem />
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
