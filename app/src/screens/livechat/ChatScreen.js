import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import colors from "../../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import LiveChatNav from "../../components/general/liveChatNav/LiveChatNav";
import { useNavigation } from "@react-navigation/native";
import routes from "../../navigation/routes";

const ChatScreen = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.navView}>
      <LiveChatNav />
      </View>
      {/* row 1 */}
      <View style={{ flexDirection: "row" }}>
        <View style={styles.chatIconRow}>
          <View style={styles.text}>
            <View style={styles.micRow}>
              <TouchableOpacity>
                <View style={styles.avatarRow}></View>
              </TouchableOpacity>

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
                onPress={() => navigation.navigate(routes.ROOM)}
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

              <Text style={styles.chatText}>Room #1</Text>
            </View>
          </View>
        </View>
        {/* row 2 */}
        <View style={styles.chatIconRow}>
          <View style={styles.text}>
            <View style={styles.micRow}>
              <TouchableOpacity>
                <View style={styles.avatarRow}></View>
              </TouchableOpacity>

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
                    name="microphone"
                    size={22}
                    color={colors.green}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconView}>
                  <Feather name="flag" size={20} color={colors.secondary} />
                </TouchableOpacity>
              </View>

              <Text style={styles.chatText}>Room #2</Text>
            </View>
          </View>
        </View>
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
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 17.2,
    borderWidth: 2,
    borderColor: colors.white,
  },
  infoRow: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;
