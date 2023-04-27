import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Share from "react-native-share";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import routes from "../../../navigation/routes";
import CustomAlert from "../../Alerts/CustomAlert";
import colors from "../../../../config/colors";
import uuid from "uuid-random";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const SettingsSheetModalScreen = ({ post, isCurrentUser }) => {
  const navigation = useNavigation();

  const [isDownload, setIsDownload] = useState(false);
  const [isFavorites, setIsFavorites] = useState(false);
  const [isDuo, setIsDuo] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharedFailed, setIsSharedFailed] = useState(false);
  const [isDownloadFailed, setIsDownloadFailed] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onShare = async () => {
    const shareOptions = {
      message: "Check out my latest video on Phlokk!",
      url: post.media[1].original_url,
      type: "video/mp4/mov/",
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
      JSON.stringify(ShareResponse);
      setIsShare(true);
    } catch (error) {
      setIsSharedFailed(true);
    }
  };

  const randStr = uuid().toString();

  const watermarkImage = require("../../../../assets/phlokk_logo.png");
  // Is it possible to add a progress circle that shows percentage of remaining download time?

  const downloadVideo = async () => {
    const url = post.media[1].original_url;
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

      MediaLibrary.saveToLibraryAsync(uri);
      setIsDownloading(true);
    } catch (e) {
      setIsDownloadFailed(true);
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
            {isCurrentUser ||
              (!post.user.disable_duos && (
                <TouchableOpacity
                  style={styles.fieldItemContainer}
                  autoCapitalize="none"
                  onPress={() =>
                    navigation.navigate("Cam", {
                      duo: true,
                      post,
                    })
                  }
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
              ))}
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

        {isCurrentUser ||
          (!post.user.disable_downloads && (
            <TouchableOpacity
              style={styles.fieldItemContainer}
              autoCapitalize="none"
              onPress={downloadVideo}
            >
              <View style={styles.bubble}>
                <Feather
                  name="download-cloud"
                  size={24}
                  color={colors.secondary}
                />
              </View>
              <Text style={styles.text}>DL</Text>
            </TouchableOpacity>
          ))}

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
        customAlertMessage={
          <Text>You have shared this video successfully</Text>
        }
        positiveBtn="Ok"
        modalVisible={isShare}
        dismissAlert={setIsShare}
        animationType="fade"
      />
      <CustomAlert
        alertTitle={
          <Text>
            <FontAwesome name="photo" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={
          <Text>Video has been {"\n"} saved to camera roll!</Text>
        }
        positiveBtn="Ok"
        modalVisible={isDownloading}
        dismissAlert={setIsDownloading}
        animationType="fade"
      />
      <CustomAlert
        alertTitle={
          <Text>
            <Feather name="share-2" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={
          <Text>
            Share was cancelled!{"\n"} Please select recipient to share video
          </Text>
        }
        positiveBtn="Ok"
        modalVisible={isSharedFailed}
        dismissAlert={setIsSharedFailed}
        animationType="fade"
      />
      <CustomAlert
        alertTitle={
          <Text>
            <Feather name="download" size={24} color={colors.green} />
          </Text>
        }
        customAlertMessage={
          <Text>
            Video could not be downloaded to your camera roll{"\n"}check
            permissions.
          </Text>
        }
        positiveBtn="Ok"
        modalVisible={isDownloadFailed}
        dismissAlert={setIsDownloadFailed}
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
