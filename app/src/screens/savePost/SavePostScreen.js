import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/actions";
import PostNavBar from "../../components/general/postNav/PostNavBar";
import routes from "../../navigation/routes";
import colors from "../../../config/colors";
import LottieView from "lottie-react-native";
import CustomAlert from "../../components/Alerts/CustomAlert";
import * as MediaLibrary from "expo-media-library";
import CustomSwitch from "./CustomSwitch";
import { useAtom } from "jotai";
import { newFeedItemAtom } from "../videoFeed/VideoFeed";
import CustomActivityIndicator from "../../components/common/ActivityIndicator";

export default function SavePostScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [requestRunning, setRequestRunning] = useState(false);
  const lottieAnimation = require("../../../assets/animations/loader.json");
  const phlokkLogo = require("../../../assets/phlokk_logo.png");
  const [text, setText] = useState("Click");
  const [drafts, setDrafts] = useState(false);
  const [isSelectedImage, setIsSelectedImage] = useState(false);

  const [newFeedItem, setNewFeedItem] = useAtom(newFeedItemAtom);

  const handleSavePost = () => {
    setRequestRunning(true);
    dispatch(
      createPost(
        description,
        route.params.videoUrl,
        route.params.videoThumb,
        route.params.videoUrl
      )
    )
      .then(async (res) => {
        // console.log(res);
        await MediaLibrary.saveToLibraryAsync(route.params.videoUrl);
        navigation.navigate(routes.FEED);
        // setNewFeedItem(res);
      })
      .catch((err) => {
        alert(err);
        setRequestRunning(false);
      });
  };

  if (requestRunning) {
    return (
      <View style={styles.uploadingContainer}>
        <LottieView
          style={{ width: "80%", aspectRatio: 1 }}
          source={lottieAnimation}
          autoPlay={true}
          loop={true}
        />
        <View style={styles.movieImageContainer}>
          <Image source={phlokkLogo} style={styles.logoContainer} />
          <Text style={styles.uploadText}>Uploading...</Text>
        </View>

        <CustomActivityIndicator />
      </View>
    );
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <PostNavBar style={styles.postContainer} title="Post" />
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={styles.formContainer}>
              <TextInput
                style={styles.inputText}
                maxLength={150}
                multiline
                onChangeText={(text) => setDescription(text)}
                placeholderTextColor={colors.white}
                placeholder="Description: 0/150"
              />
              <Image
                style={styles.mediaPreview}
                source={{ uri: route.params.videoThumb }}
              />
              <CustomAlert
                customAlertMessage={<Text>Select cover{"\n"}coming soon!</Text>}
                positiveBtn="Ok"
                modalVisible={isSelectedImage}
                dismissAlert={setIsSelectedImage}
                animationType="fade"
              />
              <Pressable
                onPress={() => setIsSelectedImage(true)}
                style={styles.coverSelectView}
              >
                <Text style={styles.coverSelect}>Select cover</Text>
              </Pressable>
            </View>
            <Text style={styles.switchStatement}>
              Notice: Switches do not work in beta
            </Text>

            <CustomSwitch />
          </ScrollView>
        </View>

        <View style={styles.shareContainer}>
          <TouchableOpacity>
            <Feather style={styles.shareIcon} name="message-circle" size={35} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather
              style={styles.shareIcon}
              // onPress={instagramUser}
              name="instagram"
              size={35}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <CustomAlert
            customAlertMessage={<Text>Drafts{"\n"}coming soon!</Text>}
            positiveBtn="Ok"
            modalVisible={drafts}
            dismissAlert={setDrafts}
            animationType="fade"
          />
          <TouchableOpacity
            // onPress={() => navigation.navigate(routes.DRAFTS)}
            onPress={() => setDrafts(true)}
            style={styles.draftsButton}
          >
            <Feather name="inbox" size={20} color={colors.white} />
            <Text style={styles.draftsButtonText}>Drafts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSavePost()}
            style={styles.postButton}
          >
            <MaterialIcons
              name="file-upload"
              size={24}
              color={colors.secondary}
            />
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 10 : 30,
    backgroundColor: colors.primary,
  },
  uploadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  fieldItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    fontSize: 12,
  },
  postRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  marketRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    width: "70%",
  },
  fieldValueContainer: {
    marginRight: 10,
  },
  spacer: {
    flex: 1,
  },
  formContainer: {
    margin: 20,
    flexDirection: "row",
    padding: 10,
    borderColor: colors.secondary,
    borderWidth: 0.8,
    borderRadius: 7,
  },
  buttonsContainer: {
    flexDirection: "row",
    margin: 20,
    bottom: 20,
  },
  movieImageContainer: {
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  inputText: {
    paddingVertical: 10,
    marginRight: 20,
    flex: 1,
    color: colors.white,
  },
  uploadText: {
    color: colors.white,
    marginBottom: 30,
    fontSize: 20,
    fontWeight: "600",
  },
  mediaPreview: {
    backgroundColor: colors.black,
    width: 80,
    height: 60 * (16 / 9),
  },
  draftsButton: {
    alignItems: "center",
    flex: 1,
    borderColor: colors.white,
    borderWidth: 0.5,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 4,
    marginRight: 10,
  },
  postButton: {
    alignItems: "center",
    flex: 1,
    borderColor: colors.green,
    borderWidth: 0.5,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 4,
    marginRight: 10,
  },
  draftsButtonText: {
    marginLeft: 5,
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
  },
  postButtonText: {
    marginLeft: 5,
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
  },
  movieIcon: {
    marginBottom: 30,
  },
  shareContainer: {
    flexDirection: "row",
    top: 30,
  },
  shareIcon: {
    color: colors.secondary,
    marginLeft: 20,
    marginBottom: 50,
    opacity: 0.7,
  },
  settingsText: {
    color: colors.white,
    fontSize: 12,
    marginLeft: 20,
    marginHorizontal: 8,
  },
  lottieContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  switchStatement: {
    color: colors.green,
    textAlign: "center",
  },
  coverSelect: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 8,
    color: colors.white,
  },
  coverSelectView: {
    justifyContent: "center",
    textAlign: "center",
    height: 20,
    width: 80,
    position: "absolute",
    top: 98,
    bottom: 0,
    right: 10,
    backgroundColor: colors.black,
  },
});
