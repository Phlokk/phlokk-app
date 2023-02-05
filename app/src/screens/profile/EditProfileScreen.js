import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import routes from "../../navigation/routes";
import colors from "../../../config/colors";
import FormData from "form-data";
import { useAtom } from "jotai";
import { userAtom } from "../../services/appStateAtoms";
import EditProfileNav from "../../components/general/navBar/EditProfileNav";
import CustomAlert from "../../components/Alerts/CustomAlert";
import { fetchGetUser } from "../../redux/sagas/requests/fetchUser";
import { useTheme } from "../../theme/context";
import { apiUrls } from "../../globals";
import SpecialNeedsRibbonSwitch from "./SpecialNeedsRibbonSwitch";

export default function EditProfileScreen({ route }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  const [isBrandingVideo, setIsBrandingVideo] = useState(false);

  const passedUser = route?.params?.user;

  const [currentUser, setCurrentUser] = useAtom(userAtom);

  const user = passedUser?._id === currentUser._id ? currentUser : passedUser;




  const chooseImage = async () => {
    let user = await SecureStore.getItemAsync("user");
    user = JSON.parse(user);

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    } 

    let split = result.uri.split("/");
    let fileName = split[split.length - 1];

    const formData = new FormData();
    formData.append("photo_url", {
      name: fileName,
      uri: result.uri,
      type: "image/*",
    });

    let res = await fetch(apiUrls.BASE_URL + "/api/me/profile-picture", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
        ContentType: "application/json",
      },
    })
      .then((res) => {
        alert("Profile picture updated successfully.");
      })
      .catch((err) => {
        alert("Unable to update profile picture. Please try again later.");
      });

    // Once image is updated, load user profile from api
    const response = await fetchGetUser();
    setCurrentUser(response.user);
  };

  return (
    <SafeAreaView
      style={theme == "light" ? styles.container_light : styles.container_dark}
    >
      <EditProfileNav />
      <ScrollView>
        <View style={styles.imageRow}>
        <View style={styles.imageContainer}>
          {currentUser.photo_thumb_url !== null ? (
            <TouchableOpacity
              style={styles.imageViewContainer}
              onPress={() => chooseImage()}
            >
              <Image
                style={styles.image}
                source={{ uri: image ? image : currentUser.photo_thumb_url }}
                cache="only-if-cached"
              />

              <View style={styles.imageOverlay} />

              <Feather name="camera" size={26} style={styles.icon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.imageViewContainer}
              onPress={() => chooseImage()}
            >
              <Image
                style={styles.image}
                source={require("../../../assets/userImage.png")}
              />
              <View style={styles.imageOverlay} />
              <Feather name="camera" size={26} color={colors.secondary} />
            </TouchableOpacity>
          )}
          <View style={styles.mediaRow}>
          <Text style={[theme == "light" ? styles.text_light : styles.text_dark, styles.imageRowText]}>Change photo</Text>
          </View>
          
        </View>


        <View style={styles.imageContainer}>
          {currentUser.photo_thumb_url !== null ? (
            <TouchableOpacity
              style={styles.imageViewContainer}
              onPress={() => setIsBrandingVideo(true)}
            >
              <Image
                style={styles.image}
                source={{ uri: image ? image : currentUser.photo_thumb_url }}
                cache="only-if-cached"
              />

              <View style={styles.imageOverlay} />

              <Feather name="video" size={26} style={styles.icon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.imageViewContainer}
              onPress={() => setIsBrandingVideo(true)}
            >
              <View style={styles.imageOverlay} />
              <Feather name="video" size={26} color={colors.secondary} />
            </TouchableOpacity>
          )}
          <View style={styles.mediaRow}>
          <Text style={[theme == "light" ? styles.text_light : styles.text_dark, styles.imageRowText]}>Change video</Text>
          </View>
        </View>
        </View>

        <View style={styles.fieldsContainer}>
          <Text
            style={
              theme == "light"
                ? styles.socialText_light
                : styles.socialText_dark
            }
          >
            Profile Info
          </Text>
          <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
            onPress={() =>
              navigation.navigate(routes.EDIT_PROFILE_FIELD, {
                title: "Username",
                field: "username",
                value: currentUser.username,
              })
            }
          >
            <Text
              numberOfLines={1}
              style={theme == "light" ? styles.text_light : styles.text_dark}
            >
              Username
            </Text>
            <View style={styles.fieldValueContainer}>
              <Text
                style={theme == "light" ? styles.text_light : styles.text_dark}
              >
                {currentUser.username}
              </Text>
              <Feather
                name="chevron-right"
                size={20}
                style={
                  theme == "light" ? styles.chevron_light : styles.chevron_dark
                }
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
            onPress={() =>
              navigation.navigate(routes.CREATOR, {
                title: "Creator",
                field: "Creator",
                value: currentUser.creator_type,
              })
            }
          >
            <Text
              style={theme == "light" ? styles.text_light : styles.text_dark}
            >
              Creator
            </Text>
            <View style={styles.fieldValueContainer}>
              <Text
                numberOfLines={1}
                style={theme == "light" ? styles.text_light : styles.text_dark}
              >
                {currentUser.creator_type}
              </Text>
              <Feather
                name="chevron-right"
                size={20}
                style={
                  theme == "light" ? styles.chevron_light : styles.chevron_dark
                }
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
            onPress={() =>
              navigation.navigate(routes.LINK, {
                title: "Link",
                field: "link",
                value: currentUser.link,
              })
            }
          >
            <Text
              style={theme == "light" ? styles.text_light : styles.text_dark}
            >
              Website
            </Text>
            <View style={styles.fieldValueContainer}>
              <Text
                numberOfLines={1}
                style={theme == "light" ? styles.text_light : styles.text_dark}
              >
                {currentUser.link}
              </Text>
              <Feather
                name="chevron-right"
                size={20}
                style={
                  theme == "light" ? styles.chevron_light : styles.chevron_dark
                }
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
            onPress={() =>
              navigation.navigate(routes.QUOTES, {
                title: "Quotes",
                field: "quotes",
                value: currentUser.quote,
              })
            }
          >
            <Text
              style={theme == "light" ? styles.text_light : styles.text_dark}
            >
              Quote
            </Text>
            <View style={styles.fieldValueContainer}>
              <Text
                numberOfLines={1}
                style={theme == "light" ? styles.text_light : styles.text_dark}
              >
                {currentUser.quote}
              </Text>
              <Feather
                name="chevron-right"
                size={20}
                style={
                  theme == "light" ? styles.chevron_light : styles.chevron_dark
                }
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
            onPress={() =>
              navigation.navigate(routes.RELATIONSHIP, {
                title: "Relationship",
                field: "relationship",
                value: currentUser.relationship_type,
              })
            }
          >
            <Text
              style={theme == "light" ? styles.text_light : styles.text_dark}
            >
              Status
            </Text>
            <View style={styles.fieldValueContainer}>
              <Text
                numberOfLines={1}
                style={theme == "light" ? styles.text_light : styles.text_dark}
              >
                {currentUser.relationship_type}
              </Text>
              <Feather
                name="chevron-right"
                size={20}
                style={
                  theme == "light" ? styles.chevron_light : styles.chevron_dark
                }
              />
            </View>
          </TouchableOpacity>
          
          {currentUser.is_special_needs !== true && (
          <TouchableOpacity style={styles.fieldItemContainer}>
            <Text
              style={theme == "light" ? styles.text_light : styles.text_dark}
            >
              Show Disability Ribbon
            </Text>
            <View style={styles.fieldValueContainer}>
            <SpecialNeedsRibbonSwitch />
              
            </View>
          </TouchableOpacity>
          )}



          {/* PROFILE BIO SECTION */}

          <Text
            style={
              theme == "light"
                ? styles.socialText_light
                : styles.socialText_dark
            }
          >
            Bio
          </Text>
          <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
            onPress={() =>
              navigation.navigate(routes.BIO, {
                title: "Bio",
                field: "bio",
                value: currentUser.bio,
              })
            }
          >
            <Text
              style={theme == "light" ? styles.text_light : styles.text_dark}
            >
              Profile Bio
            </Text>
            {currentUser.bio === null || undefined ? (
              <View style={styles.fieldValueContainer}>
                <Text
                  numberOfLines={1}
                  style={
                    theme == "light" ? styles.text_light : styles.text_dark
                  }
                >
                  Add Bio
                </Text>
                <Feather
                  name="chevron-right"
                  size={20}
                  style={
                    theme == "light"
                      ? styles.chevron_light
                      : styles.chevron_dark
                  }
                />
              </View>
            ) : (
              <View>
                <Text
                  numberOfLines={1}
                  style={
                    theme == "light" ? styles.text_light : styles.text_dark
                  }
                ></Text>
                <FontAwesome
                  name="pencil-square-o"
                  size={16}
                  style={
                    theme == "light"
                      ? styles.chevron_light
                      : styles.chevron_dark
                  }
                />
              </View>
            )}
          </TouchableOpacity>
           <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
            onPress={() =>
              navigation.navigate(routes.SKILLS, {
                title: "Skills",
                field: "skills",
                value: currentUser.skills,
              })
            }
          >
            <Text style={theme == "light"
                ? styles.text_light
                : styles.text_dark}>Skills</Text>
            {currentUser.skills === null || undefined ? (
              <View style={styles.fieldValueContainer}>
                <Text numberOfLines={1} style={theme == "light"
                ? styles.text_light
                : styles.text_dark}>
                  Add Skills
                </Text>
                <Feather
                  name="chevron-right"
                  size={20}
                  style={theme == "light" ? styles.chevron_light : styles.chevron_dark}
                />
              </View>
            ) : (
              <View>
                <Text numberOfLines={1} style={theme == "light"
                ? styles.text_light
                : styles.text_dark}></Text>
                <FontAwesome
                  name="pencil-square-o"
                  size={16}
                  style={theme == "light" ? styles.chevron_light : styles.chevron_dark}
                />
              </View>
            )}
          </TouchableOpacity> 
           <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
            onPress={() =>
              navigation.navigate(routes.EDUCATION, {
                title: "Education",
                field: "education",
                value: currentUser.education,
              })
            }
          >
            <Text style={theme == "light"
                ? styles.text_light
                : styles.text_dark}>Education</Text>
            {currentUser.education === null || undefined ? (
              <View style={styles.fieldValueContainer}>
                <Text numberOfLines={1} style={theme == "light"
                ? styles.text_light
                : styles.text_dark}>
                  Add Education
                </Text>
                <Feather
                  name="chevron-right"
                  size={20}
                  style={theme == "light" ? styles.chevron_light : styles.chevron_dark}
                />
              </View>
            ) : (
              <View>
                <Text numberOfLines={1} style={theme == "light"
                ? styles.text_light
                : styles.text_dark}></Text>
                <FontAwesome
                  name="pencil-square-o"
                  size={16}
                  style={theme == "light" ? styles.chevron_light : styles.chevron_dark}
                />
              </View>
            )}
          </TouchableOpacity> 

          <Text
            style={
              theme == "light"
                ? styles.socialText_light
                : styles.socialText_dark
            }
          >
            Social Media
          </Text>
          <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
            onPress={() =>
              navigation.navigate(routes.YOUTUBE_LINK, {
                title: "Youtube",
                field: "youtube_link",
                value: currentUser.youtube_link,
              })
            }
          >
            <Text
              style={theme == "light" ? styles.text_light : styles.text_dark}
            >
              Youtube
            </Text>
            {currentUser.youtube_link === null ? (
              <View style={styles.fieldValueContainer}>
                <Text
                  numberOfLines={1}
                  style={
                    theme == "light" ? styles.text_light : styles.text_dark
                  }
                >
                  Add Youtube Channel
                </Text>
                <Feather
                  name="chevron-right"
                  size={20}
                  style={
                    theme == "light"
                      ? styles.chevron_light
                      : styles.chevron_dark
                  }
                />
              </View>
            ) : (
              <View>
                <Text
                  numberOfLines={1}
                  style={
                    theme == "light" ? styles.text_light : styles.text_dark
                  }
                ></Text>
                <Feather name="check-circle" size={16} color={colors.green} />
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
            onPress={() =>
              navigation.navigate(routes.INSTAGRAM_LINK, {
                title: "Instagram",
                field: "instagram_link",
                value: currentUser.instagram_link,
              })
            }
          >
            <Text
              style={theme == "light" ? styles.text_light : styles.text_dark}
            >
              Instagram
            </Text>
            {currentUser.instagram_link === null ? (
              <View style={styles.fieldValueContainer}>
                <Text
                  numberOfLines={1}
                  style={
                    theme == "light" ? styles.text_light : styles.text_dark
                  }
                >
                  Add Instagram Account
                </Text>
                <Feather
                  name="chevron-right"
                  size={20}
                  style={
                    theme == "light"
                      ? styles.chevron_light
                      : styles.chevron_dark
                  }
                />
              </View>
            ) : (
              <View>
                <Text numberOfLines={1} style={styles.authText}></Text>
                <Feather name="check-circle" size={16} color={colors.green} />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <CustomAlert
            alertTitle={
              <Text>
                <MaterialIcons name="info" size={24} color={colors.green} />
              </Text>
            }
            customAlertMessage={<Text>Intro Video{"\n"}coming soon!</Text>}
            positiveBtn="Ok"
            modalVisible={isBrandingVideo}
            dismissAlert={setIsBrandingVideo}
            animationType="fade"
          />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container_light: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container_dark: {
    flex: 1,
    backgroundColor: colors.black,
  },
  imageContainer: {
    marginHorizontal: 40,
    alignItems: "center",
    marginTop: 20,
  },
  imageViewContainer: {
    backgroundColor: "gray",
    height: 80,
    width: 80,
    borderRadius: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 80,
    width: 80,
    position: "absolute",
  },
  imageOverlay: {
    backgroundColor: "rgba(0,0,0, 0.8)",
    ...StyleSheet.absoluteFill,
  },

  fieldsContainer: {
    marginTop: 20,
    padding: 20,
    flex: 1,
  },
  fieldItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    fontSize: 12,
  },
  fieldValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text_light: {
    color: colors.black,
    fontSize: 12,
    opacity: 0.8,
  },
  text_dark: {
    color: colors.secondary,
    fontSize: 12,
    opacity: 0.8,
  },
  authText: {
    color: colors.white,
  },
  socialText_light: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 13,
    marginTop: 60,
  },
  socialText_dark: {
    color: colors.green,
    fontWeight: "bold",
    fontSize: 13,
    marginTop: 60,
  },
  chevron_light: {
    color: colors.black,
  },
  chevron_dark: {
    color: colors.secondary,
    opacity: 0.6,
  },
  imageRow: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",

  },
  imageRowText: {
    fontSize: 10, 
  },
  mediaRow: {
  marginTop: 20, 
  },
  icon: {
    color: colors.secondary,
    opacity: 0.8,
  },
});
