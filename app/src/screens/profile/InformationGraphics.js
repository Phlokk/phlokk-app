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
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import routes from "../../navigation/routes";
import colors from "../../../config/colors";
import FormData from "form-data";
import { useAtom } from "jotai";
import { userAtom } from "../../../../App";
import EditProfileNav from "../../components/general/navBar/EditProfileNav";
import { fetchGetUsers } from "../../redux/sagas/requests/fetchUsers";


import {apiUrls} from "../../globals";

export default function InformationGraphicsScreen({ route }) {
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
      <ScrollView>
        <View style={styles.imageContainer}>
            <Text style={styles.text}>Hello</Text>
          {/* {user.photo_thumb_url !== null ? (
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
          )} */}
        </View>

        <View style={styles.fieldsContainer}>
          {/* <Text style={styles.socialText}>Profile Info</Text> */}
                 
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
