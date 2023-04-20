import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import colors from "../../../config/colors";
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ChatSettingsModalScreen from "../../components/modal/LiveChatModalScreen/ChatSettingsModalScreen";


const ChatListItem = () => {
  const navigation = useNavigation();
  const [openChatSettingsModal, setOpenChatSettingsModal] = useState(false);

  return (
    <>

      {/* row 1 */}
      <View style={styles.container}>
        
        <View style={styles.chatIconRow}>
          <View style={styles.text}>

            <View style={styles.userRow}>
              
            <View style={styles.micRow}>
              <TouchableOpacity style={styles.avatarRow}>

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
                <Text style={styles.usernameText} numberOfLines={1}><Feather name="wifi" size={12} color={colors.green} />  Vibez</Text>
              </View>
            </View>

            <View style={styles.micRow}>
            <TouchableOpacity style={styles.avatarRow}>
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
                <Text style={styles.usernameText} numberOfLines={1}><Feather name="wifi" size={12} color={colors.green} />  Loyal-T</Text>
              </View>
            </View>

            <View style={styles.micRow}>
            <TouchableOpacity style={styles.avatarRow}>
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
                <Text style={styles.usernameText} numberOfLines={1}><Feather name="wifi" size={12} color={colors.green} />  BeyondThe Sidewalk</Text>
              </View>
            </View>
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
  },
  avatarRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    backgroundColor: colors.primary,
    width: 55,
    height: 55,
    borderRadius: 17.5,
    borderWidth: 1.5,
    borderColor: colors.green, // if it's not active (talking) then its colors.secondary or else green.
  },
  usernameText: {
    fontSize: 10,
    color: colors.secondary,
  },
  usernameView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
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