import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import NavBarGeneral from "../../../../src/components/general/navBar";
import routes from "../../../navigation/routes";
import colors from "../../../../config/colors";
import FormData from "form-data";
import * as SecureStore from "expo-secure-store";
import { getUsers } from "../../../redux/actions/users";

// import axios from 'axios'

export default function EditProfileScreen() {

  // const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [image, setImage] = useState(null);


  useEffect(() => {
    dispatch(getUsers());
  }, [getUsers]);


  const chooseImage = async () => {
    console.log("START UPLOADING...");
    let user = await SecureStore.getItemAsync("user");
    user = JSON.parse(user);
    console.log(user.token);

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }

    const formData = new FormData();
    formData.append("photo_url", {
      name: "photo_url",
      uri: result.uri,
      type: "image/jpeg",
    });

    let res = await fetch("https://dev.phlokk.com/api/update-profile", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
        ContentType: "application/json",
      },
    }).catch((err) => {
      console.log(err);
    });

    console.log(formData)
    console.log('The status was',+ res.status);
    let test = await res.json();
    console.log(test);
    console.log("RESULT -------------------->");
    
  };


  return (
    <SafeAreaView style={styles.container}>
      <NavBarGeneral />
      <View style={styles.imageContainer}>
        {users.photo_url !== null ? (
          <TouchableOpacity
            style={styles.imageViewContainer}
            onPress={() => chooseImage()}
          >
            <Image
              style={styles.image}
              source={{ uri: image ? image : users.photo_url }}
            />
          
            <View style={styles.imageOverlay} />
            {/* <Text>{image ? 'Edit' : 'Upload'} Image</Text> */}
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
              value: users.username,
            })
          }
        >
          <Text numberOfLines={1} style={styles.text}>
            Username
          </Text>
          <View style={styles.fieldValueContainer}>
            <Text style={styles.text}>{users.username}</Text>
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
              value: users.creator_type,
            })
          }
        >
          <Text style={styles.text}>Creator</Text>
          <View style={styles.fieldValueContainer}>
            <Text numberOfLines={1} style={styles.text}>
              {users.creator_type}
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
              value: users.link,
            })
          }
        >
          <Text style={styles.text}>Website</Text>
          <View style={styles.fieldValueContainer}>
            <Text numberOfLines={1} style={styles.text}>
              {users.link}
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
              value: users.relationship_type,
            })
          }
        >
          <Text style={styles.text}>Relationship</Text>
          <View style={styles.fieldValueContainer}>
            <Text numberOfLines={1} style={styles.text}>
              {users.relationship_type}
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
              value: users.youtubeLink,
            })
          }
        >
          <Text style={styles.text}>Youtube</Text>
          {users.youtubeLink === null ? (
            <View style={styles.fieldValueContainer}>
              <Text numberOfLines={1} style={styles.text}>
                Add Youtube Channel
              </Text>
              <Feather name="chevron-right" size={28} color={colors.white} />
            </View>
          ) : (
            <View>
              <Text numberOfLines={1} style={styles.text}></Text>
              <Feather
                name="check-circle"
                size={16}
                color={colors.greenCheck}
              />
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
              value: users.instagramLink,
            })
          }
        >
          <Text style={styles.text}>Instagram</Text>
          {users.instagramLink === null ? (
            <View style={styles.fieldValueContainer}>
              <Text numberOfLines={1} style={styles.authText}>
                Add Instagram Account
              </Text>
              <Feather name="chevron-right" size={28} color={colors.white} />
            </View>
          ) : (
            <View>
              <Text numberOfLines={1} style={styles.authText}></Text>
              <Feather
                name="check-circle"
                size={16}
                color={colors.greenCheck}
              />
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
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "lightgray",
  },
});
