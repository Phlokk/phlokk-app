import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import colors from "../../../../config/colors";
import CustomAlert from "../../Alerts/CustomAlert";
import routes from "../../../navigation/routes";


const ChatSettingsModalScreen = ({ currentUser, item }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [isChatModalScreenOpen, setIsChatModalScreenOpen] =
    useState(false);

  useEffect(() => {
    setIsChatModalScreenOpen(false);
  }, [isFocused]);


  return (
    <View style={styles.container}>
      <View style={styles.artistView}>
      <Text style={styles.infoArtistText}><Text style={styles.labelText}>Title:</Text> </Text>
        <Text style={styles.infoArtistText}><Text style={styles.labelText}>Artist:</Text> </Text>
        <Text style={styles.infoArtistText}><Text style={styles.labelText}>Genre:</Text> </Text>
        <Text style={styles.infoArtistText}><Text style={styles.labelText}>Label:</Text> </Text>
        <Text style={styles.infoArtistText}><Text style={styles.labelText}>Release Year:</Text> </Text>
      </View>
      <ScrollView style={styles.topBar} horizontal={true}>
        <>
          <TouchableOpacity
            style={styles.fieldItemContainer}
          >
            <View style={styles.bubble}>
              <MaterialCommunityIcons
                name="bookmark-music"
                size={22}
                color={colors.green}
              />
            </View>
            <Text style={styles.text}>Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
            
          >
            <View style={styles.bubble}>
              <MaterialCommunityIcons
                name="playlist-music-outline"
                size={29}
                color={colors.green}
              />
            </View>
            <Text style={styles.text}>Use</Text>
          </TouchableOpacity>
        </>
        <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
          >
            <View style={styles.bubble}>
              <Ionicons
                name="md-cut-sharp"
                size={26}
                color={colors.green}
              />
            </View>
            <Text style={styles.text}>Trim</Text>
          </TouchableOpacity>

        <TouchableOpacity
          style={styles.fieldItemContainer}
          // onPress={
          //   item.sound_url ? () => Linking.openURL(item.link) : null
          // }
        >
          <View style={styles.bubble}>
            <MaterialCommunityIcons
              name="music-circle-outline"
              size={22}
              color={colors.green}
            />
          </View>
          <Text style={styles.text}>Buy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fieldItemContainer}
          // onPress={
          //   item.sound_url ? () => Linking.openURL(item.sound_url) : null
          // }
        >
          <View style={styles.bubble}>
            <Feather name="book" size={20} color={colors.green} />
          </View>
          <Text style={styles.text}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.fieldItemContainer}
          >
            <View style={styles.bubble}>
            <MaterialCommunityIcons
              name="share-all-outline"
              size={26}
              color={colors.green}
            />
            </View>
            <Text style={styles.text}>Share</Text>
          </TouchableOpacity>
      </ScrollView>

      
      
      
      {/* <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Share audio with others{"\n"}coming soon!</Text>}
        positiveBtn="Ok"
        modalVisible={shareAudio}
        dismissAlert={setShareAudio}
        animationType="fade"
      /> */}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.modals,
    height: "30%",
  },
  text: {
    color: colors.secondary,
    bottom: 20,
    fontSize: 10,
    position: "absolute",
    top: 45,
    bottom: 0,
  },
  fieldItemContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    marginLeft: 10,
  },
  fieldValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bubble: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 45,
  },
  topBar: {
    marginTop: 10,
  },
  artistView: {
    paddingHorizontal: 15, 
    marginTop: 15, 
    marginBottom: 25, 
  },
  infoArtistText: {
    marginTop: 5,
    color: colors.secondary,
    fontSize: 10, 
    fontWeight: "bold",
  },
  labelText: {
    color: colors.green,

  },
});

export default ChatSettingsModalScreen;
