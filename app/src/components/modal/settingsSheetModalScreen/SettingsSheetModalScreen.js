import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,

} from "react-native";

import React, { useState } from "react";
import Share from "react-native-share";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import routes from "../../../navigation/routes";
import CustomAlert from "../../Alerts/CustomAlert";
import colors from "../../../../config/colors";
import uuid from 'uuid-random';
import * as FileSystem from "expo-file-system";

const SettingsSheetModalScreen = ({ post, isCurrentUser }) => {
  const navigation = useNavigation();

  const [isDownload, setIsDownload] = useState(false);
  const [isFavorites, setIsFavorites] = useState(false);
  const [isDuo, setIsDuo] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onShare = async () => {
    const shareOptions = {
      message: "Check out my latest video on Phlokk!",
      url: post.media[0].original_url,
      type: "video/mp4/mov/",
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log("Error => ", error);
    }
  };

  const randStr = uuid().toString();
// Is it possible to add a progress circle that shows percentage of remaining download time?
 
  const downloadVideo = async () => {
    const url = post.media[0].original_url;
    const outputDir = `${FileSystem.documentDirectory}${randStr}.mov`;

    const downloadResumable = FileSystem.createDownloadResumable(
      url,
      outputDir
    );

    try {
      const directoryInfo = await FileSystem.getInfoAsync(outputDir);
      if (!directoryInfo.exists) {
        await FileSystem.makeDirectoryAsync(outputDir, { intermediates: true });
      }

      const { uri } = await downloadResumable.downloadAsync();
      setIsDownloading(true)
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView style={styles.topBar} horizontal={true}>
        {!isCurrentUser ? (
          <>
            <TouchableOpacity
              style={styles.fieldItemContainer}
              onPress={() => {
                navigation.navigate(routes.REPORTS, { post });
              }}
            >
              <View style={styles.bubble}>
                <Feather name="flag" size={24} color={colors.secondary} />
              </View>
              <Text style={styles.text}>Report</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.fieldItemContainer}
              autoCapitalize="none"
              onPress={() => setIsFavorites(true)}
            >
              <View style={styles.bubble}>
                <MaterialIcons
                  name="bookmark-outline"
                  size={24}
                  color={colors.secondary}
                />
              </View>
              <Text style={styles.text}>FAV</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.fieldItemContainer}
              autoCapitalize="none"
              onPress={() => setIsDuo(true)}
            >
              <View style={styles.bubble}>
                <MaterialCommunityIcons
                  name="account-box-multiple-outline"
                  size={24}
                  color={colors.secondary}
                />
              </View>
              <Text style={styles.text}>Duo</Text>
            </TouchableOpacity>
          </>
        ) : null}

        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          onPress={() => setIsLink(true)}
        >
          <View style={styles.bubble}>
            <Feather name="link" size={24} color={colors.secondary} />
          </View>
          <Text style={styles.text}>Link</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          // onPress={() => setIsDownload(true)}
          onPress={downloadVideo}
        >
          <View style={styles.bubble}>
            <Feather name="download-cloud" size={24} color={colors.secondary} />
          </View>
          <Text style={styles.text}>DL</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fieldItemContainer}
          // onPress={() => setIsShare(true)}
          onPress={onShare}
        >
          <View style={styles.bubble}>
            <MaterialCommunityIcons
              name="share-all-outline"
              size={26}
              color={colors.secondary}
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
        customAlertMessage={<Text>Add to Favorites{"\n"}coming soon!</Text>}
        positiveBtn="Ok"
        modalVisible={isFavorites}
        dismissAlert={setIsFavorites}
        animationType="fade"
      />

      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Duo{"\n"}coming soon!</Text>}
        positiveBtn="Ok"
        modalVisible={isDuo}
        dismissAlert={setIsDuo}
        animationType="fade"
      />
      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Links{"\n"}coming soon!</Text>}
        positiveBtn="Ok"
        modalVisible={isLink}
        dismissAlert={setIsLink}
        animationType="fade"
      />
      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Downloads{"\n"}coming soon!</Text>}
        positiveBtn="Ok"
        modalVisible={isDownload}
        dismissAlert={setIsDownload}
        animationType="fade"
      />
      <CustomAlert
        alertTitle={
          <Text>
            <MaterialIcons name="info" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Share{"\n"}coming soon!</Text>}
        positiveBtn="Ok"
        modalVisible={isShare}
        dismissAlert={setIsShare}
        animationType="fade"
      />
      <CustomAlert
        alertTitle={
          <Text>
            <Feather name="download" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={<Text>Finished downloading to device</Text>}
        positiveBtn="Ok"
        modalVisible={isDownloading}
        dismissAlert={setIsDownloading}
        animationType="fade"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.modals,
    height: "12%",
  },
  text: {
    color: colors.secondary,
    bottom: 20,
    fontSize: 10,
    position: "absolute",
    top: 45,
    bottom: 0,
  },
  settingsText: {
    color: colors.secondary,
    textAlign: "center",
    paddingTop: 30,
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
});

export default SettingsSheetModalScreen;
