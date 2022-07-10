import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useIsFocused, useFocusEffect } from "@react-navigation/native";
import routes from "../../../navigation/routes";
import colors from "../../../../config/colors";
import FormData from "form-data";
import { fetchUserData } from "../../../redux/actions/users";
import * as SecureStore from "expo-secure-store";
// import { useFocusEffect } from "@react-navigation/native";
import { useAtom } from "jotai";
import { userAtom } from "../../../../../App";
import EditProfileNav from "../../../components/general/navBar/editProfile";

export default function EditProfileScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [image, setImage] = useState(null);

  const [user, setUser] = useAtom(userAtom);
  





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


    let split = result.uri.split('/');
    let fileName = split[(split.length - 1)];


    const formData = new FormData();
    formData.append("photo_url", {
      name: fileName,
      uri: result.uri,
      type: "image/*",
    });

    let res = await fetch("https://dev-api.phlokk.com/api/me/profile-picture", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
        ContentType: "application/json",
      }
    }).then((resp) => {
      alert('Profile picture updated successfully.');
    })
    .catch((err) => {
      alert('Unable to update profile picture. Please try again later.')
    });

  };

  return (
    <SafeAreaView style={styles.container}>
      <EditProfileNav
        title="Edit Profile"
        leftButton={{ display: false }}
      />
      <View style={styles.imageContainer}>
        {user.photo_url !== null ? (
          <TouchableOpacity
            style={styles.imageViewContainer}
            onPress={() => chooseImage()}
          >
                <Image
                  style={styles.image}
                  source={{ uri: image ? image : user.photo_url }}
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
              source={require("../../../../assets/userImage.png")}
            />
            <View style={styles.imageOverlay} />
            <Feather name="camera" size={26} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.fieldsContainer}>
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
                <Text style={styles.text}>
                  {user.username}
                </Text>
                <Feather name="chevron-right" size={28} color={colors.white} />
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
                <Feather name="chevron-right" size={28} color={colors.white} />
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
                <Feather name="chevron-right" size={28} color={colors.white} />
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
                <Feather name="chevron-right" size={28} color={colors.white} />
              </View>
            </TouchableOpacity>

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
              <Text style={styles.text}>Bio</Text>
              <View style={styles.fieldValueContainer}>
                <Text numberOfLines={1} style={styles.text}>
                  {user.bio}
                </Text>
                <Feather name="chevron-right" size={28} color={colors.white} />
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
                <Feather name="chevron-right" size={28} color={colors.white} />
              </View>
            </TouchableOpacity>

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
                    size={28}
                    color={colors.white}
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
                  <Text numberOfLines={1} style={styles.authText}>
                    Add Instagram Account
                  </Text>
                  <Feather
                    name="chevron-right"
                    size={28}
                    color={colors.white}
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
    color: colors.green,
    fontSize: 12,
  },
  authText: {
    color: colors.white,
  },
  socialText: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 13,
    marginTop: 60,
    fontWeight: "600",
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "lightgray",
  },
});
