import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { saveUserProfileImage } from "../../../services/user";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import NavBarGeneral from "../../../../src/components/general/navBar";

import routes from "../../../navigation/routes";
import colors from "../../../../config/colors";


export default function EditProfileScreen() {
  const auth = useSelector((state) => state.auth);
  const navigation = useNavigation();

  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      saveUserProfileImage(result.uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBarGeneral />
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.imageViewContainer}
          onPress={() => chooseImage()}
        >
          <Image
            style={styles.image}
            source={{ uri: auth.currentUser.photo_url }}
          />
          <View style={styles.imageOverlay} />
          <Feather name="camera" size={26} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.fieldsContainer}>
        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          onPress={() =>
            navigation.navigate(routes.EDIT_PROFILE_FIELD, {
              title: "Username",
              field: "username",
              value: auth.currentUser.username,
            })
          }
        >
          <Text numberOfLines={1} style={styles.text}>
            Username
          </Text>
          <View style={styles.fieldValueContainer}>
            <Text style={styles.text}>{auth.currentUser.username}</Text>
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
              value: auth.currentUser.creator_type,
            })
          }
        >
          <Text style={styles.text}>Creator</Text>
          <View style={styles.fieldValueContainer}>
            <Text numberOfLines={1} style={styles.text}>
              {auth.currentUser.creator_type}
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
              value: auth.currentUser.link,
            })
          }
        >
          <Text style={styles.text}>Website</Text>
          <View style={styles.fieldValueContainer}>
            <Text numberOfLines={1} style={styles.text}>
              {auth.currentUser.link}
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
              value: auth.currentUser.relationship_type,
            })
          }
        >
          <Text style={styles.text}>Relationship</Text>
          <View style={styles.fieldValueContainer}>
            <Text numberOfLines={1} style={styles.text}>
              {auth.currentUser.relationship_type}
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
              field: "youtubeLink",
              value: auth.currentUser.youtubeLink,
            })
          }
        >
          <Text style={styles.text}>Youtube</Text>
          {auth.currentUser.youtubeLink === null  ? (
          <View style={styles.fieldValueContainer}>
            <Text numberOfLines={1} style={styles.text}>
              Add Youtube Channel
            </Text>
            <Feather name="chevron-right" size={28} color={colors.white} />
          </View>
          ):(
          <View>
            <Text numberOfLines={1} style={styles.text}>  
            </Text>
            <Feather name="check-circle" size={16} color={colors.greenCheck} />
          </View>
          )}

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fieldItemContainer}
          autoCapitalize="none"
          onPress={() =>
            navigation.navigate(routes.INSTAGRAM_LINK, {
              title: "Instagram",
              field: "instagramLink",
              value: auth.currentUser.instagramLink,
            })
          }
        >
          <Text style={styles.text}>Instagram</Text>
          {auth.currentUser.instagramLink === null  ? (
          <View style={styles.fieldValueContainer}>
            <Text numberOfLines={1} style={styles.authText}>
              Add Instagram Account
            </Text>
            <Feather name="chevron-right" size={28} color={colors.white} />
          </View>
          ):(
          <View>
            <Text numberOfLines={1} style={styles.authText}>  
            </Text>
            <Feather name="check-circle" size={16} color={colors.greenCheck} />
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
    color: colors.white,
    fontSize: 12,
  },
  authText: {
    color: colors.white,
  },
  socialText: {
    color: colors.secondary,
    fontSize: 13,
    marginTop: 60,
    fontWeight: "600",
  },
});
