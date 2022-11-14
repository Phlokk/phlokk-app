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
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import routes from "../../navigation/routes";
import colors from "../../../config/colors";
import FormData from "form-data";
import { useAtom } from "jotai";
import { userAtom } from "../../../../App";
import EditProfileNav from "../../components/general/navBar/EditProfileNav";
import { fetchGetUsers } from "../../redux/sagas/requests/fetchUsers";

import { apiUrls } from "../../globals";

export default function EditProfileScreen({ route }) {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

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
    const response = await fetchGetUsers();
    setCurrentUser(response.user);
  };

  return (
    <SafeAreaView style={styles.container}>
      <EditProfileNav title="Edit Profile" leftButton={{ display: false }} />
      <ScrollView>
        <View style={styles.imageContainer}>
          {user.photo_thumb_url !== null ? (
            <TouchableOpacity
              style={styles.imageViewContainer}
              onPress={() => chooseImage()}
            >
              <Image
                style={styles.image}
                source={{ uri: image ? image : user.photo_thumb_url }}
                cache="only-if-cached"
              />

              <View style={styles.imageOverlay} />

              <Feather name="camera" size={26} color={colors.white} />
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
              <Feather name="camera" size={26} color={colors.white} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.fieldsContainer}>
          <Text style={styles.socialText}>Profile Info</Text>
          <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
            onPress={() =>
              navigation.navigate(routes.EDIT_PROFILE_FIELD, {
                title: "Username",
                field: "username",
                value: user.username,
              })
            }
          >
            <Text numberOfLines={1} style={styles.text}>
              Username
            </Text>
            <View style={styles.fieldValueContainer}>
              <Text style={styles.text}>{user.username}</Text>
              <Feather
                name="chevron-right"
                size={20}
                color={colors.secondary}
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
                value: user.creator_type,
              })
            }
          >
            <Text style={styles.text}>Creator</Text>
            <View style={styles.fieldValueContainer}>
              <Text numberOfLines={1} style={styles.text}>
                {user.creator_type}
              </Text>
              <Feather
                name="chevron-right"
                size={20}
                color={colors.secondary}
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
                value: user.link,
              })
            }
          >
            <Text style={styles.text}>Website</Text>
            <View style={styles.fieldValueContainer}>
              <Text numberOfLines={1} style={styles.text}>
                {user.link}
              </Text>
              <Feather
                name="chevron-right"
                size={20}
                color={colors.secondary}
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
                value: user.quote,
              })
            }
          >
            <Text style={styles.text}>Quote</Text>
            <View style={styles.fieldValueContainer}>
              <Text numberOfLines={1} style={styles.text}>
                {user.quote}
              </Text>
              <Feather
                name="chevron-right"
                size={20}
                color={colors.secondary}
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
                value: user.relationship_type,
              })
            }
          >
            <Text style={styles.text}>Status</Text>
            <View style={styles.fieldValueContainer}>
              <Text numberOfLines={1} style={styles.text}>
                {user.relationship_type}
              </Text>
              <Feather
                name="chevron-right"
                size={20}
                color={colors.secondary}
              />
            </View>
          </TouchableOpacity>

          {/* PROFILE BIO SECTION */}

          <Text style={styles.socialText}>Bio</Text>
          <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
            onPress={() =>
              navigation.navigate(routes.BIO, {
                title: "Bio",
                field: "bio",
                value: user.bio,
              })
            }
          >
            <Text style={styles.text}>Profile Bio</Text>
            {user.bio === null || undefined ? (
              <View style={styles.fieldValueContainer}>
                <Text numberOfLines={1} style={styles.text}>
                  Add Bio
                </Text>
                <Feather
                  name="chevron-right"
                  size={20}
                  color={colors.secondary}
                />
              </View>
            ) : (
              <View>
                <Text numberOfLines={1} style={styles.text}></Text>
                <FontAwesome
                  name="pencil-square-o"
                  size={16}
                  color={colors.secondary}
                />
              </View>
            )}
          </TouchableOpacity>
          {/* PROFILE SKILLS SECTION */}
          {/* <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
            onPress={() =>
              navigation.navigate(routes.SKILLS, {
                title: "Skills",
                field: "skills",
                value: user.skills,
              })
            }
          >
            <Text style={styles.text}>Skills</Text>
            {user.skills === null || undefined ? (
              <View style={styles.fieldValueContainer}>
                <Text numberOfLines={1} style={styles.text}>
                  Add Skills
                </Text>
                <Feather
                  name="chevron-right"
                  size={20}
                  color={colors.secondary}
                />
              </View>
            ) : (
              <View>
                <Text numberOfLines={1} style={styles.text}></Text>
                <FontAwesome
                  name="pencil-square-o"
                  size={16}
                  color={colors.secondary}
                />
              </View>
            )}
          </TouchableOpacity> */}
          {/* PROFILE EDUCATION SECTION */}
          {/* <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
            onPress={() =>
              navigation.navigate(routes.EDUCATION, {
                title: "Education",
                field: "education",
                value: user.education,
              })
            }
          >
            <Text style={styles.text}>Education</Text>
            {user.education === null || undefined ? (
              <View style={styles.fieldValueContainer}>
                <Text numberOfLines={1} style={styles.text}>
                  Add Education
                </Text>
                <Feather
                  name="chevron-right"
                  size={20}
                  color={colors.secondary}
                />
              </View>
            ) : (
              <View>
                <Text numberOfLines={1} style={styles.text}></Text>
                <FontAwesome
                  name="pencil-square-o"
                  size={16}
                  color={colors.secondary}
                />
              </View>
            )}
          </TouchableOpacity> */}

          <Text style={styles.socialText}>Social Media</Text>
          <TouchableOpacity
            style={styles.fieldItemContainer}
            autoCapitalize="none"
            onPress={() =>
              navigation.navigate(routes.YOUTUBE_LINK, {
                title: "Youtube",
                field: "youtube_link",
                value: user.youtube_link,
              })
            }
          >
            <Text style={styles.text}>Youtube</Text>
            {user.youtube_link === null ? (
              <View style={styles.fieldValueContainer}>
                <Text numberOfLines={1} style={styles.text}>
                  Add Youtube Channel
                </Text>
                <Feather
                  name="chevron-right"
                  size={20}
                  color={colors.secondary}
                />
              </View>
            ) : (
              <View>
                <Text numberOfLines={1} style={styles.text}></Text>
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
                value: user.instagram_link,
              })
            }
          >
            <Text style={styles.text}>Instagram</Text>
            {user.instagram_link === null ? (
              <View style={styles.fieldValueContainer}>
                <Text numberOfLines={1} style={styles.text}>
                  Add Instagram Account
                </Text>
                <Feather
                  name="chevron-right"
                  size={20}
                  color={colors.secondary}
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  imageViewContainer: {
    backgroundColor: "gray",
    height: 100,
    width: 100,
    borderRadius: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 100,
    width: 100,
    position: "absolute",
  },
  imageOverlay: {
    backgroundColor: "rgba(0,0,0, 0.5)",
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
  text: {
    color: colors.secondary,
    fontSize: 12,
    opacity: 0.8,
  },
  authText: {
    color: colors.white,
  },
  socialText: {
    color: colors.green,
    fontWeight: "bold",
    fontSize: 13,
    marginTop: 60,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "lightgray",
  },
});
