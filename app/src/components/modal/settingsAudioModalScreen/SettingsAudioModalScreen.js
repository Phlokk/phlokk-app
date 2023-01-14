import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
// import { useNavigation } from "@react-navigation/native";
import colors from "../../../../config/colors";
import CustomAlert from "../../Alerts/CustomAlert";

const SettingsAudioModalScreen = ({ currentUser, item }) => {
  const [isAuthorLink, setIsAuthorLink] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isUseAudio, setUseAudio] = useState(false);
  const [shareAudio, setShareAudio] = useState(false);


  return (
    <View style={styles.container}>
      <View style={styles.artistView}>
      <Text style={styles.infoArtistText}><Text style={styles.labelText}>Title:</Text> {item.song_name}</Text>
        <Text style={styles.infoArtistText}><Text style={styles.labelText}>Artist:</Text> {item.artist}</Text>
        <Text style={styles.infoArtistText}><Text style={styles.labelText}>Genre:</Text> {item.genre}</Text>
      </View>
      <ScrollView style={styles.topBar} horizontal={true}>
        <>
          <TouchableOpacity
            style={styles.fieldItemContainer}
            onPress={() => setIsFavorite(true)}
          >
            <View style={styles.bubble}>
              <MaterialCommunityIcons
                name="bookmark-music"
                size={22}
                color={colors.green}
              />
            </View>
            <Text style={styles.text}>Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
            onPress={() => setUseAudio(true)}
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
          onPress={
            item.sound_url ? () => Linking.openURL(item.sound_url) : null
          }
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
          onPress={() => setIsAuthorLink(true)}
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
            onPress={() => setShareAudio(true)}
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

      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Add sounds to Favorites{"\n"}coming soon!</Text>}
        positiveBtn="Ok"
        modalVisible={isFavorite}
        dismissAlert={setIsFavorite}
        animationType="fade"
      />

      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Use audio{"\n"}coming soon!</Text>}
        positiveBtn="Ok"
        modalVisible={isUseAudio}
        dismissAlert={setUseAudio}
        animationType="fade"
      />
      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Sell your books{"\n"}coming soon!</Text>}
        positiveBtn="Ok"
        modalVisible={isAuthorLink}
        dismissAlert={setIsAuthorLink}
        animationType="fade"
      />
      <CustomAlert
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
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.modals,
    height: "24%",
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

export default SettingsAudioModalScreen;
