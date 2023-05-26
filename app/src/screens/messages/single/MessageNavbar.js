import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../theme/context";
import colors from "../../../../config/colors";
import routes from "../../../navigation/routes";
export default function MessagesNavBar({ user }) {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={28}
          color="lightgray"
          onPress={() => navigation.goBack()}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.userProfile}
        onPress={() => {
          navigation.navigate("feedProfile", {
            initialUser: user,
          });
        }}
      >
        <Image source={{ uri: user?.photo_url }} style={styles.avatar} />
        <View style={styles.userDetails}>
          <Text style={styles.username}>{user?.username}</Text>
          <Text style={styles.activeSince}>Active 2h ago</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.groupTextIconView}>
          {/* This will be for tags on certain types of chat events ie: Flag, Ordered, Paid, Shipped  */}
        <Feather 
        name="tag" 
        size={20}
        
        style={ theme == "light" ? styles.message_light : styles.message_dark } 
        />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingVertical: 2,
  },
  button: {
    paddingRight: 20,
  },
  userProfile: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.secondary,
  },
  activeSince: {
    fontSize: 12,
    color: colors.secondary,
    opacity: 0.6,
  },
  userDetails: {
    paddingLeft: 10,
  },

  title_light: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.black,
  },
  title_dark: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.secondary,
  },
  text: {
    color: colors.white,
  },
  chevron_light: {
    color: colors.black,
  },
  chevron_dark: {
    opacity: 0.6,
  },
  message_light: {
    color: colors.black,
  },
  message_dark: {
    color: colors.secondary,
  },
});
