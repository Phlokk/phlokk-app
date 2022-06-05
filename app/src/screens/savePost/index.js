import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
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
  Switch,
  StyleSheet,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/actions";
import PostNavBar from "../../components/general/postNav";

import routes from "../../navigation/routes";
import colors from "../../../config/colors";
import LottieView from "lottie-react-native";

export default function SavePostScreen({ nav, route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [requestRunning, setRequestRunning] = useState(false);
  const lottieAnimation = require("../../../assets/animations/loader.json");
  const phlokkLogo = require("../../../assets/phlokk_logo.png");
  
  // switches setState
  const [isPublicEnabled, setIsPublicEnabled] = useState(false);
  const [isPrivateEnabled, setIsPrivateEnabled] = useState(false);
  const [isMarketEnabled, setIsMarketEnabled] = useState(false);
  const [isCommentsEnabled, setIsCommentsEnabled] = useState(false);
  const [isDuetsEnabled, setIsDuetsEnabled] = useState(false);
  const [isReviewsEnabled, setIsReviewsEnabled] = useState(false);
  const [text, setText] = useState("Click");

  const handleSavePost = () => {
    setRequestRunning(true);

    // Save video to camera Roll...

    // MediaLibrary = async (uri) => {
    //   await MediaLibrary.saveToLibraryAsync(uri, 'video')
    //   }
    // answer link: https://stackoverflow.com/questions/59602848/how-to-save-image-to-camera-roll-using-expo

    dispatch(
      createPost(
        description,
        route.params.source,
        route.params.sourceThumb,
        route.params.source
      )
    )
      .then((res) => {
        console.log("res", res);
        // MediaLibrary = async (uri) => {
        //   await MediaLibrary.saveToLibraryAsync(uri, 'video')
        //   }
        navigation.navigate("feed");
      })
      .catch((err) => {
        alert(err);
        setRequestRunning(false);
      });
  };


  const togglePublic = () => {
    if (isPublicEnabled) {
      setText("Inactive");
    } else {
      setText("Active");
    }
    setIsPublicEnabled((previousState) => !previousState);
  };

  const togglePrivate = () => {
    if (isPrivateEnabled) {
      setText("Inactive");
    } else {
      setText("Active");
    }
    setIsPrivateEnabled((previousState) => !previousState);
  };

  const toggleMarket = () => {
    if (isMarketEnabled) {
      setText("Inactive");
    } else {
      setText("Active");
    }
    setIsMarketEnabled((previousState) => !previousState);
  };

  const toggleComments = () => {
    if (isCommentsEnabled) {
      setText("Inactive");
    } else {
      setText("Active");
    }
    setIsCommentsEnabled((previousState) => !previousState);
  };

  const toggleDuets = () => {
    if (isDuetsEnabled) {
      setText("Inactive");
    } else {
      setText("Active");
    }
    setIsDuetsEnabled((previousState) => !previousState);
  };

  const toggleReviews = () => {
    if (isReviewsEnabled) {
      setText("Inactive");
    } else {
      setText("Active");
    }
    setIsReviewsEnabled((previousState) => !previousState);
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

        <ActivityIndicator color={colors.green} size="large" />
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
        <View style={styles.formContainer}>
          <TextInput
            style={styles.inputText}
            maxLength={150}
            multiline
            onChangeText={(text) => setDescription(text)}
            placeholderTextColor={"gray"}
            placeholder="Description: 0/150"
          />
          <Image
            style={styles.mediaPreview}
            source={{ uri: route.params.sourceThumb }}
          />
        </View>

        <View style={styles.fieldsContainer}>
          <View style={styles.postRowContainer}>
            <View
              style={styles.fieldItemContainer}
              autoCapitalize="none"
              // onPress={() =>
              //   navigation.navigate("editUserPost", {
              //     title: "Edit post",
              //   })
              // }
            >
              <Text style={styles.settingsText}>
                <Octicons
                  style={styles.icons}
                  name="globe"
                  size={12}
                  color={colors.white}
                />{" "}
                Post Public
              </Text>
              <View style={styles.fieldValueContainer}>
                <Switch
                  style={styles.switch}
                  trackColor={{ false: "grey", true: colors.green }}
                  thumbColor={isPublicEnabled ? "f4f3f4" : "f4f3f4"}
                  onValueChange={togglePublic}
                  value={isPublicEnabled}
                />
              </View>
            </View>
            <View
              style={styles.fieldItemContainer}
              autoCapitalize="none"
              // onPress={() =>
              //   navigation.navigate("editUserPost", {
              //     title: "Edit post",
              //   })
              // }
            >
              <Text style={styles.settingsText}>
                <FontAwesome name="lock" size={14} color={colors.white} /> Post
                Private
              </Text>
              <View style={styles.fieldValueContainer}>
                <Switch
                  style={styles.switch}
                  trackColor={{ false: "grey", true: colors.green }}
                  thumbColor={isPrivateEnabled ? "f4f3f4" : "f4f3f4"}
                  onValueChange={togglePrivate}
                  value={isPrivateEnabled}
                />
              </View>
            </View>
          </View>
          <View style={styles.commentRowContainer}>
            <View
              style={styles.fieldItemContainer}
              autoCapitalize="none"
              // onPress={() =>
              //   navigation.navigate("editUserPost", {
              //     title: "Edit post",
              //   })
              // }
            >
              <Text style={styles.settingsText}>
                <Feather
                  style={styles.shareIcon}
                  name="message-circle"
                  size={12}
                  color={colors.white}
                />{" "}
                Comments
              </Text>
              <View style={styles.fieldValueContainer}>
                <Switch
                  style={styles.switch}
                  trackColor={{ false: "grey", true: colors.green }}
                  thumbColor={isCommentsEnabled ? "f4f3f4" : "f4f3f4"}
                  onValueChange={toggleComments}
                  value={isCommentsEnabled}
                />
              </View>
            </View>

            <View
              style={styles.fieldItemContainer}
              autoCapitalize="none"
              // onPress={() =>
              //   navigation.navigate("editUserPost", {
              //     title: "Edit post",
              //   })
              // }
            >
              <Text style={styles.settingsText}>
                <MaterialCommunityIcons
                  name="account-box-multiple-outline"
                  size={13}
                  color={colors.white}
                />{" "}
                Duets ON
              </Text>
              <View style={styles.fieldValueContainer}>
                <Switch
                  style={styles.switch}
                  trackColor={{ false: "grey", true: colors.green }}
                  thumbColor={isDuetsEnabled ? "f4f3f4" : "f4f3f4"}
                  onValueChange={toggleDuets}
                  value={isDuetsEnabled}
                />
              </View>
            </View>
          </View>
          <View style={styles.marketRowContainer}>
            <View
              style={styles.fieldItemContainer}
              autoCapitalize="none"
              // onPress={() =>
              //   navigation.navigate("editUserPost", {
              //     title: "Edit post",
              //   })
              // }
            >
              <Text style={styles.settingsText}>
                <Entypo name="shop" size={12} color={colors.white} />
                Post Market
              </Text>
              <View style={styles.fieldValueContainer}>
                <Switch
                  style={styles.switch}
                  trackColor={{ false: "grey", true: colors.green }}
                  thumbColor={isMarketEnabled ? "f4f3f4" : "f4f3f4"}
                  onValueChange={toggleMarket}
                  value={isMarketEnabled}
                />
              </View>
            </View>
            <View
              style={styles.fieldItemContainer}
              autoCapitalize="none"
              // onPress={() =>
              //   navigation.navigate("editUserPost", {
              //     title: "Edit post",
              //   })
              // }
            >
              <Text style={styles.settingsText}>
                <Entypo name="shop" size={12} color={colors.white} /> Reviews
              </Text>
              <View style={styles.fieldValueContainer}>
                <Switch
                  style={styles.switch}
                  trackColor={{ false: "grey", true: colors.green }}
                  thumbColor={isReviewsEnabled ? "f4f3f4" : "f4f3f4"}
                  onValueChange={toggleReviews}
                  value={isReviewsEnabled}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.spacer} />
        <View style={styles.shareContainer}>
          <TouchableOpacity>
            <Feather
              style={styles.shareIcon}
              name="message-circle"
              size={35}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather
              style={styles.shareIcon}
              // onPress={instagramUser}
              name="instagram"
              size={35}
              color={colors.purple}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            // onPress={() => navigation.navigate(routes.DRAFTS)}
            onPress={() => Alert.alert("Drafts", "Coming in Beta version 3")}
            style={styles.draftsButton}
          >
            <Feather name="inbox" size={20} color={colors.white} />
            <Text style={styles.draftsButtonText}>Drafts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSavePost()}
            style={styles.postButton}
          >
            <MaterialIcons name="file-upload" size={24} color="white" />
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
    paddingTop: 30,
    backgroundColor: colors.primary,
  },
  uploadingContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
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
  },
  buttonsContainer: {
    flexDirection: "row",
    margin: 20,
    bottom: 10,
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
    // aspectRatio: 9 / 16,
    backgroundColor: colors.black,
    width: 60,
    height: 60 * (16 / 9),
  },
  draftsButton: {
    alignItems: "center",
    flex: 1,
    borderColor: colors.white,
    borderWidth: 1,
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
    backgroundColor: colors.green,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 4,
    marginRight: 10,
  },
  draftsButtonText: {
    marginLeft: 5,
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  postButtonText: {
    marginLeft: 5,
    color: colors.white,
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
    color: colors.white,
    marginLeft: 20,
    marginBottom: 50,
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
});
