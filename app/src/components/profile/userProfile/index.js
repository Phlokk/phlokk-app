import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Button } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import verifiedCheck from "../../../../assets/verified.png";
import colors from "../../../../config/colors";
import { useSelector, useDispatch } from "react-redux";
// import { getUsersFetch} from "../../../redux/actions/users"



function UserProfile() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const auth = useSelector((state) => state.auth);

  // useEffect(() => {
  //    dispatch(getUsersFetch());
  // }, [dispatch]);

  // const users = useSelector((state) => state.usersReducer.users);
 



  
  

  const userLink = async () => {
    try {
      await Linking.openURL(auth.currentUser.link);
    } catch (err) {
      null;
    }
  };

  const youtubeUser = async () => {
    try {
      await Linking.openURL(auth.currentUser.youtubeLink);
    } catch (err) {
      null;
    }
  };

  const instagramUser = async () => {
    try {
      await Linking.openURL(auth.currentUser.instagramLink);
    } catch (err) {
      null;
    }
  };

  return (
    <View style={styles.container}>
      {auth.currentUser.photo_url !== null ? (
        <Image
          style={styles.avatar}
          source={{ uri: auth.currentUser.photo_url }}
        />
      ) : (
        <Image
          style={styles.avatar}
          source={require("../../../../assets/userImage.png")}
        />
      )}

      <View style={styles.usernameView}>
        {auth.currentUser.username !== null ? (
          <Text style={styles.username}>@{auth.currentUser.username}</Text>
        ) : (
          <Text style={styles.username}>@user</Text>
        )}

        {auth.currentUser.verified === 1 ? (
          <Image style={styles.phlokkVerified} source={verifiedCheck} />
        ) : (
          <TouchableOpacity></TouchableOpacity>
        )}
      </View>
      <View style={styles.linkRow}>
        <TouchableOpacity style={styles.linkText}>
          <Feather
            onPress={youtubeUser}
            name="youtube"
            size={20}
            color={colors.green}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkText}>
          <MaterialCommunityIcons
            onPress={userLink}
            name="link"
            size={25}
            color={colors.green}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkText}>
          <Feather
            onPress={instagramUser}
            name="instagram"
            size={18}
            color={colors.green}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.relationshipContainer}>
        <Text style={styles.relationshipText}>
          {auth.currentUser.relationship_type}
        </Text>
        <Text style={styles.relationshipText}>
          {auth.currentUser.relationship_name}
        </Text>
      </View>
    </View>
  );
}

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  relationshipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  creatorText: {
    color: colors.white,
    fontSize: 15,
    marginBottom: 20,
  },
  relationshipText: {
    color: colors.white,
    marginBottom: 20,
    marginHorizontal: 2,
  },
  link: {
    alignItems: "center",
    marginVertical: 5,
  },
  linkRow: {
    flexDirection: "row",
  },
  linkText: {
    color: colors.secondary,
    marginBottom: 20,
    padding: 2,
    justifyContent: "center",
    margin: 15,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  username: {
    color: colors.white,
    marginTop: 10,
    marginBottom: 20,
  },
  phlokkVerified: {
    width: 12,
    height: 12,
    bottom: 4,
    marginHorizontal: 3,
  },
  usernameView: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageText: {
    color: colors.black,
    fontWeight: "700",
  },
  dividerBar: {
    backgroundColor: "#fff",
    width: 20,
  },
});



// https://www.echowaves.com/post/implementing-fast-image-for-react-native-expo-apps
